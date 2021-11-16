import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTheme } from 'react-native-paper';

import Pedidos from './pedidos/Main'

import styles from '../styles/Main.json';

const Drawer = createDrawerNavigator();

export default function Main(props) {
  const theme = useTheme();

    return (
         <Drawer.Navigator initialRouteName="Pedidos" screenOptions={theme.screenOptions}>
             <Drawer.Screen name="Pedidos" component={Pedidos} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}