import React, { useEffect } from "react";
import { useState } from "react";
import { View,Text,TouchableOpacity,Button,StyleSheet,Image, TextInput } from "react-native";
import{db,auth,storage} from '../../components/config';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


export default function App() {
    const [title,setTitle] = useState(null);
    const [picture,setPicture] = useState(null);
    const [image,setImage] = useState(null);
    const [link,setLink] = useState(null);

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
            //trtanfroma o arquivo de imagem em blop image
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
        <View style={styles.container}>
            <Text  style={{fontSize:22,color:'black'}}>Olá, seja bem vindo!</Text>
            <TextInput style={styles.input} placeholder="Titulo do arquivo selecionado"/>
            <TouchableOpacity style={{height:50,width:"80%",margin:20,backgroundColor:"green",justifyContent:'center',alignItems:'center'}}onPress={pickImage}><Text>Escolha uma foto </Text></TouchableOpacity>
            <Text>{link}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",

    },
    texto:{
        color:"black",


    },
    input: {
        height: 40,
        margin: 12,
        borderBottomWidth:1,
        borderBottomColor:'black',
        padding: 10,
      },
})