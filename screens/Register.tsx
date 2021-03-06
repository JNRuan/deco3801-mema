import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import Register from '../components/Register';


/**
 * Default render function that will reader all the register screen components to the app.
 * Text input fields and choosing a language to learn will be handled by the Register
 * component and rendered to this screen.
 * 
 * @param {navigation}: The navigation object that allows for screen changing
 */
export default function RegisterScreen({navigation}) {
  
  //Renders screen to app
  return (
    <View style={styles.container}>
      <View style={{padding:10}}/>
      <Register navigation={navigation}/>
      <Image source={require('../assets/images/MEMALOGO.png')} style={styles.imgLogo}/>
    </View>
  );
}

//Screen styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    height: 100,
    width: 200,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    elevation: 8,
    backgroundColor: "#FF9E1C",
    paddingVertical: 5,
    paddingHorizontal: 75,
    justifyContent: "center",
    alignItems: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    padding: 20,
  },
});