import {Text,View,Image,TouchableOpacity,StyleSheet} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Add from './src/screens/Mov';
import Detalhes from './src/screens/Detalhes';
import Compra from './src/screens/Compra';
import { Favoritos } from './src/screens/favoritos';

import Notificacao from './src/screens/Notificacao'
import { ScreenStackHeaderSearchBarView } from 'react-native-screens';

import Imagens from './src/screens/Imagens'


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
      width:70,
      height:70,
      borderRadius:35,
      backgroundColor:'#32CD32',
     
    }} 
    > 
      {children}
    </View>

  </TouchableOpacity>
);


function Tabs(){

  return (
  <Tab.Navigator
  
      tabBarOptions={{
        showLabel: false,
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
            width:25,
            height:25,
            tintColor: focused ? '#e32f45' : '#748c94',
            }}
          />
          <Text
            style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}
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
            width:25,
            height:25,
            tintColor: focused ? '#e32f45' : '#748c94',
            }}
          />
          <Text
            style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}
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
              with:30,
              height:30,
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
            width:25,
            height:25,
            tintColor: focused ? '#e32f45' : '#748c94',
            }}
          />
          <Text
            style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}
          >AJUSTES</Text>
        </View>

      )
    }
  }/>
    <Tab.Screen name="Chat" component={Register} options={{
      tabBarIcon: ({focused}) => (
        <View style={{alignItems:'center',justifyContent:'center', top:2}}>
          
          <Image 
            source={require('./src/images/icons/chat.png')}
            resizeMode='contain'
            style={{
            width:25,
            height:25,
            tintColor: focused ? '#e32f45' : '#748c94',
            }}
          />
          <Text
            style={{color: focused ? '#e32f45' : '#748c94',fontSize:12}}
          >CHAT</Text>
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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Tabs} options={{headerShown: false}}  />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Add" component={Add}/>
        <Stack.Screen name="Detalhes" component={Detalhes}/>
        <Stack.Screen name= "Compra" component={Compra}/>
        <Stack.Screen name='notificacao' component={Notificacao}/>
        <Stack.Screen name="Imagens" component={Imagens}/>
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