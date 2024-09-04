import React, { useState, useEffect } from 'react';
import { View, Button, Alert, PermissionsAndroid, Platform, LogBox } from 'react-native';
import Voice from '@react-native-voice/voice';

// Ignorar las advertencias específicas de NativeEventEmitter
LogBox.ignoreLogs([
  'new NativeEventEmitter() was called with a non-null argument without the required addListener method.',
  'new NativeEventEmitter() was called with a non-null argument without the required removeListeners method.'
]);

const personalityKeywords = {
  ISTJ: [/metódico|metódica/, /minucioso|minuciosa/, /fiable/, /sistemático/, /concreto/, /ordenado/, /riguroso/, /puntual/],
  ISFJ: [/atento/, /devoto/, /protector/, /generoso/, /conservador/, /amable/, /considerado/, /consciente/],
  INFJ: [/idealista/, /altruista/, /profundo/, /enigmático/, /reflexivo/, /orientado a valores/, /sabio/, /perceptivo/],
  INTJ: [/visionario/, /calculador/, /estratégico/, /analítico/, /decidido/, /ambicioso/, /innovador/, /estructurado/],
  ISTP: [/ingenioso/, /pragmático/, /observador/, /adaptativo/, /resuelto/, /técnico/, /autónomo/, /práctico/],
  ISFP: [/sensible/, /artístico/, /relajado/, /libre/, /adaptable/, /estético/, /apacible/, /intuitivo/],
  INFP: [/soñador/, /introspectivo/, /idealista/, /empático/, /reflexivo/, /auténtico/],
  INTP: [/analítico/, /inquisitivo/, /teórico/, /autónomo/, /crítico/, /mental/, /conceptual/, /independiente/],
  ESTP: [/aventurero/, /audaz/, /pragmático/, /espontáneo/, /vivaz/, /directo/, /enérgico/, /entusiasta/],
  ESFP: [/carismático/, /vibrante/, /sociable/, /adaptable/, /juguetón/, /alegre/, /entusiasta/, /expresivo/],
  ENFP: [/inspirador/, /entusiasta/, /imaginativo/, /optimista/, /vivaz/, /espontáneo/, /comunicativo/, /creativo/],
  ENTP: [/ingenioso/, /argumentativo/, /inquisitivo/, /explorador/, /adaptativo/, /provocador/, /estratégico/, /perspicaz/],
  ESTJ: [/decisivo/, /pragmático/, /enfocado/, /responsable/, /metódico/, /directo/, /organizado/, /competente/],
  ESFJ: [/empático/, /organizador/, /solidario/, /social/, /cooperativo/, /acogedor/, /tradicional/, /considerado/],
  ENFJ: [/motivador/, /persuasivo/, /colaborador/, /inspirador/, /carismático/, /orientado a la gente/, /empático/, /guiador/],
  ENTJ: [/decidido/, /ambicioso/, /directivo/, /estratégico/, /dominante/, /claro/, /metódico/, /eficiente/]
};

const VoiceRecognition = ({ onTextRecognized = () => {} }) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Configurar los listeners de eventos
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Limpiar los listeners de eventos al desmontar el componente
    return () => {
      Voice.destroy().then(() => Voice.removeAllListeners());
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
      const text = value[0].toLowerCase().replace(/\s+/g, ' ').trim(); // Normalizar texto
      console.log('Texto Reconocido:', text); // Mostrar texto en consola
      if (typeof onTextRecognized === 'function') {
        onTextRecognized(text); // Llamar al callback prop
      }

      // Determinar el tipo de personalidad basado en las palabras clave
      const detectedPersonalities = Object.keys(personalityKeywords).filter(personalityType => 
        personalityKeywords[personalityType].some(pattern => pattern.test(text))
      );

      if (detectedPersonalities.length > 0) {
        Alert.alert('Personalidad Detectada', `Tipo(s) de personalidad detectado(s): ${detectedPersonalities.join(', ')}`);
      } else {
        Alert.alert('No se detectó ningún tipo de personalidad');
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
      <Button
        title={isListening ? 'Detener' : 'Iniciar'}
        onPress={isListening ? stopListening : startListening}
      />
    </View>
  );
};

export default VoiceRecognition;
