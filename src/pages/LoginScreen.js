import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../utils/firebase';
import { AppContext } from '../commons/AppContext';




export default function Login({ navigation }) {
  const { setUser } = useContext(AppContext);

  const [email, setEmail] = useState('');//teste@teste.com
  const [password, setPassword] = useState('');//123456
  
  function authenticate() {

    if ((!email) || (email == '')) {
        setMsg('Email inválido');
        return;
    }

    if ((!password) || (password.length < 6)) {
        setMsg('Senha inválida');
        return;
    }


    auth.signInWithEmailAndPassword(email, password).then(userCredential => {
        setUser(userCredential); 
        navigation.navigate('Home');
    }
    ).catch((error) => {
        if (error.code = 'auth/wrong-password') {
            setMsg('Usuário ou senha inválidos');
        } else {
            setMsg('Erro ao autenticar. Verifique sua conexão com a Internet.');
        }
    });
  }

  function forgotPassword() {
      if ((!email) || (email == '')) {
          setMsg('Email inválido');
          return;
      }
      auth.sendPasswordResetEmail(email).then(() => setMsg('E-mail enviado'));
  }

  return (
    <SafeAreaView style={{ padding: 28 }}>
      <View style={styles.container}>
        <Text style={styles.text}>Olá</Text> 
        <Text style={styles.text}>Humano</Text>
        <StatusBar style="auto" />
      </View>
      <View style={{paddingTop: 95, paddingBottom:48}}>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Senha"
          secureTextEntry ={true}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={authenticate}
      >
        <Text style={{
          color: 'white', 
          fontWeight: 'bold',
          fontSize: 18,
          lineHeight: 21,
        }}>Login</Text>
        
      </TouchableOpacity>
    </SafeAreaView>
    
  );

  App.navigationOptions = {
    title: 'Home',
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 63,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  text: {
    color: '#FF7A00',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 40,
    lineHeight: 47,
  },

  input: {
    color: '#8A8888',
    height: 40,
    fontSize: 18,
    lineHeight: 21,
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#8A8888',
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#FF7A00',
    borderRadius: 15,
    height: 58,
  },
});
