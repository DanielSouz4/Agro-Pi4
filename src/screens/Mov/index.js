import React, { useState } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import {auth} from '../../components/config';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import {collection,addDoc} from 'firebase/firestore';
import {db} from '../../components/config'


export default function Add() {

    const [ preco, setPreco ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    
    function creator (){

        addDoc(collection(db, "anuncios"), {
            data:'',
            descricao: desc,
            enderreco:'',
            idUser: auth.currentUser.uid,
            img:'https://neilpatel.com/wp-content/uploads/2019/07/mini-caixas-de-produtos-em-cima-de-laptop.jpeg',
            preco: preco,
            tipoProduto:tipo,
            titulo:titulo
          }).then(()=>{
            alert("Valor adicionado")

          }).catch((error) => {
            alert("Erro "+error);
          })
          }

 return (
    <View style={{alignContent:'center',alignItems:'center'}}>
        <AntDesign name="isv" size={80} color="green" />
        <Text style={styles.header}>Cadastro de Produto</Text>

        <TextInput 
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input}
            placeholder="Titulo..."
            placeholderTextColor="#FFF"
        />
        <TextInput 
            value={desc}
            onChangeText={setDesc}
            style={styles.input}
            placeholder="descrição do produto..."
            placeholderTextColor="#FFF"
        />

        <TextInput 
            value={preco}
            onChangeText={setPreco}
            style={styles.input}
            placeholder="Valor.."
            placeholderTextColor="#FFF"
        />
        <Text style={styles.txtButton2}>Selecione o tipo do produto</Text>

        <View style={{flexDirection:'row'}}>
             <Button
                 onPress={()=>setTipo("Futa")}
                 title="Frutas"
                 color="#841584"
                 accessibilityLabel="seu produto é um tipo de fruta"
             />
             <Button
                 onPress={()=>setTipo("Verdura")}
                 title="Verdura"
                 color="gray"
                 accessibilityLabel="MArque esta opção se seu produto for un tipo de verdura"
             />
             <Button
                 onPress={()=>setTipo("Legume")}
                 title="Legume"
                 color="black"
                 accessibilityLabel="Marque esta opção se seu produto for um tipo de legume"
             />
        </View>

        <View>
            <Text style={styles.txtButton2}>Tipo selecionado: {tipo}</Text>
        </View>
        
        
            

   
        
        <TouchableOpacity onPress={()=>creator()}
            style={styles.button}
        >
            <Text style={styles.txtButton}>Adicionar</Text>
        </TouchableOpacity>
        

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: '#fff',
        width: '100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 5,
        marginTop:15
    },
    header: {
        fontSize: 34,
        color: 'black',
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
    },
    txtButton2: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tipo:{
        alignItems:'start',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,

    }
});
