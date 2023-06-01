import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState,useLayoutEffect } from "react";
import { Dimensions, Button, Alert, SafeAreaView,
   StyleSheet, Text, View, Image, TouchableOpacity,ScrollView,Pressable,Share
} from 'react-native';
///import { getProduct } from "../../components/banco";
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { isFavorite,saveFavorite, removeItem,getFavorites} from '../../storag/storage';
import Comprar from './../Compra/index';



export default function Detalhes({navigation,route}) {

  const produto = route.params;
  const [count, setCount] = useState(1);
  const [favorite, setFavorite] =  useState(false);
  const [isfavorite, setIsFavorite] =  useState(false);

  // useLayoutEffect(() => {
  //   async function Favoritos(){
  //     const receipeFavorite = await isFavorite(route.params?.data)
  //     setFavorite(receipeFavorite)
  //   }

  //   Favoritos();

  //   navigation.setOptions({
  //     headerRight: () =>(
  //       <Pressable onPress={() => recebeFavoritos(route.params.data)}>
  //         { favorite ? (
  //         <Entypo 
  //            name='heart'
  //            size={28}
  //            color={"#FF4141"}
  //            />
  //        ) : (
  //         <Entypo 
  //         name='heart-outlined'
  //         size={28}
  //         color={"#FF4141"}
  //         />
  //        )}
  //       </Pressable>
  //     )
         
  //   })
 
  // },[navigation,route.params?.data,favorite])

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

  

  function irCompra(id,titulo,idVendedor,img){
    navigation.navigate("Compra",{id:id,titulo:titulo,idVendedor:idVendedor,img:img})
  }

  return (
    <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            
            
          }}>
          <Image source={{uri:produto.img}} style={{ width: '80%',aspectRatio: 1,borderRadius: 7}} />
        </View>
        <View style={styles.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color:'#005C53'}}>
              {produto.titulo}
            </Text>
            
            <View style={styles.iconContainer}>
              <Pressable onPress={compartilhar}>
                      <Feather 
                       name='share-2'
                       size={30} 
                       color='#007566'
                       
                       />

              </Pressable>
             
            </View>
          </View>
          <Text style={{fontSize: 23,fontWeight: '600'}} >
            {produto.preco} R$
          </Text>
          <View style={{marginTop: 5, flexDirection: 'row',alignItems:'center',justifyContent:'flex-start'}}>
             
             <FontAwesome name={'star'} size={20} color={'#cccc00'} />
             <FontAwesome name={'star'} size={20} color={'#cccc00'} />
             <FontAwesome name={'star'} size={20} color={'#cccc00'} />
             <Text style={styles.ratingText}>4.2</Text>
           <  Text style={styles.reviewsText}>({233})</Text>

           </View>
          <Text style={styles.detailsText}>
            {produto.desc}
          </Text>

          {/*footer */}
        <View style={styles.footer}>
          <View style={styles.iconCon} >
          <TouchableOpacity onPress={() => setIsFavorite(!isfavorite)} >
          <Entypo 
            name= {isfavorite?'heart':'heart'}
            size={28}
            color={isfavorite?"#FF4141":"#fff"}
          />
          </TouchableOpacity>

          </View>
          <View style={styles.btn}>
            <TouchableOpacity style={styles.button}>
            <Text style={{color: 'white', fontWeight: 'bold'}} onPress={()=>irCompra(produto.id,produto.titulo,produto.idUser,produto.img)}>
              COMPRAR
            </Text>
            </TouchableOpacity>
          </View>
        </View>
    

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

    details: {
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 60,
      backgroundColor: '#ffffff',
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      width:'100%',
      height:'100%'
    },
    iconContainer: {
      backgroundColor: '#f2f2f2',
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
    },
    detailsText: {
      marginTop: 10,
      lineHeight: 22,
      fontSize: 16,
      color: '#404040',
    },
    button: {
    backgroundColor: '#005C53',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ffff',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  footer: {
    height: 100,
    backgroundColor: '#dbead5',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconCon: {
    backgroundColor: '#005C53',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  btn: {
    backgroundColor: '#005C53',
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  
  });