import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../components/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Card = ({ produto, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Detalhes', produto)}>
      <View style={styles.cardContainer}>
        {/* image */}
        <View style={styles.cardImageContainer}>
          <Image
            source={{ uri: produto.img }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* Apresenta todos os detalhes do cartão aqui */}
        <View style={styles.cardDetailsContainer}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{ fontWeight: 'bold', color: '#005C53', fontSize: 20 }}>
              {produto?.titulo}
            </Text>

          </View>


          <Text style={{ fontSize: 17, marginTop: 5, marginLeft: 23, fontWeight: 'bold' }}>
            {produto?.preco}R$
          </Text>



          <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>

            <FontAwesome name={'star'} size={20} color={'#F0E68C'} />
            <FontAwesome name={'star'} size={20} color={'#F0E68C'} />
            <FontAwesome name={'star'} size={20} color={'#F0E68C'} />
            <Text style={styles.ratingText}>4.2</Text>
            <Text style={styles.reviewsText}>({233})</Text>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};



export default function Favoritos({ navigation }) {
  const [favoriteProducts, setFavoriteProducts] = useState([]);


  async function fetchFavoriteProducts() {
    try {
      const q = query(collection(db, 'anuncios'), where('favorito', '==', true));
      const querySnapshot = await getDocs(q);
      const favoriteProductsData = [];

      querySnapshot.forEach((doc) => {
        favoriteProductsData.push(doc.data());
      });

      setFavoriteProducts(favoriteProductsData);
    } catch (error) {
      console.error('Erro ao buscar produtos favoritos:', error);
    }
  }

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);


  return (
    <SafeAreaView style={styles.container}>

      {favoriteProducts.length === 0 && (
        <Text>Voçê ainda nao tem nenhuma receita salva</Text>
      )}

      {favoriteProducts.map((produto) => (
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 42 }}>
          <Text style={styles.title}>Meus favoritos</Text>

          <View style={styles.mainContainer} >

            <FlatList
              showsVerticalScrollIndicator={false}
              data={favoriteProducts}
              renderItem={({ item }) => (
                <Card produto={item} navigation={navigation} />
              )}

            />

          </View>
        </ScrollView>
      ))}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#DCDCDC',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,

  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,

  },
  cardDetailsContainer: {
    height: 120,
    backgroundColor: 'white',
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: '#F0EFE8',
    borderRadius: 20,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: 'black',
  },
  reviewsText: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: 'black',
  },
  title: {
    color: '#005C53',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center'
  }

})
