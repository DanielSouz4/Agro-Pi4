import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState,useLayoutEffect } from "react";
import { Dimensions, Button, Alert, SafeAreaView,
   StyleSheet, Text, View, Image, TouchableOpacity,ScrollView,Pressable,Share, TouchableOpacityBase
} from 'react-native';
///import { getProduct } from "../../components/banco";


import { collection, doc, updateDoc, arrayUnion, arrayRemove,getDoc } from 'firebase/firestore';
import { db } from '../../components/config';
import AsyncStorage from '@react-native-async-storage/async-storage';



import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import { isFavorite,saveFavorite, removeItem,getFavorites} from '../../storag/storage'

import Comprar from './../Compra/index';



export default function Detalhes({navigation,route,id}) {

  const produto = route.params;
  const [count, setCount] = useState(1);
  const [isfavorite, setIsFavorite] =  useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Função assíncrona para buscar o estado de favorito do produto no Firestore
    async function fetchFavoriteStatus() {
      try {
        const productRef = doc(db, 'anuncios', produto.id);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          const favoriteStatus = productDoc.data().favorito || false;
          setIsFavorite(favoriteStatus);
        }
      } catch (error) {
        console.error('Erro ao buscar o status de favorito do produto:', error);
      }
    }

    fetchFavoriteStatus();
  }, [produto.id]);

  async function toggleFavorite() {
    try {
      const productRef = doc(db, 'anuncios',produto.id);
      const productDoc = await getDoc(productRef);
      await updateDoc(productRef, { favorito: !isfavorite });
      setIsFavorite(!isfavorite);
      if (productDoc.exists()) {
        const productData = productDoc.data();
        const currentFavoriteStatus = productData && productData.favorito ? productData.favorito : false;
        await updateDoc(productRef, { favorito: !currentFavoriteStatus });
        setIsFavorite(!currentFavoriteStatus);
      }
    } catch (error) {
      console.error('Erro ao favoritar o produto:', error);
    }
  }


  

  

 
  


  
  

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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </Text>

           {/*footer */}
        <View style={styles.footer}>
          <View style={styles.iconCon} >
          <TouchableOpacity onPress={() => toggleFavorite()} >
          <Entypo 
            name= {isfavorite ? 'heart':'heart'}
            size={28}
            color={isfavorite ?"#FF4141":"#fff"}
          />
          </TouchableOpacity>

          </View>
          <View style={styles.btn}>
            <TouchableOpacity style={styles.button}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
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
      backgroundColor: '#dbead5',
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