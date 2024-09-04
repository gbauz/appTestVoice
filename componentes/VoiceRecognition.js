import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, PermissionsAndroid, Platform } from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceRecognition = ({ onTextRecognized = () => {} }) => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Configurar los listeners de eventos
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Limpiar los listeners de eventos al desmontar
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
    console.log('Reconocimiento de voz iniciado');
  };

  const onSpeechEnd = () => {
    setIsListening(false);
    console.log('Reconocimiento de voz terminado');
  };

  const onSpeechResults = (event) => {
    console.log('Evento onSpeechResults:', event);
    const { value } = event;
    if (value && value.length > 0) {
      const text = value[0].toLowerCase(); // Convertir a minúsculas para comparaciones más simples
      setRecognizedText(text);
      if (typeof onTextRecognized === 'function') {
        onTextRecognized(text); // Llamar al callback prop
      }
      if (text.includes('hola')) {
        Alert.alert('¡Palabra detectada!', 'Dijiste "hola"');
      }
    }
  };

  const onSpeechError = (event) => {
    console.log('Evento onSpeechError:', event);
    const errorMessage = event?.error?.message || 'Error desconocido';
    Alert.alert('Error', `Error de reconocimiento de voz: ${errorMessage}`);
    setIsListening(false);
  };

  const startListening = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permiso de Grabación de Audio',
            message: 'Esta aplicación necesita acceso al micrófono para el reconocimiento de voz.',
            buttonNeutral: 'Pregúntame después',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Aceptar',
          }
        );
        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permiso de micrófono denegado');
          return;
        }
      }
      await Voice.start('es-ES'); // Idioma español
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo iniciar el reconocimiento de voz');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo detener el reconocimiento de voz');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Texto Reconocido:</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>{recognizedText}</Text>
      <Button
        title={isListening ? 'Detener' : 'Iniciar'}
        onPress={isListening ? stopListening : startListening}
      />
    </View>
  );
};

export default VoiceRecognition;