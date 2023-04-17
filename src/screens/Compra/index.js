import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { View,StyleSheet,Text,TextInput,TouchableOpacity, Image } from "react-native";
import {auth} from '../../components/config';
import {db} from '../../components/config';
import {collection,addDoc} from 'firebase/firestore';
import {Feather} from '@expo/vector-icons';

export default function Comprar({route}){
    const [quant, setQuant] = useState('');
    const [endereco,setEndereco] = useState('');
    const [nome,setNome] = useState('');
    const [tel,setCel] = useState('');
    const [mensagem,setMensagem] = useState('');
    const vendedor = route.params.idVendedor;
    const titulo = route.params.titulo;
    const img= route.params.img;

    function creator (){

        addDoc(collection(db, "chat"), {
            mensagem: mensagem,
            enderreco:endereco,
            idComprador: auth.currentUser.uid,
            idVendedor:vendedor,
            titulo:titulo,
            nomeComprador:nome,
            link:img,
          }).then(()=>{
            alert("Pedido Realizado Com Sucesso!!")

          }).catch((error) => {
            alert("Erro "+error);
          })
          }
    return(
        <View>
            <View style={{padding: 15, alignContent: 'center', alignItems:'center'}}>
                <Feather name = 'shopping-bag' size={100} color='#32CD32'></Feather>
                <Text style={{fontSize: 26, textAlign: 'center'}}>Preencha as informações para envio do seu pedido</Text>
            </View>

            <View style={{flex:1, alignItems:'center'}}>
                <TextInput
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                    placeholder="Seu nome..."
                    placeholderTextColor="gray"
                />
                <TextInput
                    value={quant}
                    onChangeText={setQuant}
                    style={styles.input}
                    placeholder="Quantidade desejada..."
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
                    value={mensagem}
                    onChangeText={setMensagem}
                    style={styles.input}
                    placeholder="Mensagem para o vendedor(Opcional)..."
                    placeholderTextColor="gray"
                    borderColor = '#32CD32'
                />

                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 15,marginTop:20 }}>
                    <TouchableOpacity
                        onPress={() => creator()}
                        style={{ backgroundColor: '#32CD32', width: 180, alignItems: 'center', justifyContent: 'center', height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#2F4F4F'}}><Text style={{ fontWeight: '400', fontSize: 20, color: '#333333', padding: 5 }}>COMPRAR</Text>
                        
                    </TouchableOpacity>
                </View>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#33333',
      marginTop: 10,
    },
  
    // input: {
    //     width: '90%',
    //     height: 50,
    
    //     padding: 15,
    //     marginVertical: 10,
    
    //     borderColor: '#32CD32',
    //     borderWidth: 2,
    //     borderRadius: 10,
    
    //     backgroundColor: '#ffffff',
    //     color: '#333333',
    //     fontSize: 20,
    // },
    input: {
        width: '90%',
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
        fontSize: 18
    }
    
  }
) ; 