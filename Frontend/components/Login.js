import React from 'react';

import { View,ImageBackground,StyleSheet, TouchableOpacity, Image } from 'react-native';

import {Text,TextInput,Button} from 'react-native-paper';

// import styles from '../styles/Login.json';

export default function Login(props) {
    return (
        <ImageBackground resizeMode="cover"  imageStyle= {{opacity:0.6}} style={styles.image} source={{uri:"https://russelservicos.com.br/blog/wp-content/uploads/2021/12/Veja-quais-sao-os-passos-mais-importantes-para-a-sua-construcao.jpg"}}>
        <View style={styles.container}>
            <Image style={styles.connect} source={{uri:"https://connectdata.app/assets/img/logo@3x.png"}} style={styles.sol}/>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              label="E-mail" 
              left={<TextInput.Icon name="email" />}
             />
          </View>
          <View style={styles.inputView} >
            <TextInput  
              secureTextEntry
              style={styles.inputText}
              label="Senha" 
              left={<TextInput.Icon name="lastpass" />}
              />
          </View>
         
          <Button onPress={() => {props.navigation.navigate('Pedidos')}} style={styles.loginBtn} icon="login-variant" mode="contained">
            Entrar
            </Button>

          <TouchableOpacity>
            <Text style={styles.loginText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
    );
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    connect:{
        marginTop:40,
    },
    image:{
        flex:1,
        justifyContent:"center",
    },
    sol:{
        width: 300,
        height: 57,
    },

    inputView:{
      width:"80%",
      borderRadius:250,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    inputText:{
        marginTop:40,
      borderRadius:10,
      height:50,
      color:"white"
    },
    loginBtn:{
      width:"70%",
      backgroundColor:"#2385A2",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:30,
      marginBottom:10
    },
    loginText:{
      color:"black"
    }
  });
