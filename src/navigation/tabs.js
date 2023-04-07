import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Add from './src/screens/Mov';
import Detalhes from './src/screens/Detalhes';
import Compra from './src/screens/Compra';
import Notificacao from './src/screens/Notificacao';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Find" component={Detalhes} />
        <Tab.Screen name="Post" component={Compra} />
        <Tab.Screen name="Settings" component={Add} />
        <Tab.Screen name="Chat" component={Register} />
      </Tab.Navigator>
    );
  }