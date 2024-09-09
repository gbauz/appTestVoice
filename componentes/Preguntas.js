import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importación desde el nuevo paquete
import { useNavigation } from '@react-navigation/native'; // Importar el hook useNavigation

const Preguntas = ({ onNext }) => {
  const navigation = useNavigation(); // Usar el hook useNavigation para obtener la instancia de navegación
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
          <Text style={styles.question}>¿Cómo te describirías en tres palabras?</Text>
          <Picker
            selectedValue={answers.question1}
            onValueChange={(value) => handleAnswerChange('question1', value)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Optimista, creativo, sociable" value="a" />
            <Picker.Item label="Reservado, analítico, tranquilo" value="b" />
            <Picker.Item label="Ambicioso, decidido, enfocado" value="c" />
            <Picker.Item label="Empático, adaptable, cooperativo" value="d" />
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
          <Text style={styles.question}>¿Cómo sueles reaccionar ante situaciones de estrés?</Text>
          <Picker
            selectedValue={answers.question2}
            onValueChange={(value) => handleAnswerChange('question2', value)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Mantengo la calma y busco soluciones." value="a" />
            <Picker.Item label="Me siento ansioso/a pero intento manejarlo." value="b" />
            <Picker.Item label="Evito pensar en el problema hasta que sea necesario." value="c" />
            <Picker.Item label="Me estreso mucho y me cuesta concentrarme." value="d" />
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
          <Text style={styles.question}>¿Prefieres trabajar solo o en equipo?</Text>
          <Picker
            selectedValue={answers.question3}
            onValueChange={(value) => handleAnswerChange('question3', value)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Prefiero trabajar solo." value="a" />
            <Picker.Item label="Me gusta trabajar en equipo, pero puedo hacerlo solo/a." value="b" />
            <Picker.Item label="Prefiero trabajar en equipo." value="c" />
            <Picker.Item label="Depende del proyecto y las circunstancias." value="d" />
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
          <Text style={styles.question}>¿Cómo te sientes cuando tienes que tomar una decisión importante?</Text>
          <Picker
            selectedValue={answers.question4}
            onValueChange={(value) => handleAnswerChange('question4', value)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Confío en mi intuición y tomo decisiones rápidas." value="a" />
            <Picker.Item label="Prefiero analizar todas las opciones antes de decidir." value="b" />
            <Picker.Item label="Me cuesta tomar decisiones y busco consejo." value="c" />
            <Picker.Item label="Tomo decisiones pero suelo dudar después." value="d" />
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
          <Text style={styles.question}>¿Qué es lo más importante para ti en la vida?</Text>
          <Picker
            selectedValue={answers.question5}
            onValueChange={(value) => handleAnswerChange('question5', value)}
            style={styles.picker}
          >
            <Picker.Item label="Seleccione una opción" value="" />
            <Picker.Item label="Lograr el éxito profesional." value="a" />
            <Picker.Item label="Mantener relaciones personales sólidas." value="b" />
            <Picker.Item label="Tener una vida equilibrada y tranquila." value="c" />
            <Picker.Item label="Aprender y crecer constantemente." value="d" />
          </Picker>
          <Button title="Enviar" onPress={() => navigation.navigate('VoiceRecognition')} />
        </>
      )}
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
    fontWeight: '600', // Esto debería funcionar para negrita
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
});

export default Preguntas;
