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
        <Drawer.Navigator initialRouteName="Pedidos Realizados" screenOptions={theme.screenOptions}>
             <Drawer.Screen name="Pedidos Realizados" component={Lista} options={{ drawerBarIcon: ({ color }) => <Icon name="format-list-checkbox" color={color} /> }} />
             <Drawer.Screen name="Novo Pedido" component={Ficha}  options={{ drawerBarIcon: ({ color }) => <Icon name="new-box" color={color}  /> }} />
        </Drawer.Navigator>
    );
}
