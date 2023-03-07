import React, { useEffect, useState } from 'react';
import { View,Image, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, TextInput, ScrollView } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../components/config';
import {auth} from '../../components/config';
import { signOut } from 'firebase/auth';
import {Feather} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width}=Dimensions.get('window');

export default function Home({navigation}) {

    const [ data, setData ] = useState([]);
    async function LogOff(){
        signOut(auth)
        .then(
            navigation.navigate('Login')
            
        ).catch(error => alert(error+'Log Out não efetuado!!'));
    };

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
            });
    }, [data]);

    function deleteData(id) {
        deleteDoc(doc(db, "anuncios", id));
    }
    function irDetalhes(id,desc,preco,titulo,imagem,idUser){
        navigation.navigate("Detalhes",{item:id,desc:desc,preco:preco,titulo:titulo,img:imagem,idUser:idUser})
    }
    function irNote(){
        navigation.navigate("notificacao")
    };
    function irAdd(){
        navigation.navigate("Add")
    }

 return (
    <ScrollView style={styles.container}>
        

            {/*Inicio da gambiarra :)  */}
            <View style={styles.userTest}>

                <Text  style={{fontSize:22, paddingRight: 28, marginLeft: 14, color:'#33333'}}>Olá, seja bem vindo!</Text>

                <View style={{ paddingHorizontal: 26}}>
                    <TouchableOpacity onPress={() => irNote()}>
                        <AntDesign name="bells" size={26} color="#32CD32" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> irAdd()}>
                        <AntDesign name="pluscircleo" size={26} color="green" />
                    </TouchableOpacity>
                    
                    
                </View>

                <View style={{ backgroundColor: 'gray' ,borderRadius: 50, padding: 6}}>
                    <AntDesign name="user" size={28} color="white" />
                </View>

                

            </View>
            <View style={styles.headerNavBar}>{/*Inicio barra pesquisa */}
                        <View style={styles.navBar}>
                            <Feather name = 'search' size={24} color = '#90EE90'></Feather>
                            <TextInput style={styles.input} placeholder='Search'></TextInput>
                            
                        </View>
                        <View style={styles.iconNav }>
                            <TouchableOpacity onPress={() => navigation.navigate('Produtos')} ><Feather name='search' size={21} color='#90EE90'/></TouchableOpacity>
                        </View>
                        
                    </View>{/*Fim fim barra pesquisa */}



        {/*Inicio Categorias*/}   
        <View style={styles.title02}>
            <Text style={{fontSize: 26, marginHorizontal: 10, color:'#33333'}}>Categorias </Text>
            <View style={{left: 0}}><TouchableOpacity><Text style={styles.txtPress}>Exibir <AntDesign name="right" size={14} color="#32CD32" /></Text></TouchableOpacity></View>
        </View>

        <SafeAreaView style={{marginTop: 0}}>
        <FlatList 
        
        style={{maxHeight:width}}
        pagingEnabled
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item)=> String(item?.id)}
        renderItem={({item})=><OnBoardingItem item ={item}/>}

        data={data}

                    renderItem={
                        ({ item }) => (
                        <ScrollView> 
                    
                    {/* :) */}
                        <View style={{marginTop: 20}}>
                        <TouchableOpacity onPress={() => irDetalhes(item.id,item.descricao,item.preco,item.titulo,item.img,item.idUser)} style={{justifyContent:'center', alignItems:'center'}}>
                            <Image source={{uri:item.img}} style={styles.image02} />
                            <Text style={{justifyContent: 'center'}}>{item.titulo}</Text>
                        </TouchableOpacity>
                        </View>

                        </ScrollView>

                        
                        )}
            //
                            
            //

                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 50}}
                    ListEmptyComponent={() => (
                        <Text style={{textAlign: 'center', color: '#fff'}}>
                            Nenhum Dado Encontrado!
                        </Text>
                    )}
                />
                </SafeAreaView>
            {/*Fim da FlatList Categorias*/}
            
            
            {/*Ofertas Populares*/}
            <View style={{flexDirection: 'row'}}>
                <Text style={{padding: 10, fontSize: 26 }}>Ofertas Populares</Text>
            
                <Text style={{color:'#32CD32', fontSize: 12, top: 20, left: 46}}>Ver mais</Text>
                <View style={{top:20, left: 52}}><AntDesign name='right' size= {14} color = '#32CD32'/></View>
                
            </View>
            {/*Inicio da FlatList 'Ofertas Populares'*/}
            <SafeAreaView>
                <FlatList
                    style={{maxHeight:width}}
                    pagingEnabled
                    horizontal
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item)=> String(item?.id)}
                    renderItem={({item})=><OnBoardingItem item ={item}/>}

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
                                    <View style={{right: 380}}><AntDesign name="star" size={19} color="#FFC700"  /></View>
                                    <Text style={{right: 20, paddingRight: 0, color: 'gray'}}>0 Avaliações</Text>
                                    <Text style={{left: 104, color:'#333333', fontSize: 18}}>R$ {item.preco}</Text>
                                    </View>

                                    </View>
                                
                                </View>
                            </View>
                        )}
            //
                            
            //

                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
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
        data={data}
        
        renderItem={({item})=><OnBoardingItem item ={item}/>}

        

                    renderItem={
                        ({ item }) => (

                            
                            <View style={styles.header03}>
                                
                                <Image style={styles.img03}source={{uri: item.img,}} />
                        
                            <TouchableOpacity onPress={() => irDetalhes(item.id,item.descricao,item.preco,item.titulo,item.img,item.idUser)} style={{justifyContent:'center', alignItems:'center'}} style={styles.texto03 } >
                                <Text style={{fontSize: 18, color: 'black', paddingBottom: 10}}>{item.titulo}</Text>
                                <View style={{flex:1 , flexDirection: 'row', marginTop: 5, width: 140}}>
                                    <AntDesign name="star" size={19} color="#FFC700" />
                                    <Text style={{left: 5, paddingRight: 10, color: 'gray'}}>4.8</Text>
                                    <Text style={{color: 'gray'}}>75 mais votados</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={{marginBottom: 0,alignContent: 'center',color: '#333333', fontSize: 22}} >R$ {item.preco}</Text>
                                    <AntDesign name="tags" size={22} color="#32CD32" />
                                    
                                </View>
                            </TouchableOpacity>
                        
                    </View>
                    

                        
                        )}
            //
                            
            //

                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 50}}
                    ListEmptyComponent={() => (
                        <Text style={{textAlign: 'center', color: '#fff'}}>
                            Nenhum Dado Encontrado!
                        </Text>
                    )}
                />
                </ScrollView>

        </SafeAreaView>

        

        

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
<<<<<<< HEAD
        marginHorizontal: 5,
=======
        marginHorizontal:5,
>>>>>>> e1a81a2e1c787ccddeb88910b510b4b19d976c0d
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
    name: {
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
        backgroundColor: '#fff', 
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
        backgroundColor: '#fee'
        
    
      },
      title02:{
        
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        marginTop: 40
    },
    txtPress:{
      color: '#32CD32',
      top: 6.4,
      fontSize: 16,
      paddingHorizontal: 150
      
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