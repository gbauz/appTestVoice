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
        <View style={styles.imageContainer}>
        <Image
            source={require('../imagenes/logoapp.png')}
            style={styles.logoapp}
          />
          <Text style={styles.textoPrincipal}>Speak Profile</Text>
          <Text style={styles.overlayText}>Desarrollado por</Text>
          <Image
            source={require('../imagenes/logodigital.jpeg')}
            style={styles.logo}
          />
        </View>
      
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
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginTop: 2,  
  },
  logoapp:{
    width: 550,
    height: 500,
    resizeMode: 'contain',
   
  },
  textoPrincipal:{
    marginBottom:40,
    color: 'black',
    fontSize: 55,
  },
  overlayText: {
    marginBottom: -85, 
    color: 'black',
    fontSize: 25,
    fontWeight:'bold',
  },
  splashText: {
    fontSize: 24,
    color: 'black',
    marginTop: 20,
  },
});
