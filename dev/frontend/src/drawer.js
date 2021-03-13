import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from './pages/home';
import NewHero from './pages/new_hero';
import ListEditHero from './pages/edit_delete_hero';
import ListThreats from './pages/list_threats';


const Drawer = createDrawerNavigator();


export default function AppDrawerNavigator () {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Cadastro" component={NewHero} />
        <Drawer.Screen name="Exibir e editar Heróis" component={ListEditHero} />
        <Drawer.Screen name="Exibir Ameaças" component={ListThreats} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}   