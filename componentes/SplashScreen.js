import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

import Menu from './Menu';



export default function CustomText() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashScreen}>
        <Image
          source={require('../imagenes/logodigital.jpeg')}
          style={styles.logo}
        />
        <Text style={styles.splashText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <Menu /> 
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff', // Puedes cambiar el color de fondo si lo deseas
  },
  splashText: {
    fontSize: 24,
    color: 'black',
    marginTop: 20,
  },
  logo: {
    width: 350,
    height: 400,
    resizeMode: 'contain',
  },
});