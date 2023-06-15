import React, { useState } from 'react';
import {View,Text,FlatList, TouchableOpacity,StyleSheet}from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons,Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export default function Perfil({navigation,route}){
    const data = route.params;
    function goUpdate(){
        navigation.navigate('Update',data)
    };
    function irUpdate(id,nome,endereco,telefone){
        navigation.navigate("Update",{id:id,nome:nome,endereco:endereco,telefone:telefone})
      }
    return(
        <View style={styles.container}>
            <FlatList
            data = {data}
            renderItem={
                ({item})=>(
                    <View style={styles.container}>
                        <View >
                            <Text style={{fontSize:30,color:'green',fontWeight:'bold',elevation:10,textShadowColor:'black',textShadowRadius:2}}>Meu Perfil</Text>
                        </View>

                       
                            <View style={styles.itens}>
                                
                                <FontAwesome name="user" size={24} color="black" />
                                <Text style={{fontWeight:'bold'}}>  {item.nome}</Text>
                            </View>

                            <View style={styles.itens}>
                            <Entypo name="location" size={24} color="black" />
                            <Text style={{fontWeight:'bold'}}>  {item.endereco}</Text>
                            </View>
                            
                            <View style={styles.itens}> 
                                <MaterialIcons name="email" size={24} color="black" />
                                <Text style={{fontWeight:'bold'}}>  {item.email}</Text>
                            </View>
                            

                            <View style={styles.itens}>                               
                                <FontAwesome name="phone-square" size={24} color="black" />
                                <Text style={{fontWeight:'bold'}}>  {item.telefone}</Text>
                            </View>
                            
                            <View style={styles.dados}>
                                <TouchableOpacity style={styles.button}
                                onPress={()=>irUpdate(item.id,item.nome,item.endereco,item.telefone)}
                                >
                                    <FontAwesome name="pencil-square-o" size={24} color="black" />
                                    <Text style={{fontWeight:'bold'}}>Editar informações</Text>
                                </TouchableOpacity>
                            </View>                        

                </View>
                )
            }
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            ListEmptyComponent={() => (
                <Text style={{ textAlign: 'center', color: 'black', fontSize: 22, marginTop: 20, fontWeight:'bold' }}>
                    Nenhum Dado Encontrado!
                </Text>
            )}
            />

        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        height:500,
        backgroundColor:'#ffff',
        justifyContent:'space-between',
        alignItems:'center',
        //alignContent:"center"

    },
    itens:{
        alignItems:'center',
        justifyContent:'flex-start',
        flexDirection:'row',
        padding:10,
        height:60,
        //marginHorizontal:70,
        width:350,
        backgroundColor:'#f5f7f5',
        elevation:5,
    },
    bt:{
        backgroundColor:'green',
        width:200,
        flexDirection:'row',
        height:50,
        borderBottomColor:'black',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        elevation:5
    },
    dados:{
        //height:60,
        //width:'80%',
        //backgroundColor:'#f5f7f5',
        //elevation:1,
        marginTop:30,
        justifyContent:'center',
        alignItems:'center'

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
})