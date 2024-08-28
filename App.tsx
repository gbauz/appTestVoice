import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

// Importa los componentes
import SplashScreen from './componentes/SplashScreen';
import Preguntas from './componentes/Preguntas';
import VoiceRecognition from './componentes/VoiceRecognition'; // Importa el componente VoiceRecognition

// Crear una instancia de createNativeStackNavigator y asignarla a Stack
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={SplashScreen} 
          options={{ headerShown: false }} // Oculta la barra superior en el Splashscreen
        />
        <Stack.Screen 
          name="Preguntas" 
          component={Preguntas} 
          options={{ title: 'Preguntas' }} // Opcional: Configura el título del header
        />
        <Stack.Screen 
          name="VoiceRecognition" 
          component={VoiceRecognition} 
          options={{ title: 'Reconocimiento de Voz' }} // Opcional: Configura el título del header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
