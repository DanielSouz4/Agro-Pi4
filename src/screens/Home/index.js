import React, { useEffect, useState } from 'react';
import { View,Image, Alert, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, TextInput, ScrollView,SafeAreaView,StatusBar } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../components/config';
import {auth} from '../../components/config';
import { signOut } from 'firebase/auth';
import {Feather} from '@expo/vector-icons';


import Banner from '../Banner';
import { Logo } from '../Banner/logo';

const {width}=Dimensions.get('window');
const {height}=Dimensions.get('window');

const produtosCategorias = [
    {name: 'FRUTA', icon: 'fruit-watermelon'},
    {name: 'LEGUME', icon: 'pumpkin'},
    {name: 'VERDURA', icon: 'carrot'},
    {name: 'GRÃO', icon: 'grain'},
  ];

  const Card = ({produto, navigation}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Detalhes',produto)}>
        <View style={styles.cardContainer}>
          {/* image */}
          <View style={styles.cardImageContainer}>
            <Image
              source={{uri:produto.img}}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
  
          {/* Apresenta todos os detalhes do cartão aqui */}
          <View style={styles.cardDetailsContainer}>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{fontWeight: 'bold', color: '#005C53', fontSize: 20}}>
                {produto?.titulo}
              </Text>
              
            </View>
  
            
            <Text style={{fontSize: 17, marginTop: 5,marginLeft:23,fontWeight:'bold' }}>
              {produto?.preco}R$
            </Text>
            

            
            <View style={{marginTop: 5, flexDirection: 'row',alignItems:'center',justifyContent:'flex-start'}}>
             
              <FontAwesome name={'star'} size={20} color={'#F0E68C'} />
              <FontAwesome name={'star'} size={20} color={'#F0E68C'} />
              <FontAwesome name={'star'} size={20} color={'#F0E68C'} />
              <Text style={styles.ratingText}>4.2</Text>
            <  Text style={styles.reviewsText}>({233})</Text>

            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

export default function Home({navigation}) {

    // const statusBarHeight = StatusBar.currentHeight || 0; // Obtenha a altura da barra de status (ou 0 se não for possível determinar)
    const [selectcategorias,setSelectCategorias] = useState(0);
    const [filterproduto, setFilterProduto] = useState([])
    const [data, setData] = useState([]);
    const [list, setList] = useState(data);
    const [searchText, setSearchText] = useState('');

    
    console.log(data);
    const fliterPro = index => {
      const currentProducts = data.filter(
        item => item?.tipoProduto?.toUpperCase() == produtosCategorias[index].name.toUpperCase(),
      );
      console.log( produtosCategorias[index].name + ":",currentProducts)
      if (currentProducts.length > 0) {
        setFilterProduto(currentProducts);
      } else {
        setFilterProduto([]);
        
      }
    };
    
    useEffect(() => {
      fliterPro(0);
    }, []);


    

    //busca    

    //organizar lista <<cria nova lista a partir de data e reoganiza atraves da barra de pesquisa
    // const handleOrderClick = () => {
    //     let newList = [data];
    
    //     newList.sort((a, b) => (a.titulo > b.titulo ? 1 : b.titulo > a.titulo ? -1 : 0));
    
    //     setList(newList);
    //   };
// fazer logoff
    async function LogOff(){
        signOut(auth)
        .then(
            navigation.navigate('Login')
            
        ).catch(error => alert(error+'Log Out não efetuado!!'));
    };
// receber dados do banco e daicionar a const data
    useEffect(() => {
        getDocs(collection(db, 'anuncios')).then(
            (docSnap) => {
                const users = [];
                docSnap.forEach((doc) => {
                    users.push({ 
                        ...doc.data(), 
                        id: doc.id
                    })
                })
                setData(users);
                //setList(data)
            });
    },[data]);
    

    useEffect(() => {
        if (searchText === '') {
            setFilterProduto(data);
        } else {
            setFilterProduto(
                data.filter(
                    (item) =>
                        item.titulo.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                )
            );
        }
    }, [searchText]);

    function deleteData(id) {
        deleteDoc(doc(db, "anuncios",id));
    }
    function irFilter(tipo){
        navigation.navigate("Filter",{tipo,data})
    }
    function irDetalhes(id,desc,preco,titulo,imagem,idUser){
        navigation.navigate("Detalhes",{item:id,desc:desc,preco:preco,titulo:titulo,img:imagem,idUser:idUser})
    }
    function irNote(){
        navigation.navigate("notificacao")
    }
    //falta fazer a pagina menuLateral
    function menuLateral(){
        navigation.navigate("")
    }
    function irAdd(){
        navigation.navigate("Add")
    };

 return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff',paddingTop:32}}>

        <View style={styles.headerView}>
            
            <Logo />

             <Text style={{color:'#005C53', fontWeight:'bold', fontSize:16}}>
                 Seja Bem vindo!
             </Text>

             <TouchableOpacity style={{height:30,width:30,borderRadius:16,backgroundColor:'gray'}}>
                <AntDesign name="user" size={28} color="white" />
            </TouchableOpacity>
         </View>
         <Banner />

         <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.mainContainer}>
            
            <View style={styles.searchInputContainer}>
                <AntDesign name="search1" size={24} color="black" />
                <TextInput
                placeholderTextColor={'gray'}
                placeholder=" Busque seu produto"
                style={{flex: 1}}
                value={searchText}
                onChangeText={(t) => setSearchText(t)}
                />
                <FontAwesome5 name="sort-amount-down" size={24} color="gray" />
                
            </View>

            

            {/* iniciando categorias  */}
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
                
                {produtosCategorias.map((item, index) => (
                    <View key={'produto' + index} style={{alignItems: 'center'}}>
                        <TouchableOpacity
                        onPress={()=> {
                            setSelectCategorias(index);
                            fliterPro(index);
                        }}
                        style={[
                            styles.categoryBtn,
                            {
                                backgroundColor:
                                  selectcategorias == index
                                    ? '#007566'
                                    : 'white'
                              },
                        ]}>

                        <MaterialCommunityIcons 
                         name={item.icon} size={24} 
                         color={selectcategorias == index
                                    ? 'white'
                                    : '#007566'} />

                        </TouchableOpacity>
                        <Text style={styles.categoryBtnName}>{item.name}</Text>
                        </View>
                    ))}

            </View>

            {/* iniciando a flatlist */}
            <View style={{marginTop: 20}}>
                    <FlatList
                showsVerticalScrollIndicator={false}
                data={filterproduto}
                renderItem={({item}) => (
                    <Card produto={item} navigation={navigation} />
                )}
                />
            </View>

        

            </View>


            

        </ScrollView>
        
            
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
    headerView:{
        padding:17,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop: 16 
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#dbead5',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 40,
        minHeight: height,
      },
      searchInputContainer: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 7,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },

      categoryBtn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        
      },
      categoryBtnName: {
        color: '#005C53',
        fontSize: 10,
        marginTop: 5,
        fontWeight: 'bold',
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
   
})