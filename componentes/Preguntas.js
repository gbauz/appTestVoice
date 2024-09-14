import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-7076369033068846~4662673545';

const Preguntas = ({ onNext }) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  });

  const handleNext = () => {
    if (step === 1 && name) {
      setStep(2);
    } else if (step === 2 && age) {
      setStep(3);
    } else if (step === 3 && answers.question1) {
      setStep(4);
    } else if (step === 4 && answers.question2) {
      setStep(5);
    } else if (step === 5 && answers.question3) {
      setStep(6);
    } else if (step === 6 && answers.question4) {
      setStep(7);
    } else if (step === 7 && answers.question5) {
      onNext({ name, age, answers });
    } else {
      Alert.alert('Error', 'Por favor complete todos los campos');
    }
  };

  const handleAgeChange = (text) => {
    if (/^\d*$/.test(text)) {
      setAge(text);
    } else {
      Alert.alert('Error', 'Por favor ingrese solo números');
    }
  };

  const handleAnswerChange = (question, value) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [question]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.labelBold}>Ingresa tu nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={text => setName(text)}
          />
          <Button title="Siguiente" onPress={handleNext} />
        </>
      )}
      {step === 2 && (
        <>
          <Text style={styles.labelBold}>Ingresa tu edad</Text>
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={age}
            onChangeText={handleAgeChange}
            keyboardType="numeric"
          />
          <Button title="Siguiente" onPress={handleNext} />
        </>
      )}
      {step === 3 && (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={require('../imagenes/epilepsy.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.question}>¿Cómo te describirías?</Text>
          <Picker
            selectedValue={answers.question1}
            onValueChange={(value) => handleAnswerChange('question1', value)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Optimista, creativo" value="a" />
            <Picker.Item label="Reservado, analítico" value="b" />
            <Picker.Item label="Ambicioso, enfocado" value="c" />
            <Picker.Item label="Empático, adaptable" value="d" />
          </Picker>
          <Button title="Siguiente" onPress={handleNext} />
        </>
      )}
      {step === 4 && (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={require('../imagenes/stress.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.question}>¿Cómo reaccionas al estrés?</Text>
          <Picker
            selectedValue={answers.question2}
            onValueChange={(value) => handleAnswerChange('question2', value)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Mantengo la calma." value="a" />
            <Picker.Item label="Me pongo ansioso." value="b" />
            <Picker.Item label="Evito pensar." value="c" />
            <Picker.Item label="Me estreso mucho." value="d" />
          </Picker>
          <Button title="Siguiente" onPress={handleNext} />
        </>
      )}
      {step === 5 && (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={require('../imagenes/hard-work.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.question}>¿Trabajas solo o en equipo?</Text>
          <Picker
            selectedValue={answers.question3}
            onValueChange={(value) => handleAnswerChange('question3', value)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Solo." value="a" />
            <Picker.Item label="Ambos." value="b" />
            <Picker.Item label="Equipo." value="c" />
            <Picker.Item label="Depende." value="d" />
          </Picker>
          <Button title="Siguiente" onPress={handleNext} />
        </>
      )}
      {step === 6 && (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={require('../imagenes/person.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.question}>¿Cómo tomas decisiones?</Text>
          <Picker
            selectedValue={answers.question4}
            onValueChange={(value) => handleAnswerChange('question4', value)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Intuitivamente." value="a" />
            <Picker.Item label="Analizo todo." value="b" />
            <Picker.Item label="Busco consejo." value="c" />
            <Picker.Item label="Dudo mucho." value="d" />
          </Picker>
          <Button title="Siguiente" onPress={handleNext} />
        </>
      )}
      {step === 7 && (
        <>
          <View style={styles.imageContainer}>
            <Image
              source={require('../imagenes/goal.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.question}>¿Qué es lo más importante?</Text>
          <Picker
            selectedValue={answers.question5}
            onValueChange={(value) => handleAnswerChange('question5', value)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Éxito profesional." value="a" />
            <Picker.Item label="Relaciones." value="b" />
            <Picker.Item label="Vida equilibrada." value="c" />
            <Picker.Item label="Aprender y crecer." value="d" />
          </Picker>
          <Button title="Enviar" onPress={() => navigation.navigate('VoiceRecognition')} />
        </>
      )}
      <View style={styles.adContainer}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            networkExtras: {
              collapsible: 'bottom',
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  labelBold: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  adContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
});

export default Preguntas;
