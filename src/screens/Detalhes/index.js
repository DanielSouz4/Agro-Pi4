import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState,useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";


///import { getProduct } from "../../components/banco";
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

import {AntDesign} from '@expo/vector-icons';

import { Dimensions, Button, Alert, SafeAreaView,
   StyleSheet, Text, View, Image, TouchableOpacity,ScrollView,Pressable,Share
} from 'react-native';
///import { getProduct } from "../../components/banco";
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { isFavorite,saveFavorite, removeItem} from '../../storag/storage';

>>>>>>> 42624987c92a71d25e32dfeb313e8ecf6d371702


export default function Detalhes({ route }) {
  const navigation = useNavigation();
  const [favorite, setFavorite] =  useState(false)

  useLayoutEffect(() => {
    async function Favoritos(){
      const receipeFavorite = await isFavorite(route.params?.data)
      setFavorite(receipeFavorite)
    }

    Favoritos();

    navigation.setOptions({
      headerRight: () =>(
        <Pressable onPress={()=> recebeFavoritos(route.params.data)}>
          { favorite ? (
          <Entypo 
             name='heart'
             size={28}
             color={"#FF4141"}
             />
         ) : (
          <Entypo 
          name='heart-outlined'
          size={28}
          color={"#FF4141"}
          />
         )}
        </Pressable>
      )
         
    })
 
  },[navigation,route.params?.data,favorite])

  // async function recebeFavoritos(receipe){
  //   if(favorite){
  //     await removeItem(receipe.id)
  //     setFavorite(false)
  //   }else{
  //     await saveFavorite("@agrodigital",  receipe)
  //     setFavorite(true)
  //   }
  // }

  async function compartilhar(){
    try {
      await Share.share({
        url: "https://google.com",
        message: `Produto ${route.params.titulo}\n em destaque: ${route.params.desc}\venha conhecer esse produto`

      })
    } catch (error) {
      alert("error");
    }
  }

  const id = route.params.item;
  const desc = route.params.desc;
  const preco = route.params.preco;
  const titulo = route.params.titulo;
  const img = route.params.img;
  const idVendedor = route.params.idUser;

  const [count, setCount] = React.useState(1);

  function irCompra(id,titulo,idVendedor,img){
    navigation.navigate("Compra",{id:id,titulo:titulo,idVendedor:idVendedor,img:img})
  }

  return (
    <View style={styles.container}>
      {/* <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{titulo}</Text> */}
      <View>
        <Image
          style={styles.image}
          source={{
            uri: img
          }}
        />
      </View>

      <View style={{ padding: 10}}>
  
        <View style={{ padding: 5}}>

          <Text style={{ fontSize: 22, paddingBottom: 10}}>{desc}</Text>
          <Text>ID: {idVendedor}</Text>

          <View style={{paddingTop: 15}}>
            <TouchableOpacity onPress={() => {Alert.alert('Avaliações', 'Pressionado!!!')}}>
              <Text style={{color: 'gray'}}><AntDesign name='star' color={'#FFC700'} size={17}/> 0 Avaliações</Text>
            </TouchableOpacity>
          </View>

        </View>

        <Text style={{ fontSize: 26, color: '#333333', padding: 5, fontWeight: '480' }}>R${preco}</Text>
      

                    </Pressable>
                  </View>
                </View>

<<<<<<< HEAD
      <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 15 }}>
        <TouchableOpacity 
        onPress={() => irCompra(id,titulo,idVendedor,img)}
        style={{ backgroundColor: '#32CD32', width: 180, alignItems: 'center', justifyContent: 'center', height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#2F4F4F'}}><Text style={{ fontWeight: '400', fontSize: 20, color: '#333333', padding: 5 }}>COMPRAR</Text>
        </TouchableOpacity>
      </View>
=======
                <Text style={styles.price} >{preco} R$</Text>
                <Text style={styles.desc}>Descrição:</Text>
                <Text style={styles.description}>{desc}</Text>
>>>>>>> 42624987c92a71d25e32dfeb313e8ecf6d371702

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>
                
                

                
            </View>
            <Text style={{fontSize:19,fontWeight:'bold',color:'#404040',marginHorizontal:"3%"}}>Outras Frutas </Text>
            
          
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 36,
  },
=======
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      borderRadius: 13
    },
    desc : {
      fontSize: 20,
      color:'#0f6e3f',
      fontWeight:'700'
>>>>>>> 42624987c92a71d25e32dfeb313e8ecf6d371702

    },
    infoContainer: {
      padding: 16
    },
    name: {
      fontSize: 22,
      fontWeight: '400',
      color:'#0f6e3f'
    },
    frt: {
      fontSize: 22,
      fontWeight: 'bold',
      fontWeight:'800',
      marginBottom: 8,
    },
    price: {
      fontSize: 23,
      fontWeight: '600',
      marginBottom: 15,
    },
    description: {
      fontSize: 16,
      fontWeight: '400',
      color: '#404040',
      marginBottom: 16,
    },
    button: {
      backgroundColor: '#32CD32',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });