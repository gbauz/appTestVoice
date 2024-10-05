import React, { useState, useEffect } from 'react';
import { View, Alert, PermissionsAndroid, Image, Platform, LogBox, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import Voice from '@react-native-voice/voice';

// Ignorar las advertencias específicas de NativeEventEmitter
LogBox.ignoreLogs([
  'new NativeEventEmitter() was called with a non-null argument without the required addListener method.',
  'new NativeEventEmitter() was called with a non-null argument without the required removeListeners method.'
]);

const personalityKeywords = {
  ISTJ: {
    description: 'Los ISTJ son personas prácticas y organizadas que valoran la estructura y la fiabilidad. Tienden a ser metódicos y responsables en sus enfoques.',
    keywords: [/metódico|metódica/, /minucioso|minuciosa/, /fiable/, /sistemático/, /concreto/, /ordenado/, /riguroso/, /puntual/],
    advantages: ['Organizado', 'Confiable', 'Práctico'],
    disadvantages: ['Rigidez', 'Dificultad para adaptarse al cambio'],
    improvements: ['Ser más flexible', 'Apertura al cambio']
  },
  ISFJ: {
    description: 'Los ISFJ son personas que valoran la lealtad y el apoyo a los demás, siendo atentos y serviciales. Se centran en ayudar a otros y proteger a quienes les rodean.',
    keywords: [/atento/, /devoto/, /protector/, /generoso/, /conservador/, /amable/, /considerado/, /consciente/],
    advantages: ['Empático', 'Leal', 'Servicial'],
    disadvantages: ['Sobrecarga de trabajo', 'Dificultad para decir no'],
    improvements: ['Establecer límites', 'Autocuidado']
  },
  INFJ: {
    description: 'Los INFJ son idealistas profundos que buscan hacer una diferencia en el mundo. Tienen una visión clara y valoran la autenticidad y el crecimiento personal.',
    keywords: [/idealista/, /altruista/, /profundo/, /enigmático/, /reflexivo/, /orientado a valores/, /sabio/, /perceptivo/],
    advantages: ['Compasivo', 'Creativo', 'Determinado'],
    disadvantages: ['Introversión', 'Perfeccionismo'],
    improvements: ['Manejo del estrés', 'Delegar tareas']
  },
  INTJ: {
    description: 'Los INTJ son estrategas visionarios que planifican con precisión y buscan mejorar sistemas y procesos. Son independientes y valoran la eficiencia y la lógica.',
    keywords: [/visionario/, /calculador/, /estratégico/, /analítico/, /decidido/, /ambicioso/, /innovador/, /estructurado/],
    advantages: ['Visionario', 'Decidido', 'Estratega'],
    disadvantages: ['Frialdad emocional', 'Dificultad para relacionarse'],
    improvements: ['Desarrollar empatía', 'Mejorar habilidades sociales']
  },
  ISTP: {
    description: 'Los ISTP son solucionadores prácticos que se adaptan fácilmente a nuevas situaciones. Son ingeniosos y prefieren la acción sobre la teoría.',
    keywords: [/ingenioso/, /pragmático/, /observador/, /adaptativo/, /resuelto/, /técnico/, /autónomo/, /práctico/],
    advantages: ['Adaptable', 'Práctico', 'Independiente'],
    disadvantages: ['Impulsividad', 'Evita compromisos'],
    improvements: ['Gestionar impulsos', 'Desarrollar paciencia']
  },
  ISFP: {
    description: 'Los ISFP valoran la autenticidad y la estética. Son personas sensibles y creativas que buscan vivir en el momento presente y disfrutar de la belleza.',
    keywords: [/sensible/, /artístico/, /relajado/, /libre/, /adaptable/, /estético/, /apacible/, /intuitivo/],
    advantages: ['Creativo', 'Flexible', 'Empático'],
    disadvantages: ['Dificultad para planificar', 'Evita confrontaciones'],
    improvements: ['Mejorar planificación', 'Afrontar conflictos']
  },
  INFP: {
    description: 'Los INFP son soñadores idealistas que buscan vivir de acuerdo con sus valores más profundos. Son introspectivos y valoran la autenticidad en sí mismos y en los demás.',
    keywords: [/soñador/, /introspectivo/, /idealista/, /empático/, /reflexivo/, /auténtico/],
    advantages: ['Idealista', 'Empático', 'Creativo'],
    disadvantages: ['Desorganización', 'Dificultad para tomar decisiones'],
    improvements: ['Desarrollar habilidades organizativas', 'Tomar decisiones con confianza']
  },
  INTP: {
    description: 'Los INTP son pensadores analíticos que disfrutan explorando conceptos y teorías. Son independientes y valoran la lógica y la innovación en sus procesos mentales.',
    keywords: [/analítico/, /inquisitivo/, /teórico/, /autónomo/, /crítico/, /mental/, /conceptual/, /independiente/],
    advantages: ['Lógico', 'Analítico', 'Innovador'],
    disadvantages: ['Aislamiento social', 'Perfeccionismo'],
    improvements: ['Mejorar habilidades sociales', 'Gestionar expectativas']
  },
  ESTP: {
    description: 'Los ESTP son personas enérgicas y aventureras que disfrutan de la acción y la espontaneidad. Son prácticos y se enfrentan a los desafíos con entusiasmo.',
    keywords: [/aventurero/, /audaz/, /pragmático/, /espontáneo/, /vivaz/, /directo/, /enérgico/, /entusiasta/],
    advantages: ['Enérgico', 'Adaptable', 'Pragmático'],
    disadvantages: ['Impulsividad', 'Dificultad para planificar a largo plazo'],
    improvements: ['Desarrollar habilidades de planificación', 'Controlar impulsos']
  },
  ESFP: {
    description: 'Los ESFP son extrovertidos y carismáticos, disfrutando de la interacción social y la diversión. Son espontáneos y les gusta vivir el presente.',
    keywords: [/carismático/, /vibrante/, /sociable/, /adaptable/, /juguetón/, /alegre/, /entusiasta/, /expresivo/],
    advantages: ['Carismático', 'Optimista', 'Sociable'],
    disadvantages: ['Impulsividad', 'Dificultad para enfocarse'],
    improvements: ['Desarrollar concentración', 'Planificar con anticipación']
  },
  ENFP: {
    description: 'Los ENFP son imaginativos y entusiastas, con una visión inspiradora y una capacidad para conectar con los demás. Buscan experiencias nuevas y son muy comunicativos.',
    keywords: [/inspirador/, /entusiasta/, /imaginativo/, /optimista/, /vivaz/, /espontáneo/, /comunicativo/, /creativo/],
    advantages: ['Creativo', 'Inspirador', 'Optimista'],
    disadvantages: ['Desorganización', 'Dificultad para mantener el enfoque'],
    improvements: ['Desarrollar habilidades organizativas', 'Mantener el enfoque en objetivos']
  },
  ENTP: {
    description: 'Los ENTP son innovadores y analíticos, disfrutando del debate y la exploración de nuevas ideas. Son adaptativos y persuasivos, con un enfoque estratégico.',
    keywords: [/ingenioso/, /argumentativo/, /inquisitivo/, /explorador/, /adaptativo/, /provocador/, /estratégico/, /perspicaz/],
    advantages: ['Innovador', 'Versátil', 'Persuasivo'],
    disadvantages: ['Impulsividad', 'Dificultad para seguir rutinas'],
    improvements: ['Desarrollar hábitos', 'Trabajar en la estabilidad']
  },
  ESTJ: {
    description: 'Los ESTJ son líderes naturales que valoran la eficiencia y la organización. Son decisivos y responsables, con un enfoque pragmático en la toma de decisiones.',
    keywords: [/decisivo/, /pragmático/, /enfocado/, /responsable/, /metódico/, /directo/, /organizado/, /competente/],
    advantages: ['Organizado', 'Decisivo', 'Responsable'],
    disadvantages: ['Rigidez', 'Dificultad para aceptar cambios'],
    improvements: ['Ser más flexible', 'Abrirse a nuevas ideas']
  },
  ESFJ: {
    description: 'Los ESFJ son amables y sociables, con un fuerte sentido del deber hacia los demás. Son organizadores naturales y buscan la armonía en sus relaciones.',
    keywords: [/empático/, /organizador/, /solidario/, /social/, /cooperativo/, /acogedor/, /tradicional/, /considerado/],
    advantages: ['Social', 'Solidario', 'Organizado'],
    disadvantages: ['Sobrecarga de trabajo', 'Dificultad para establecer límites'],
    improvements: ['Establecer límites claros', 'Delegar tareas']
  },
  ENFJ: {
    description: 'Los ENFJ son líderes carismáticos que buscan inspirar a los demás y promover el bienestar colectivo. Son comprensivos y tienen un fuerte enfoque en los valores y las relaciones.',
    keywords: [/carismático/, /inspirador/, /compasivo/, /organizador/, /dedicado/, /persuasivo/, /social/, /idealista/],
    advantages: ['Inspirador', 'Compasivo', 'Líder'],
    disadvantages: ['Sobrecarga emocional', 'Dificultad para delegar'],
    improvements: ['Gestionar el estrés', 'Aprender a delegar']
  },
  INTJ: {
    description: 'Los INTJ son estrategas visionarios que planifican con precisión y buscan mejorar sistemas y procesos. Son independientes y valoran la eficiencia y la lógica.',
    keywords: [/visionario/, /calculador/, /estratégico/, /analítico/, /decidido/, /ambicioso/, /innovador/, /estructurado/],
    advantages: ['Visionario', 'Decidido', 'Estratega'],
    disadvantages: ['Frialdad emocional', 'Dificultad para relacionarse'],
    improvements: ['Desarrollar empatía', 'Mejorar habilidades sociales']
  }
};

const PersonalityComponent = () => {
  const [listening, setListening] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPersonality, setCurrentPersonality] = useState(null);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permiso para grabar audio',
            message: 'Esta aplicación necesita acceso al micrófono para procesar la voz.',
            buttonNeutral: 'Pregúntame luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'Aceptar',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permiso de micrófono concedido');
          return true;
        } else {
          console.log('Permiso de micrófono denegado');
          return false;
        }
      }
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const startListening = async () => {
    const permissionGranted = await requestMicrophonePermission();
    if (!permissionGranted) {
      Alert.alert('Permiso denegado', 'No se puede iniciar la grabación sin el permiso de micrófono.');
      return;
    }

    try {
      await Voice.start('es-ES');
      setListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setListening(false);
    } catch (e) {
      console.error(e);
    }
  };

  const onSpeechResults = (e) => {
    const spokenText = e.value[0];
    console.log('Texto detectado:', spokenText); // Mostrar en consola

    // Check if spoken text matches any personality keyword
    for (const [type, { keywords }] of Object.entries(personalityKeywords)) {
      if (keywords.some(keyword => keyword.test(spokenText))) {
        setCurrentPersonality(type);
        setModalVisible(true);
        break;
      }
    }
  };

  const onSpeechError = (e) => {
    console.error(e);
    Alert.alert('Error', 'Error al procesar el discurso.');
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentPersonality(null);
  };
  const BotonAlerta = () => {
    Alert.alert('Instrucciones', 'Puedes utilizar algunas palabras claves en tu conversación que describan cualidades para poder ver tu tipo de personalidad por ejemplo:entusiasta,soñador,carismatico,etc.');
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../imagenes/microphone.png')}
        style={styles.image}
      />
      <Text style={styles.text}>Presiona el botón para iniciar o detener la conversación:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={listening ? stopListening : startListening}
      >
        <Text style={styles.buttonText}>{listening ? 'Detener escucha' : 'Iniciar escucha'}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {currentPersonality && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Tipo de Personalidad: {currentPersonality}</Text>
              <Text style={styles.modalDescription}>{personalityKeywords[currentPersonality].description}</Text>
              
              <Text style={styles.modalAdvantages}>Ventajas: {personalityKeywords[currentPersonality].advantages.join(', ')}</Text>
              <Text style={styles.modalDisadvantages}>Desventajas: {personalityKeywords[currentPersonality].disadvantages.join(', ')}</Text>
              <Text style={styles.modalImprovements}>Áreas de mejora: {personalityKeywords[currentPersonality].improvements.join(', ')}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      
      </Modal>

      <TouchableOpacity
        style={styles.floatingButton}  
        onPress={BotonAlerta} // Llama a la función showAlert al presionar      
      >
        <Text style={[styles.buttonText, { fontSize: 25 ,fontWeight: 'bold'}]}>?</Text>
      </TouchableOpacity>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Arial', // Puedes reemplazar 'Arial' con la fuente que prefieras
    textAlign: 'center', // Alineación del texto en el centro
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Arial', // Asegura la consistencia en la fuente
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Arial', // Fuente común para los títulos
    textAlign: 'center', // Alineación del texto en el centro
  },
  modalDescription: {
    fontSize: 16,    
    marginBottom: 10,
    fontFamily: 'Arial', // Fuente común para el contenido
    textAlign: 'center', // Alineación del texto en el centro
  },
  modalKeywords: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: 'Arial', // Fuente común para el contenido
    textAlign: 'center', // Alineación del texto en el centro
  },
  modalAdvantages: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Arial', // Fuente común para el contenido
    textAlign: 'center', // Alineación del texto en el centro
  },
  modalDisadvantages: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Arial', // Fuente común para el contenido
    textAlign: 'center', // Alineación del texto en el centro
  },
  modalImprovements: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Arial', // Fuente común para el contenido
    textAlign: 'center', // Alineación del texto en el centro
  },
  closeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Arial', // Fuente común para el botón
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#28a745',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
  },

});

export default PersonalityComponent;
