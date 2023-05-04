import React, { useEffect, useState } from 'react';
import { View,Image, Alert, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, TextInput, ScrollView } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../components/config';
import {auth} from '../../components/config';
import { signOut } from 'firebase/auth';
import {Feather} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import Banner from '../Banner';

const {width}=Dimensions.get('window');

export default function Home({navigation}) {
    const fruta = "Fruta";
    const verdura= "verdura";
    const legume = "legume";
    const grao = "grao";
   
    const [data, setData] = useState([]);
    const [list, setList] = useState(data);
    const [searchText, setSearchText] = useState('');
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
            setList(data);
        } else {
            setList(
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
    <ScrollView style={styles.container}>
        

            {/*Inicio da gambiarra :)  */}
            <View style={styles.userTest}>

                <Text  style={{fontSize:22, paddingRight: 28, marginLeft: 14, color:'#33333'}}>Olá, seja bem vindo!</Text>

                <View style={{ paddingHorizontal: 4}}>
                    <TouchableOpacity onPress={() => irNote()}>
                        <AntDesign titulo="bells" size={26} color="#32CD32" />
                        
                    </TouchableOpacity>
                 
                </View>
                <View style = {{marginLeft: 4, marginRight:6}}>
                    <TouchableOpacity onPress={()=> irAdd()}>
                        <AntDesign titulo="pluscircleo" size={26} color="green" />
                    </TouchableOpacity>
                </View>

                <View style={{ backgroundColor: 'gray' ,borderRadius: 50, padding: 6}}>
                    <TouchableOpacity onPress={LogOff}>
                        <AntDesign titulo="user" size={28} color="white" />
                    </TouchableOpacity>
                </View>

                

            </View>
            
            <View style={styles.headerNavBar}>{/*Inicio barra pesquisa */}
                <View style={styles.navBar}>
                    {/* <Feather titulo = 'search' size={24} color = '#90EE90'></Feather> */}
                 <TextInput
                     style={styles.input}
                     placeholder="Pesquise um produto"
                     placeholderTextColor="#888"
                     value={searchText}
                     onChangeText={(t) => setSearchText(t)}
                 />

                
                            
                </View>
                <View style={styles.iconNav }>
                    <TouchableOpacity onPress={() => navigation.navigate('Produtos')} ><AntDesign titulo='bells' size={21} color='#90EE90'/></TouchableOpacity>
                </View>
                        
            </View>{/*Fim fim barra pesquisa */}

            {/*Inicio banner */}
            <Banner/>
            



        {/*Inicio Categorias*/}   
        <View style={styles.title02}>
            <Text style={{fontSize: 26, marginHorizontal: 10, color:'#33333'}}>Categorias</Text>
            <View style={{left: 0}}><TouchableOpacity onPress={() => Alert.alert('Exibir', 'Clicou Exibir')}><Text style={styles.txtPress}>Exibir <AntDesign titulo="right" size={14} color="#32CD32" /></Text></TouchableOpacity></View>
        </View>

        <ScrollView horizontal={true}>
            <View style={{}}>
                <TouchableOpacity onPress={""}  style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/5371/5371284.png'}} style={styles.image02} />
                    <Text style={{justifyContent: 'center', marginLeft: 10}}>Frutas</Text>
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={() => irDetalhes(grao)}  style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/3332/3332099.png'}} style={styles.image02} />
                    <Text style={{justifyContent: 'center', marginLeft: 6}}>Grãos</Text>
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={() => irFilter(legume)} style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/776/776500.png'}} style={styles.image02} />
                    <Text style={{justifyContent: 'center', marginLeft: 10}}>Legumes</Text>
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={() => irFilter(verdura)}style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/5260/5260841.png'}} style={styles.image02} />
                    <Text style={{justifyContent: 'center', marginLeft: 10}}>Verduras</Text>
                </TouchableOpacity>
            </View>
            <View style={{}}>
                <TouchableOpacity onPress={() => {Alert.alert('Categorias', 'Clicou Verduras')}}  style={{justifyContent:'center', alignItems:'center'}}>
                    <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/2153/2153788.png'}} style={styles.image02} />
                    <Text style={{justifyContent: 'center', marginLeft: 10}}>Verduras</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
         
        
        {/* <FlatList 
        
        style={{maxHeight:width}}
        
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=> String(item?.id)}
        renderItem={({item})=><OnBoardingItem item ={item}/>}

        data={data}

                    renderItem={
                        ({ item }) => (
                        <ScrollView> 
                    
                    
                        <View style={{marginTop: 20}}>
                        <TouchableOpacity onPress={() => irDetalhes(item.id,item.descricao,item.preco,item.titulo,item.img,item.idUser)} style={{justifyContent:'center', alignItems:'center'}}>
                            <Image source={{uri:item.img}} style={styles.image02} />
                            <Text style={{justifyContent: 'center'}}>{item.titulo}</Text>
                        </TouchableOpacity>
                        </View>

                        </ScrollView>

                        
                        )}
            

                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 50}}
                    ListEmptyComponent={() => (
                        <Text style={{textAlign: 'center', color: '#fff'}}>
                            Nenhum Dado Encontrado!
                        </Text>
                    )}
                /> */}
                
            {/*Fim da FlatList Categorias*/}
            
            
            {/*Ofertas Populares*/}
            <View style={{flexDirection: 'row', paddingTop: 26}}>
                
                <Text style={{padding: 10, fontSize: 26 }}>Ofertas Populares</Text>

                <TouchableOpacity onPress={() => {Alert.alert('Ofertas Populares', 'Clicou Ver mais')}}>
                    <Text style={{color:'#32CD32', fontSize: 14, top: 20, left: 40}}>Ver mais</Text>
                </TouchableOpacity>

                <View style={{top:24, left: 50,  }}><AntDesign titulo='right' size= {14} color = '#32CD32'/></View>
                
            </View>
            {/*Inicio da FlatList 'Ofertas Populares'*/}
            <View>
                <FlatList
                    style={{maxHeight:width}}
                    
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item)=> String(item?.id)}
                    //renderItem={({item})=><OnBoardingItem item ={item}/>}

                    data={data}

                    renderItem={
                        ({ item }) => (
                            <View >

                            
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <TouchableOpacity onPress={() => irDetalhes(item.id,item.descricao,item.preco,item.titulo,item.img,item.idUser)}>
                                        <Image source={{uri:item.img}} style={styles.imagem} />
                                        <Text style={{right: 320, color: '#333333', fontSize: 22}}>{item.titulo}</Text>
                                    </TouchableOpacity>
                                
                                        
                    
                                    <View style={styles.containerProdutos}>

                                    <View style={{flex:1 , flexDirection: 'row', marginTop: 0, width: 140, }}>
                                    <View style={{right: 380}}><AntDesign titulo="star" size={19} color="#FFC700"  /></View>
                                    <Text style={{right: 20, paddingRight: 0, color: 'gray'}}>0 Avaliações</Text>
                                    <Text style={{left: 90, color:'#333333', fontSize: 18}}>R$ {item.preco}</Text>
                                    </View>

                                    </View>
                                
                                </View>
                            </View>
                        )}
            //
                            
            //

                    //keyExtractor={item => item.id}
                    //showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 50}}
                    ListEmptyComponent={() => (
                        <Text style={{textAlign: 'center', color: '#fff'}}>
                            Nenhum Dado Encontrado!
                        </Text>
                    )}
                />
            {/*Fim da FlatList*/}

             {/*Inicio da FlatList de 'Prod'*/}   
             {/*Está com um erro Ajeitar depois :( */}
             <Text style={{color: '#333333', fontSize: 26}}> Todos os Produtos </Text>
        <ScrollView>

        <FlatList 
        data={list}
        keyExtractor={item => item.id}

        

                    renderItem={
                        ({ item }) => (

                            
                            <View style={styles.header03}>
                                
                                <Image style={styles.img03}source={{uri: item.img,}} />
                        
                            <TouchableOpacity onPress={() => irDetalhes(item.id,item.descricao,item.preco,item.titulo,item.img,item.idUser)} style={{justifyContent:'center', alignItems:'center'}} style={styles.texto03 } >
                                <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>{item.titulo}</Text>
                                <View style={{flex:1 , flexDirection: 'row', marginTop: 5, width: 140}}>
                                    <AntDesign titulo="star" size={19} color="#FFC700" />
                                    <Text style={{left: 5, paddingRight: 10, color: 'gray'}}>4.8</Text>
                                    <Text style={{color: 'gray'}}>75 mais votados</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={{marginBottom: 0,alignContent: 'center',color: '#333333', fontSize: 22}} >R$ {item.preco}</Text>
                                    <AntDesign titulo="tags" size={22} color="#32CD32" />
                                    
                                </View>
                            </TouchableOpacity>
                        
                    </View>
                    

                        
                        )}
            //
                            
            //

                    
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 50}}
                    ListEmptyComponent={() => (
                        <Text style={{textAlign: 'center', color: '#fff'}}>
                            Nenhum Dado Encontrado!
                        </Text>
                    )}
                />
                </ScrollView>

        </View>

        

        

