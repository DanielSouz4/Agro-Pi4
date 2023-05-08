import React, { useState,useEffect } from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
//import {auth} from '../../components/config';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import {collection,addDoc} from 'firebase/firestore';
import {db,auth,storage} from '../../components/config';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function Add() {

    const [ preco, setPreco ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [titulo, setTitulo] = useState('');
    const [tipo, setTipo] = useState('');
    const [completo, setCompleto] = useState("");

    const [title,setTitle] = useState(null);
    const [picture,setPicture] = useState(null);
    const [image,setImage] = useState(null);
    const [link,setLink] = useState(null);


     useEffect(()=>{
        if(link!=null){
        setCompleto("imagem adicionada!!")
        }
     },[link])

    function creator (){

        addDoc(collection(db, "anuncios"), {
            data:'',
            descricao: desc,
            enderreco:'',
            idUser: auth.currentUser.uid,
            img:link,
            preco: preco,
            tipoProduto:tipo,
            titulo:titulo
          }).then(()=>{
            alert("Valor adicionado")

          }).catch((error) => {
            alert("Erro "+error);
          })
        };

        const pickImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
        });
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.uri);
        }
      };
      useEffect(()=>{
        const uploadImage = async()=>{
            //trasforma o arquivo de imagem em blop image
            const blobImage = await new Promise ((resolve,reject)=>{
                const xhr = new XMLHttpRequest();
                xhr.onload=function(){
                    resolve(xhr.response);
                }
                xhr.onerror=function(){
                    reject(new TypeError("Network request failed"))
                };
                xhr.responseType = 'blob';
                xhr.open("GET",image,true);
                xhr.send(null);
            })
            //configura a metadata do arquivo
            /** @type {any} */
            const metadata = {
                contentType: 'image/jpeg',
            };
            //envia o arquivo pro storage
            const storageRef = ref(storage, 'img/'+Date.now());

            const uploadTask = uploadBytesResumable(storageRef, blobImage);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setLink(downloadURL);
                    });
                }
            );
        }
        if(image!=null){
            uploadImage();
            setImage(null);
        }

      },[image])


 return (
    <View style={{alignContent:'center',alignItems:'center', marginTop:10}}>
        <View style={{marginTop:20}}>
        <AntDesign name="isv" size={80} color="green" />
        </View>
        <Text style={styles.header}>Cadastro de Produto</Text>

        <TextInput 
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input3}
            placeholder="Titulo..."
            placeholderTextColor="gray"
        />
        <TextInput 
            value={desc}
            onChangeText={setDesc}
            style={styles.input3}
            placeholder="Descrição do produto..."
            placeholderTextColor="gray"
        />

        <TextInput 
            value={preco}
            onChangeText={setPreco}
            style={styles.input3}
            placeholder="Valor.."
            placeholderTextColor="gray"
        />
        <Text style={styles.txtButton2}>Selecione o tipo do produto</Text>

        <View style={{flexDirection:'row'}}>
             <Button
                 onPress={()=>setTipo("Futa")}
                 title="Frutas"
                 color="#841584"
                 accessibilityLabel="seu produto é um tipo de fruta"
             />
             <Button
                 onPress={()=>setTipo("Verdura")}
                 title="Verdura"
                 color="gray"
                 accessibilityLabel="Marque esta opção se seu produto for un tipo de verdura"
             />
             <Button
                 onPress={()=>setTipo("Legume")}
                 title="Legume"
                 color="black"
                 accessibilityLabel="Marque esta opção se seu produto for um tipo de legume"
             />
             <Button
                 onPress={()=>setTipo("Grão")}
                 title=" Grão "
                 color="green"
                 accessibilityLabel="Marque esta opção se seu produto for um tipo de grão"
             />
        </View>

        <View>
            <Text style={styles.txtButton2}>Tipo selecionado: {tipo}</Text>
        </View>
        
        
        <View style={{justifyContent:'center',alignItems:'center',paddingTop:5}}>
            <Text  style={styles.txtButton2}>Escolha a imagem do seu produto!</Text>
            {
            //"<TextInput style={styles.input} placeholder="Titulo do arquivo selecionado"/>"
            }
            <TouchableOpacity style={styles.button2}onPress={pickImage}><Text style={{fontWeight:"bold"}}>   Carregar Imagem  </Text></TouchableOpacity>
            <Text style={{color:'green', fontWeight:'bold'}}>{completo}</Text>
        </View>

   
        
        <TouchableOpacity onPress={()=>creator()}
            style={styles.button}
        >
            <Text style={styles.txtButton}>Adicionar</Text>
        </TouchableOpacity>
        

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        backgroundColor: '#fff',
        width: '100%',
        height:'100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 120,
        height: 120,
        marginBottom: 5,
        marginTop:15
    },
    header: {
        fontSize: 34,
        color: 'black',
        fontWeight: 'bold',
        marginBottom:10,
    },
    input2: {
        width: '90%',
        height: 50,
        
        padding: 15,
        marginVertical: 10,
        
        borderColor: '#111',
        borderWidth: 1,
        borderRadius: 10,
        
        backgroundColor: '#222',
        color: '#FFF',
        fontSize: 20
    },
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth:1,
        borderBottomColor:'black',
        padding: 10,
      },
      input3: {
        width: '80%',
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 2,
        marginBottom: 36,
        fontSize: 20
    },
    button: {
        backgroundColor: '#82C043',
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 10
    },
    button2: {
        backgroundColor: '#82C043',
        width: '50%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 10,
        fontWeight:'bold'
    },
     button: {
        backgroundColor: '#32CD32',
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10
    },
    txtButton2: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tipo:{
        alignItems:'start',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,

    }
});
