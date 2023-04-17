import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Button, Alert, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
///import { getProduct } from "../../components/banco";
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';

import {AntDesign} from '@expo/vector-icons';


export default function Detalhes({ route, navigation}) {

  const id = route.params.item;
  const desc = route.params.desc;
  const preco = route.params.preco;
  const titulo = route.params.titulo;
  const img = route.params.img;
  const idVendedor = route.params.idUser;

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
      

      </View>

      <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 15 }}>
        <TouchableOpacity 
        onPress={() => irCompra(id,titulo,idVendedor,img)}
        style={{ backgroundColor: '#32CD32', width: 180, alignItems: 'center', justifyContent: 'center', height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#2F4F4F'}}><Text style={{ fontWeight: '400', fontSize: 20, color: '#333333', padding: 5 }}>COMPRAR</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 36,
  },

  image: {
    width: Dimensions.get('window').width * 1.0,
    height: Dimensions.get('window').height * 0.40,
    borderRadius: 0,
    backgroundColor: '#fee',

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
    fontSize: 20,

  },

});
