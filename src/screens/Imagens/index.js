// import React, { useState,useEffect } from "react";
// import { View,TouchableOpacity,Text,Button,StyleSheet,ScrollView,SafeAreaView,FlatList,Dimensions } from "react-native";
// //import {collection,addDoc,getDocs,getFirestore,query,where,onSnapshot} from 'firebase/firestore';
// import {collection,addDoc,getDocs,getFirestore,query,where,onSnapshot} from 'firebase/firestore';

// import db from '../../components/config';
// import { useNavigation } from "@react-navigation/native";

// // ============  notificação ===========
// const requestUserPermission = async()=> {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//     }
// };
// useEffect(()=>{
//     if (requestUserPermission()){
//         //retun token do dipositivo
//         messaging().getToken().then(token=>{
//             console.log(token)
//         });
//     }
//     else{
//         console.log("Falha ao conseguir Token",authStatus)
//     }
//     // Assume a message-notification contains a "type" property in the data payload of the screen to open

//     messaging().onNotificationOpenedApp(async (remoteMessage) => {
//         console.log(
//           'Notification caused app to open from background state:',
//           remoteMessage.notification,
//         );
//         navigation.navigate(remoteMessage.data.type);
//       });
//     // Register background handler
//     messaging().setBackgroundMessageHandler(async remoteMessage => {
//         console.log('Message handled in the background!', remoteMessage);
//     });
//   //parei no tempo 05:35
//   const unsubscribe = messaging().onMessage(async remoteMessage => {
//     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//   });

//   return unsubscribe;

// },[]);
// //======== fim - notificação===========//




// export default function Filter ({route}){
//     const {width}=Dimensions.get('window');
//     const [data,setData] = useState([]);
//     const [tipo, setTipo]= useState('');
//     //const tipo = route.params.tipo
//     setTipo("Fruta");
//     useEffect(() => {
//         getDocs(collection(db, 'anuncios'),where("tipoProduto", "==", tipo)).then(
//             (docSnap) => {
//                 const users = [];
//                 docSnap.forEach((doc) => {
//                     users.push({
//                         ...doc.data(),
//                         id: doc.id
//                     })
//                 })
//                 setData(users);
//             });
//     },);
//     return(
//         <View>
//           <FlatList
//               data={data}
//               renderItem={
//                   ({ item }) => (
//                       <View style={{paddingBottom: 10, paddingLeft: 5, paddingTop: 10}}>
                          

//                           <View style={{ flexDirection: 'column', backgroundColor: '#ffff',elevation: 20 }}>
//                               <Text style={styles.titulo}>{item.titulo}</Text>
//                               <Image source={{uri:item.link}} style={styles.image} />
//                               <Text style={{ padding: 2, color: '333333', fontWeight: 'bold', fontSize: 16, paddingLeft: 10}}>Nome:  {item.titulo}</Text>

//                               <Text style={{ color: '#333333', fontWeight: 'bold', fontSize: 16, paddingLeft: 10 }}>endereço:  {item.enderreco}</Text>
//                               <Text style={{color:'#333333', fontWeight: 'bold', fontSize: 16, paddingLeft: 10}}>Mensagem(Opcional): {item.descricao}</Text>
                            
//                               <View style={styles.itemButtons}>
//                               <TouchableOpacity
//                                   //onPress={() => irDetalhes(item.id, item.descricao, item.preco, item.titulo, item.img, item.idUser)}
//                               >
//                                   <AntDesign name="eye" size={26} color="#32CD42" />
//                               </TouchableOpacity>
//                           </View>
//                           </View>

                          
//                       </View>
//                   )}
//               keyExtractor={item => item.id}
//               showsVerticalScrollIndicator={false}
//               contentContainerStyle={{ paddingBottom: 50 }}
//               ListEmptyComponent={() => (
//                   <Text style={{ textAlign: 'center', color: 'black', fontSize: 22, marginTop: 20 }}>
//                       Nenhum Dado Encontrado!
//                   </Text>
//               )}
//           />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     marginTop:30,
    
//   },

//   image: {
//     width: 140,
//         height: 140,
//         marginLeft: 8,
//         borderRadius: 10,
//         backgroundColor: '#fee',
        
//   },
//   input: {
//     width: '90%',
//     height: 50,
    
//     padding: 15,
//     marginVertical: 10,
    
//     borderColor: '#111',
//     borderWidth: 1,
//     borderRadius: 10,
    
//     backgroundColor: '#222',
//     color: '#FFF',
//     fontSize: 20,
  
// },
//     titulo: {
//         fontSize: 18, 
//         fontWeight: 'bold', 
//         color:'#333333', 
//         paddingLeft: 20
//     },
//     itemButtons: {
//         paddingLeft: 10,

//     }
// })
