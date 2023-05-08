import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState,useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Button, Alert, SafeAreaView,
   StyleSheet, Text, View, Image, TouchableOpacity,ScrollView,Pressable,Share
} from 'react-native';
///import { getProduct } from "../../components/banco";
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { isFavorite,saveFavorite, removeItem,getFavorites} from '../../storag/storage';



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
        <Pressable onPress={null}>
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
    <SafeAreaView>
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={img} />
            </View>
              <View style={styles.infoContainer} >
                  <Text style={styles.frt}>{titulo}</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                   <Text style={styles.name}>{titulo}</Text>
                  
                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
                
                    <Pressable onPress={compartilhar}>
                      <Feather 
                       name='share-2'
                       size={30} 
                       color='#121212'
                       style={{paddingRight:25}}
                       />

                    </Pressable>
                  </View>
                </View>

                <Text style={styles.price} >{preco} R$</Text>
                <Text style={styles.desc}>Descrição:</Text>
                <Text style={styles.description}>{desc}</Text>

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