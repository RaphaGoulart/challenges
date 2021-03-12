import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './pages/login';
import NewUser from './pages/new_user';
import Home from './pages/home';
import NewHero from './pages/new_hero';
import ListEditHero from './pages/edit_delete_hero';
import ListThreats from './pages/list_threats';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AppDrawerNavigator () {

  return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Cadastro" component={NewHero} />
        <Drawer.Screen name="Exibir e editar Heróis" component={ListEditHero} />
        <Drawer.Screen name="Exibir Ameaças" component={ListThreats} />
      </Drawer.Navigator>
  );
}   

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  
        initialRouteName="Login" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NewUser" component={NewUser} />
        <Stack.Screen name="Drawer" component={AppDrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}