</ScrollView>
  );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 25,
        backgroundColor: '#000',
        width: '100%',
        height:'100%',
    },
    image: {
        width: 80,
        height: 80,
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        marginBottom: 25,
        
    },
    header:{
        color: '#FFF',
        fontSize: 32,
        fontWeight:'bold',
        
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
    item: {
        height: 150,
        backgroundColor: '#FFF',
        elevation: 1,
        marginVertical: 5,
        marginHorizontal: 5,
        marginHorizontal:5,
        borderRadius: 10,
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    data: {
        flex: 1,
        
    },
    itemButtons: {
        paddingHorizontal: 15,
        justifyContent:'space-between',
        flex: 1,
        flexDirection:"column"
    },
    id: {
        fontSize: 14,
        
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        
    },
    email: { 
        color: '#000',
        fontSize: 16,
    },
    addUser: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        elevation: 10,
        backgroundColor: 'green',
        borderRadius: 50,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    addUser2: {
        position: 'relative',
        right: 15,
        bottom: 15,
        elevation: 10,
        backgroundColor: 'red',
        borderRadius: 50,
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtAddUser: {
        fontSize: 32,
        fontWeight:'bold',
        color: '#FFF'
    },
    //Styles meus
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 0,
        marginTop: 0,
        marginTop: 35.5,
        width: '100%',
        height:'100%'
        
      },
      //imagem carrousel
      imagem: {
        width: 320,
        height:Dimensions.get('window').height*0.30,
        borderRadius: 25,
        marginHorizontal: 10,
        backgroundColor: '#fee',
        
        
    
      },
      containerProdutos: {
    
        justifyContent:'flex-start', 
        height: 40, 
        width: 40, 
        marginRight: 4, 
        marginHorizontal: 40, 
        right: 108,
                                            
      },
      //Gambiarra abaixo :)
      userTest:{
        flex: 1,
        paddingHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '98%',
        marginVertical: 0
    },//Barra de pesquisa
    headerNavBar:{
        flex: 1,
        paddingHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '98%',
        marginVertical: 0,
        padding: 30
        
    },
    navBar:{
        
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        height: 38,
        borderRadius: 12,
        elevation: 12,

    },
    input:{
        paddingHorizontal: 10,
        fontSize: 13,
        width: '90%'
    },
    iconNav:{
        elevation: 12,
        height: 37.5,
        width: 38,
        justifyContent: 'center',
        backgroundColor: '#ffff', 
        marginLeft: 8,
        borderRadius: 8,
        paddingHorizontal: 20,
        alignItems: 'center'

    },//Fim estilos da barra de pesquisa
    //Categorias
    container02: {
        flex: 1,
        paddingTop:10,
        flexDirection:'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 20
    
      },
      image02: {
        
        width: 65,
        height: 65,
        marginLeft: 20,
        borderRadius: 20,
        marginHorizontal: 10,
        backgroundColor: '#fee',
        
        
    
      },
      title02:{
        
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        marginTop: 40,
        marginBottom: 10
    },
    txtPress:{
      color: '#32CD32',
      top: 6.4,
      fontSize: 16,
      paddingHorizontal: '30%'
      
    },
    //Teate Todos os produtos
    header03:{
        flex:1,   
        flexDirection:'row',
        marginVertical: 20,
        paddingLeft: 10,
        borderRadius:20,
        height: 180,
        width: 160,
        elevation: 30,
        
      

    },
    texto03:{
        flexDirection:'column',
        paddingLeft:10
    },
    img03:{
        height: 180,
        width: 165,
        borderRadius:20,
        paddingLeft:10
    },//Fim Teste Todos os produtos
})