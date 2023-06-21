import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {auth} from '../../components/config';
import { signOut } from 'firebase/auth';

import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../components/config';




const CustomModal = ({visible, closeModal}) => {
    
    
    const navigation = useNavigation(); // Obtém a instância de navegação usando o hook useNavigation()

    function goNotification() {
        navigation.navigate('notificacao'); // Navega para a tela 'notificacao'
      }

      async function LogOff(){
        signOut(auth)
        .then(
            navigation.navigate('Login')
            
        ).catch(error => alert(error+'Log Out não efetuado!!'));
    };
    
    const filtroUser = (item) => item.IdUSer == id;
    const [user, setUser] = useState([]);
    const [nomes, setNomes] = useState(user.toString());
    const id = auth.currentUser.uid;
    
    async function defNome(){
        await setNomes(user[0]['nome'])
      };

    function goPerfil(){
        navigation.navigate('Perfil',user)
    }
    
    useEffect(() => {
        function dados() {
        getDocs(collection(db, 'usuarios')).then(
            (docSnap) => {
              const users = [];
              docSnap.forEach((doc) => {
                users.push({
                  ...doc.data(),
                  id: doc.id
                })
              })
              setUser(users.filter(filtroUser));
              defNome();
            });
        }
        dados()
        console.log(user)
      }, []);
      useEffect(()=>{
        defNome();
      })


        

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', bottom: '20%'}}>

                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Olá, {nomes}</Text>

                        <TouchableOpacity onPress={goNotification}>
                        <Ionicons name="notifications-outline" size={26} color="black" />
                        </TouchableOpacity>


                    </View>
                    
                    <View style={{ flexDirection: 'column', justifyContent: 'center', paddingTop: 10 }}>

                        <TouchableOpacity onPress={goPerfil}
                            style={{
                                flexDirection: 'row',
                                paddingVertical: 10,
                                backgroundColor: '#fff',
                                height: 40, width: '100%', justifyContent: 'flex-start', elevation: 8, borderRadius: 10, marginBottom: 10, paddingLeft: 10
                            }}>
                            <AntDesign name="user" size={22} color="black" />
                            <Text style={{paddingLeft: 10}}>Meu Perfil</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                paddingVertical: 10,
                                paddingHorizontal:80,
                                backgroundColor: '#fff',
                                height: 40, width: '100%', justifyContent: 'flex-start', elevation: 8, borderRadius: 10, marginBottom: 10, paddingLeft: 10
                            }}>
                                <AntDesign name="hearto" size={22} color="black" />
                            <Text style={{paddingLeft: 10}}>Favoritos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Sobre')}
                            style={{
                                flexDirection: 'row',
                                paddingVertical: 10,
                                backgroundColor: '#fff',
                                height: 40, width: '100%', justifyContent:  'flex-start', elevation: 8, borderRadius: 10, marginBottom: 10, paddingLeft: 10
                            }}>
                            <AntDesign name="profile" size={20} color="black" />         
                            <Text style={{paddingLeft: 10}}>Sobre</Text>
                        </TouchableOpacity>

                        

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', top: '20%' }}>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>

                            <Ionicons name="return-down-back-outline" size={18} color="green" />
                            <Text style={{fontSize: 11}}>Voltar</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={LogOff} style={styles.closeButton}>

                            <AntDesign name="logout" size={18} color="green" />
                            <Text style={{fontSize: 11}}>LogOut</Text>

                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = {
    modalContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        // justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        
    },
    modalContent: {
        backgroundColor: '#fff',
        paddingHorizontal: '10%',
        paddingVertical: '20%',
        borderRadius: 6,

    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 26,
        padding: 12,
        alignItems: 'center',
        width: 70,
        elevation: 8
    },
    closeButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
};

export default CustomModal;
