import React,{useState} from 'react';

import { View,ImageBackground,StyleSheet, TouchableOpacity, Image } from 'react-native';

import {Text,TextInput,Button, HelperText} from 'react-native-paper';

import { useGlobal } from '../lib';

// import styles from '../styles/Login.json';

export default function Login(props) {
  const [email, setEmail] = useGlobal('email');
  const [emailError, setEmailError] = useState(typeof email !== 'string');
  const [senha, setSenha] = useState('');
  const [senhaError, setSenhaError] = useState(typeof senha !== 'string');

  function onChangeTextEmail(text) {
    setEmail(text);
    setEmailError(!text.trim());
}

function onChangeTextSenha(text) {
  setSenha(text);
  setSenhaError(!text.trim());
}

function goOn(){
  if (!email.trim() && !senha.trim()){
    setEmailError(!email.trim());
    setSenhaError(!senha.trim());
  }
  else if(!email.trim() || !email.includes("@")){
    setEmailError(!email.trim() || !email.includes("@"));
  }
  else if (!senha.trim()){
    setSenhaError(!senha.trim());
  }
  else{
  props.navigation.navigate('Pedidos');
  }
}

    return (
        <ImageBackground resizeMode="cover"  imageStyle= {{opacity:0.6}} style={styles.image} source={{uri:"https://russelservicos.com.br/blog/wp-content/uploads/2021/12/Veja-quais-sao-os-passos-mais-importantes-para-a-sua-construcao.jpg"}}>
        <View style={styles.container}>
            <Image style={styles.connect} source={{uri:"https://connectdata.app/assets/img/logo@3x.png"}} style={styles.sol}/>
          <View style={styles.inputView} >
            <TextInput  
              style={styles.inputText}
              error={emailError}
              value={email}
              label="E-mail" 
              onChangeText={onChangeTextEmail}
              left={<TextInput.Icon name="email" />}
             />
             {emailError && (
             <HelperText style={styles.error} type="error">
                          Preencha um email válido
                        </HelperText>)}
          </View>
          <View style={styles.inputView} >
            <TextInput  
            secureTextEntry
              style={styles.inputText}
              error={senhaError}
              value={senha}
              onChangeText={onChangeTextSenha}
              label="Senha" 
              left={<TextInput.Icon name="lastpass" />}
              />
              {senhaError &&(<HelperText style={styles.error} type="error">
                           Necessário preencher a senha
                        </HelperText>)}
          </View>
         
          <Button onPress={goOn} style={styles.loginBtn} icon="login-variant" mode="contained">
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
    error:{
      
    marginTop: 0,
    marginRight: 5,
    marginBottom: -10,
    marginLeft: 5
    },

    inputView:{
      width:"80%",
      borderRadius:250,
      height:50,
      marginBottom:25,
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
