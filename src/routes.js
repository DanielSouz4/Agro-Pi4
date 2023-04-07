import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Add from './src/screens/Mov';
import Detalhes from './src/screens/Detalhes';
import Compra from './src/screens/Compra';
import Notificacao from './src/screens/Notificacao'


const Stack = createNativeStackNavigator();


export default function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
    <Stack.Screen name="Add" component={Add}/>
    <Stack.Screen name="Detalhes" component={Detalhes}/>
    <Stack.Screen name= "Compra" component={Compra}/>
    <Stack.Screen name='notificacao' component={Notificacao}/>
  </Stack.Navigator>
    
    
  );
}

     
      
    
    

