import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Button, Alert, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
///import { getProduct } from "../../components/banco";
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';




export default function Detalhes({ route, navigation}) {

  const id = route.params.item;
  const desc = route.params.desc;
  const preco = route.params.preco;
  const titulo = route.params.titulo;
  const img = route.params.img;
  const idVendedor = route.params.idUser;

  function irCompra(id,titulo,idVendedor){
    navigation.navigate("Compra",{id:id,titulo:titulo,idVendedor:idVendedor})
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{titulo}</Text>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: img
          }}
        />
      </View>
      <Text style={{ fontSize: 26, fontWeight: 'bold', color:'#33333' }}>Descrição</Text>
      <View style={{ paddingTop: 10 }}>
        <Text style={{ fontSize: 25, padding: 15 }}>{desc}</Text>
        <Text>{idVendedor}</Text>
      </View>
      <Text style={{ fontSize: 26, color: '#333333', paddingTop: 10 }}>R${preco}</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>

      </View>

      <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', padding: 15 }}>
        <TouchableOpacity 
        onPress={() => irCompra(id,titulo,idVendedor)}
        style={{ backgroundColor: '#32CD32', width: '80%', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 10, borderWidth: 1 }}><Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000', padding: 5 }}>COMPRAR</Text></TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 10,
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
