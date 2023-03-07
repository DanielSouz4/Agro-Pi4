import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { View,StyleSheet,Text,TextInput,TouchableOpacity } from "react-native";
import {auth} from '../../components/config';
import {db} from '../../components/config';
import {collection,addDoc} from 'firebase/firestore';
export default function Comprar({route}){
    const [quant, setQuant] = useState('');
    const [endereco,setEndereco] = useState('');
    const [nome,setNome] = useState('');
    const [tel,setCel] = useState('');
    const [mensagem,setMensagem] = useState('');
    const vendedor = route.params.idVendedor;
    const titulo = route.params.titulo;

    function creator (){

        addDoc(collection(db, "chat"), {
            mensagem: mensagem,
            enderreco:endereco,
            idComprador: auth.currentUser.uid,
            idVendedor:vendedor,
            titulo:titulo,
            nomeComprador:nome,
          }).then(()=>{
            alert("Pedido Realizado Com Sucesso!!")

          }).catch((error) => {
            alert("Erro "+error);
          })
          }
    return(
        <View>
            <View>
                <Text style={{fontSize: 26, textAlign: 'center'}}>Preencha as informações para envio do seu pedido</Text>
            </View>

            <View style={{flex:1, alignItems:'center'}}>
                <TextInput
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                    placeholder="Seu nome.."
                    placeholderTextColor="gray"
                />
                <TextInput
                    value={quant}
                    onChangeText={setQuant}
                    style={styles.input}
                    placeholder="Quantidade desejada.."
                    placeholderTextColor="gray"
                />

                <TextInput
                    value={endereco}
                    onChangeText={setEndereco}
                    style={styles.input}
                    placeholder="Endereço.."
                    placeholderTextColor="gray"
                />

                <TextInput
                    value={mensagem}
                    onChangeText={setMensagem}
                    style={styles.input}
                    placeholder="Mensagem para o vendedor(Opcional).."
                    placeholderTextColor="gray"
                    borderColor = '#32CD32'
                />

                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 15,marginTop:20 }}>
                    <TouchableOpacity
                        onPress={() => creator()}
                        style={{ backgroundColor: '#32CD32', width: '100%', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 10, borderWidth: 2 }}><Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000', padding: 5 }}>COMPRAR</Text>
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
  
    input: {
        width: '90%',
        height: 50,
    
        padding: 15,
        marginVertical: 10,
    
        borderColor: '#32CD32',
        borderWidth: 2,
        borderRadius: 10,
    
        backgroundColor: '#ffffff',
        color: '#333333',
        fontSize: 20,
    }
  }
) ; 