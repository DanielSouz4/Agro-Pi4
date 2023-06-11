import React, {useEffect,useState}from "react";
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity, Button,Dimensions,FlatList } from 'react-native';
import {auth} from '../../components/config';
import {collection,addDoc,getDocs,getFirestore,query,where,onSnapshot} from 'firebase/firestore';
import {db} from '../../components/config'

export default function Note (){
  const userId=auth.currentUser.uid;
  const [ data, setData ] = useState([]);
  const filtroChat = (item)=> item.idVendedor == userId;

//   const [ data, setData ] = useState([]);
useEffect(() => {
    getDocs(collection(db, 'chat')).then(
        (docSnap) => {
            const users = [];
            docSnap.forEach((doc) => {
                users.push({ 
                    ...doc.data(), 
                    id: doc.id
                })
            })
            setData(users.filter(filtroChat));
            //setList(data)
        });
},[]);
    

    // useEffect(() =>{
    //     const getData = ()=> {
    //         const db = getFirestore();
    //         const colRef = collection(db,'chat')
    //         var dados = [];
    //         const q = query(colRef, where('idVendedor','==',userId))

    //         onSnapshot(q,(snapshot) =>{
    //             // var dados = [];
    //             snapshot.docs.map((doc)=>{
    //                 dados.push({...doc.data(), id:doc.id})
    //             })
                
    //         });
    //             setData(dados);
    //     }
    //     getData()

    // },[])

//   useEffect(() => {
//     getDocs(collection(db, 'chat')).then(
//         (docSnap) => {
//             const users = [];
//             // console.warn(docSnap);
//             docSnap.forEach((doc) => {
                
//                 getDocs(collection(db, 'chat', doc.id)).then(
//                     (docSnap2) => {
//                         docSnap2.forEach((doc2) => {
//                             console.warn(userId + '   '+doc2.idVendedor)            
//                         }
//                     )}
//                 )
//             //     if (userId==doc.idVendedor){
//             //         users.push({ 
//             //             ...doc.data(), 
//             //             id: doc.id
//             //         })
//             //     }
//             })
//             // },[data])
//             // setData(users);
//         });
// });
  
  return (
      <View style={styles.container}>
          <FlatList
              data={data}
              renderItem={
                  ({ item }) => (
                      <View style={{ paddingBottom: 10, paddingLeft: 5, paddingTop: 10 }}>


                          <View style={{ flexDirection: 'row', backgroundColor: '#ffff', elevation: 20 }}>


                              <Image source={{ uri: item.link }} style={styles.image} />
                              <View>
                                  <Text style={styles.titulo}>{item.titulo}</Text>

                                  <Text style={{ padding: 2, color: '333333', fontWeight: 'bold', fontSize: 16, paddingLeft: 10 }}>Nome:  {item.nomeComprador}</Text>

                                  <Text style={{ color: '#333333', fontWeight: 'bold', fontSize: 16, paddingLeft: 10 }}>endereço:  {item.enderreco}</Text>
                                  <Text style={{ color: '#333333', fontWeight: 'bold', fontSize: 16, paddingLeft: 10 }}>Mensagem: {item.mensagem}</Text>

                                  <View style={styles.itemButtons}>
                                      <TouchableOpacity
                                      //onPress={() => irDetalhes(item.id, item.descricao, item.preco, item.titulo, item.img, item.idUser)}
                                      >
                                          <AntDesign name="eye" size={26} color="#32CD42" />
                                      </TouchableOpacity>

                                  </View>
                              </View>
                          </View>


                      </View>
                  )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
              ListEmptyComponent={() => (
                  <Text style={{ textAlign: 'center', color: 'black', fontSize: 22, marginTop: 20 }}>
                      Nenhum Dado Encontrado!
                  </Text>
              )}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:40,
    
  },

  image: {
    width: 140,
        height: 140,
        marginLeft: 8,
        borderRadius: 10,
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
    titulo: {
        fontSize: 18, 
        fontWeight: 'bold', 
        color:'#333333', 
        paddingLeft: 10
    },
    itemButtons: {
        paddingLeft: 10,

    }
})
