import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa el hook useNavigation

const Menu = () => {
  const navigation = useNavigation(); 

  const handlePress = () => {
    navigation.navigate('Preguntas'); 
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../imagenes/problem.png')}
        style={styles.image}
      />
      <Text style={styles.welcomeText}>¡Antes de empezar queremos hacerte unas preguntas!</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 300, 
    height: 300, 
    marginBottom: 20, 
    resizeMode: 'contain', 
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Menu;