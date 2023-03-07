import React, { useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import {collection, doc, setDoc,addDoc} from 'firebase/firestore';
import {db} from '../../components/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../components/config'
export default function Register({ navigation }) {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
    //getDoc para ler dado

    async function createUSer(){
        await createUserWithEmailAndPassword(auth,email,password)
        .then(value =>{
        alert("Cadastrado com sucesso!! \n" + value.user.id)
        }).catch(error => alert(error));
    };
    /*
    function create (){

        addDoc(collection(db, "users"), {
            usersname: name,
            email: email,
            password:password,
          }).then(()=>{
            alert("usuario Cadastrado com sucesso")

          }).catch((error) => {
            alert("Deu erro"+error);
          })
          }*/

 return (
    <View style={styles.view}>
        <Image 
            source={require('../../images/Register.png')} 
            style={styles.image} 
        />
        <Text style={styles.header}>Cadastro de usuario</Text>

        <TextInput 
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email..."
            placeholderTextColor="#FFF"
        />
        
        <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Senha..."
            placeholderTextColor="#FFF"
        />

        <TouchableOpacity onPress={createUSer}
            style={styles.button}
        >
            <Text style={styles.txtButton}>Cadastrar</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: 'black',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 15,
    },
    header: {
        fontSize: 34,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom:10,
    },
    input: {
        width: '90%',
        height: 50,
        
        padding: 15,
        marginVertical: 10,
        
        borderColor: '#111',
        borderWidth: 1,
        borderRadius: 10,
        
        backgroundColor: '#222',
        color: '#FFF',
        fontSize: 20
    },
    button: {
        backgroundColor: '#82C043',
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10
    },
    txtButton: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
