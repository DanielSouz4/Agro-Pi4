import React,{useState} from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import {collection,addDoc,updateDoc,doc} from 'firebase/firestore';
import {db,auth,storage} from '../../components/config';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Update({navigation,route}){
    const data=route.params
    const [nome, setNome] = useState(data.nome);
    const [endereco, setEndereco] = useState(data.endereco);
    const [tel,setTel] = useState(data.telefone);
    const id = data.id;

    function Up(){
        updateDoc(doc(db,'usuarios',id),{
            nome:nome,
            endereco:endereco,
            telefone:tel
        }).then(()=>{
            console.log('atulizado!!');
            alert("Dados atualizados!");
        }).catch((error)=>{
            console.log(error)

        });;
    }


    return(
        <View style={styles.view}>
            
            <FontAwesome5 name="edit" size={60} color="green" />
            <Text style={{fontSize:30,color:'green',fontWeight:'bold',elevation:10,textShadowColor:'black',textShadowRadius:2,marginBottom:40}}>Atualizar Dados</Text>
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

            <TouchableOpacity onPress={Up}
                style={styles.button}
            >
                <Text style={styles.txtButton}>Atualizar</Text>
            </TouchableOpacity>
            <Text>{data.nome}   ID: {data.id}</Text>
        </View>
    )
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
    container:{
        flex:1,
        width:'100%',
        height:500,
        backgroundColor:'#ffff',
        justifyContent:'space-between',
        alignItems:'center',
        //alignContent:"center"

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
        backgroundColor: '#32CD32',
        height: 58,
        width:250,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        flexDirection:'row'
      },
    txtButton: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    }
});