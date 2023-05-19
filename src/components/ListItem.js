import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

const Listdata = (data ) => {
 const {width}=Dimensions.get('window');
  return (
      <View style={styles.header03}>

          <Image style={styles.img03} source={{ uri: data.img, }} />

          <TouchableOpacity onPress={() => irDetalhes(data.id, data.descricao, data.preco, data.titulo, data.img, data.idUser)} style={{ justifyContent: 'center', aligndatas: 'center' }} style={styles.texto03} >
              <Text style={{ fontSize: 18, color: 'black', paddingBottom: 10 }}>{data.titulo}</Text>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, width: 140 }}>
                  <AntDesign titulo="star" size={19} color="#FFC700" />
                  <Text style={{ left: 5, paddingRight: 10, color: 'gray' }}>4.8</Text>
                  <Text style={{ color: 'gray' }}>75 mais votados</Text>
              </View>
              <View style={{}}>
                  <Text style={{ marginBottom: 0, alignContent: 'center', color: '#333333', fontSize: 22 }} >R$ {data.preco}</Text>
                  <AntDesign titulo="tags" size={22} color="#32CD32" />

              </View>
          </TouchableOpacity>

      </View>
  );
};

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
        aligndatas: 'center',
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
    data: {
        height: 150,
        backgroundColor: '#FFF',
        elevation: 1,
        marginVertical: 5,
        marginHorizontal: 5,
        marginHorizontal:5,
        borderRadius: 10,
        padding: 30,
        flexDirection: 'row',
        aligndatas: 'center',
        
    },
    data: {
        flex: 1,
        
    },
    dataButtons: {
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
        aligndatas: 'center',
        
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
        aligndatas: 'center'
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
        aligndatas: 'center',
        justifyContent: 'center',
        width: '98%',
        marginVertical: 0
    },//Barra de pesquisa
    headerNavBar:{
        flex: 1,
        paddingHorizontal: 0,
        flexDirection: 'row',
        aligndatas: 'center',
        justifyContent: 'center',
        width: '98%',
        marginVertical: 0,
        padding: 30
        
    },
    navBar:{
        
        paddingHorizontal: 15,
        flexDirection: 'row',
        aligndatas: 'center',
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
        aligndatas: 'center'

    },//Fim estilos da barra de pesquisa
    //Categorias
    container02: {
        flex: 1,
        paddingTop:10,
        flexDirection:'column',
        backgroundColor: '#fff',
        aligndatas: 'center',
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
export default Listdata;
