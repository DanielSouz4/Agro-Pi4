import React, { useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity,SafeAreaView } from 'react-native';
//import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { db } from '../../components/config';
import {auth} from '../../components/config';

import {AsyncStorage} from 'react-native';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
//import { ViewPropTypes } from 'react-native';

export default function Login({navigation}) {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const bgImage = require('../../images/BgAgro1.jpg')

    async function Login(){
        await signInWithEmailAndPassword(auth,email,password)
        .then(
            ()=>navigation.navigate('Home')
        ).catch(error => alert('Login não efetuado!!'));
    };

 return (
    <View style={styles.container}>

        <Image source={bgImage} style={styles.backImage} />
        <View style={styles.whiteSheet} />

        <SafeAreaView style = {styles.form}>

        <Text style={styles.title}>Login</Text>

        <TextInput 
            value={email}
            onChangeText={setEmail}
            style={styles.input3}
            placeholder="Digite seu email..."
            placeholderTextColor="#32CD32"
        />
        
        <TextInput 
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input3}
            placeholderTextColor="#32CD32"
            placeholder="Digite sua senha..."
           // placeholderTextColor="#FFF"
        />

        <TouchableOpacity
            onPress={Login}
            style={styles.button}
        >
            <Text style={styles.txtButton}>Entrar</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
        <Text style={{color:'black', marginTop:5, fontWeight:'bold', alignSelf: 'center'}} >Cadastre-se</Text>
        </TouchableOpacity> */}

        <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
            <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={{color: '#333333', fontWeight: '600', fontSize: 14, fontWeight: 'bold'}}> Cadastre-se</Text>
            </TouchableOpacity>
        </View>

        </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backImage: {
      width: "100%",
      height: 340,
      position: "absolute",
      top: 0,
      resizeMode: 'cover',
    },
    title: {
        fontSize: 34,
        color: 'green',
        fontWeight: 'bold',
        marginBottom:20,
        alignSelf: 'center',
    },
    input: {
        width: '90%',
        height: 50,
        
        padding: 15,
        marginVertical: 10,
        
        borderColor: '#0C600C',
        borderWidth: 1,
        borderRadius: 10,
        
        backgroundColor: '#000',
        color: '#FFFFFF',
        fontSize: 20
    },
    
    button: {
        backgroundColor: '#005C53',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
    txtButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
      },
      form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
      },
      input3: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
      }
      
})