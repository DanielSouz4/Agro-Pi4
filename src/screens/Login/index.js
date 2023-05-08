import React, {useState,useEffect} from 'react';
import { Image, TextInput, View, Text, StyleSheet, TouchableOpacity,Animated,Keyboard } from 'react-native';
import {auth} from '../../components/config';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';

export default function Login({navigation}) {

    const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({x: 130, y:130}));


    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    async function Login(){
        await signInWithEmailAndPassword(auth,email,password)
        .then(
            ()=>navigation.navigate('Home')
        ).catch(error => alert('Login não efetuado!!'));
    };

    useEffect(()=> {
        KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        KeyboardDidHideListener = Keyboard.addListener('keyboardDidHide', KeyboardDidHide);
        Animated.parallel([
            Animated.spring(offset, {
                toValue: 0,
                speed: 4,
                bounciness: 10,
                
            }).start(),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
                
            }).start(),
        ])


    }, []);

    function keyboardDidShow(){
        
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue:55,
                duration:100,
                
            }),
            Animated.timing(logo.y, {
                toValue:55,
                duration:100,
                
            })
        ]).start();

    }

    function KeyboardDidHide(){
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue:130,
                duration:100,
            }),
            Animated.timing(logo.y, {
                toValue:130,
                duration:100
            })
        ]).start();

    }

 return (

    <View style={styles.view}>

        <View style={styles.containerImg}>

        <Animated.Image 
            source={require('../../images/agro.png')} 
            resizeMode='contain'
            style={{
                width:logo.x,
                height:logo.y,
            }}
        />

        </View>

        <Animated.View style={[
						styles.containerInput,
						{
							opacity: opacity,
							transform: [
								{
									translateY: offset.y,
								},
							],
						},
					]}
                    >

        <TextInput 
            value={email}
            onChangeText={setEmail}
            style={styles.input2}
            placeholder="Digite seu email..."
            placeholderTextColor="#32CD32"
        />
        
        <TextInput 
            value={password}
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={setPassword}
            style={styles.input2}
            placeholderTextColor="#32CD32"
            placeholder="Digite sua senha..."
           // placeholderTextColor="#FFF"
        />

        <TouchableOpacity
            onPress={Login}
            style={styles.button}
        >
            <Text style={styles.txtButton}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
            <Text style={{color:'black',fontSize:15,fontStyle:'italic'}} >Cadastre-se</Text>
        </TouchableOpacity>

        </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#dbead5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerImg:{
        flex:1,
        justifyContent:'center',
        
    },
    image: {
        width: 130,
        height: 110,
        
    },
    containerInput:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        width:'90%',
        padding:10,
        marginTop:50,
        
    },
    input: {
        width: '90%',
        height: 50,
        padding: 10,
        marginBottom: 15,
        fontSize:17,
        borderColor: '#0C600C',
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: '#000',
        color: '#FFFFFF',
        fontSize: 20,
        
    },
    input2: {
        width: '90%',
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
        fontSize: 20
    },
    button: {
        backgroundColor: '#32CD32',
		width: '90%',
		height: 45,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15,
		borderRadius: 7
        
    },
    txtButton: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    }

})