import {Text,View,Image,TouchableOpacity,StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Add from './src/screens/Mov';
import Favoritos from './src/screens/Favoritos';

import Detalhes from './src/screens/Detalhes';
import Compra from './src/screens/Compra';

//import Notificacao from './src/screens/Notificacao';
import Imagens from './src/screens/Imagens';
import Filter from './src/screens/Filter';

import Notificacao from './src/screens/Notificacao'
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent:'center',
      alignItems:'center',
      ...styles.sombra
    }}
    onPress={onPress}
  >
    <View style={{
      width:50,
      height:50,
      borderRadius:25,
      backgroundColor:'#005C53',
     
    }} 
    > 
      {children}
    </View>

  </TouchableOpacity>
);


function Tabs(){

  return (
  <Tab.Navigator
  
      screenOptions={{
        showLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard:true,
        tabBarShowLabel:false,
        style: {
          position: 'absolute',
          bottom:25,
          left:20,
          elevation:0,
          backgroundColor: 'red',
          borderRadius: 15,
          height:90,
          ... styles.sombra
        }

    }}
    >

    <Tab.Screen name="Home" component={Home} options={{
      headerShown: false,
      tabBarIcon: ({focused}) => (
        <View style={{alignItems:'center',justifyContent:'center', top:2}}>
          
          <Image 
            source={require('./src/images/icons/home.png')}
            resizeMode='contain'
            style={{
            width:12,
            height:12,
            tintColor: focused ? '#005C53' : '#748c94',
            }}
          />
          <Text
            style={{color: focused ? '#005C53' : '#748c94',fontSize:9}}
          >HOME</Text>
        </View>

      )
    }
  }
  />
    <Tab.Screen name="Favoritos" component={Favoritos} options={{
      
      tabBarIcon: ({focused}) => (
        <View style={{alignItems:'center',justifyContent:'center', top:2}}>
          
          <Image 
            source={require('./src/images/icons/heart.png')}
            resizeMode='contain'
            style={{
            width:15,
            height:15,
            tintColor: focused ? '#005C53' : '#748c94',
            }}
          />
          <Text
            style={{color: focused ? '#005C53' : '#748c94',fontSize:9}}
          >FAVORITOS</Text>
        </View>

      )
    }
  }
    /> 
    <Tab.Screen name="Post" component={Add} 
      options={{
        tabBarIcon: ({focused}) => (
        
          <Image 
            source={require('./src/images/icons/plus.png')}
            resizeMode="contain"
            style={{
              with:15,
              height:15,
              tintColor:focused ? '#ffff' : '#f2f2f2',
            }}
          
          />
        
        ),
        tabBarButton: (props) => (
          <CustomTabBarButton   { ... props} />
        )
      }}
    
    />
    
    <Tab.Screen name="Settings" component={Add} options={{
      tabBarIcon: ({focused}) => (
        <View style={{alignItems:'center',justifyContent:'center', top:2}}>
          
          <Image 
            source={require('./src/images/icons/setting.png')}
            resizeMode='contain'
            style={{
            width:15,
            height:15,
            tintColor: focused ? '#005C53' : '#748c94',
            }}
          />
          <Text
            style={{color: focused ? '#005C53' : '#748c94',fontSize:9}}
          >AJUSTES</Text>
        </View>

      )
    }
  }/>
    <Tab.Screen name="Chat" component={Notificacao} options={{
      tabBarIcon: ({focused}) => (
        <View style={{alignItems:'center',justifyContent:'center', top:2}}>
          
          <Image 
            source={require('./src/images/icons/chat.png')}
            resizeMode='contain'
            style={{
            width:15,
            height:15,
            tintColor: focused ? '#005C53' : '#748c94',
            }}
          />
          <Text
            style={{color: focused ? '#005C53' : '#748c94',fontSize:9}}
          >NOTIFICAÇÂO</Text>
        </View>

      )
    }
  }/>

  </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Tabs} options={{headerShown: false}}  />
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Add" component={Add} options={{headerShown: false}}/>
        <Stack.Screen name="Detalhes" component={Detalhes} />
        <Stack.Screen name= "Compra" component={Compra}/>
        <Stack.Screen name='notificacao' component={Notificacao} options={{headerShown: false}}/>
        {/* <Stack.Screen name="Imagens" component={Imagens}/> */}
        <Stack.Screen name="Filter" component={Filter}/>
      </Stack.Navigator>
      
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sombra :{
    shadowColor: '#7f55d3',
    shadowOffset :{
      with:0 ,
      height:10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5

  }

});