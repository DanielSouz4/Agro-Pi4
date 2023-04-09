import React, { useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {auth} from '../../components/config';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
export default function Login({navigation}) {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function Login(){
        await signInWithEmailAndPassword(auth,email,password)
        .then(
            ()=>navigation.navigate('Home')
        ).catch(error => alert('Login não efetuado!!'));
    };

 return (
    <View style={styles.view}>
        <Image 
            source={require('../../images/Login.png')} 
            style={styles.image} 
        />
        <Text style={styles.header}>Login</Text>

        <TextInput 
            value={email}
            onChangeText={setEmail}
            style={styles.input2}
            placeholder="Digite seu email..."
            placeholderTextColor="#32CD32"
        />
        
        <TextInput 
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input2}
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

        <TouchableOpacity style={{marginBottomWdith:1,marginBottomColor:'#fff',width:80,marginTop:10,borderColor:'#fff',borderBottomWidth:1, justifyContent:'center',alignItems:'center'}} onPress={()=>navigation.navigate('Register')}>
        <Text style={{color:'black', marginTop:5, fontWeight:'bold'}} >Cadastre-se</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: '#FFFFFF',
        width: '100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 15,
        
    },
    header: {
        fontSize: 34,
        color: 'green',
        fontWeight: 'bold',
        marginBottom:20,
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
    input2: {
        width: '90%',
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
        fontSize: 20
    },
    button: {
        backgroundColor: '#32CD32',
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10
    },
    txtButton: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    }
})