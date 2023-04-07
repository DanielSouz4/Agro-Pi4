import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Add from './src/screens/Mov';
import Detalhes from './src/screens/Detalhes';
import Compra from './src/screens/Compra';
import Notificacao from './src/screens/Notificacao';
import Imagens from './src/screens/Imagens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Add" component={Add} options={{headerShown: false}}/>
        <Stack.Screen name="Detalhes" component={Detalhes} options={{headerShown: false}}/>
        <Stack.Screen name= "Compra" component={Compra}/>
        <Stack.Screen name='notificacao' component={Notificacao} options={{headerShown: false}}/>
        <Stack.Screen name="Imagens" component={Imagens}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
