import React, { useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity, Alert,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard } from 'react-native';

import {collection, doc, setDoc,addDoc} from 'firebase/firestore';
import {db} from '../../components/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth,bd} from '../../components/config'


export default function Register({ navigation }) {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [tel,setTel] = useState('');
    const [id, setId] = useState('');

    //getDoc para ler dado
    async function Login(){
        await signInWithEmailAndPassword(auth,email,password)
        .then(
            //()=>navigation.navigate('Home')
        ).catch(error => alert('Login não efetuado!!'));
    };
    function perfil (){
        addDoc(collection(db, "usuarios"), {
            IdUSer:id,
            endereco:endereco,
            nome: nome,
            email:email,
            telefone:tel,
          }).then(()=>{
            console.log("Valor adicionado")

          }).catch((error) => {
            console.log("Erro "+error);
          })
        };


    

    async function createUSer(){
        await createUserWithEmailAndPassword(auth,email,password)
        .then(value =>{
            Login();
            setId(auth.currentUser.uid);
            alert("Cadastrado com sucesso!! \n" + id)
            perfil();
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
        <KeyboardAvoidingView
            style={styles.view}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {/*
        <Image 
            source={require('../../images/Register.png')} 
            style={styles.image} 
        />
 */}
        <View style={styles.inner}>


            <Text style={styles.header}>Cadastro de usuario</Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="Email..."
                placeholderTextColor="gray"
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Senha..."
                placeholderTextColor="gray"
            />
            <TextInput
                value={nome}
                onChangeText={setNome}
                style={styles.input}
                placeholder="Nome..."
                placeholderTextColor="gray"
            />
            <TextInput
                value={endereco}
                onChangeText={setEndereco}
                style={styles.input}
                placeholder="Endereço..."
                placeholderTextColor="gray"
            />
            <TextInput
                value={tel}
                onChangeText={setTel}
                style={styles.input}
                placeholder="Telefone..."
                placeholderTextColor="gray"
            />

            <TouchableOpacity onPress={createUSer}
                style={styles.button}
            >
                <Text style={styles.txtButton}>Cadastrar</Text>
            </TouchableOpacity>
            <View style={{ height: 60 }} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        //paddingHorizontal: 15,
        backgroundColor: '#fff',
        //width: '100%',
        //justifyContent: 'center',
        alignItems: 'center',
        //paddingVertical:30
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-around',
        width:"100%"
      },
    header: {
        fontSize: 34,
        color: 'black',
        fontWeight: 'bold',
        marginBottom:10,
        marginTop:25
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
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
