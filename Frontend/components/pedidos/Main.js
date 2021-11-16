import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTheme } from 'react-native-paper';

import Lista from './Lista';
import Ficha from './Ficha';

import styles from '../../styles/pedidos/Main.json';

const Drawer = createDrawerNavigator();

export default function Main(props) {
    const theme = useTheme();

    return (
        <Drawer.Navigator initialRouteName="Pedidos" screenOptions={theme.screenOptions}>
             <Drawer.Screen name="Pedidos" component={Ficha} options={{ headerShown: true }} />
             <Drawer.Screen name="Lista" component={Lista} options={{ headerShown: true }} />
        </Drawer.Navigator>
    );
}
