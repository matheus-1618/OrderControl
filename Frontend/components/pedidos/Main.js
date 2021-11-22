import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Lista from './Lista';
import Ficha from './Ficha';

import styles from '../../styles/pedidos/Main.json';

const Drawer = createDrawerNavigator();

import { DrawerContent } from '../DrawerContent';

export default function Main(props) {
    const theme = useTheme();

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} /> } initialRouteName="Pedidos Realizados" screenOptions={theme.screenOptions} >
             <Drawer.Screen name="Pedidos Realizados" component={Lista}/>
             <Drawer.Screen name="Novo Pedido" component={Ficha}/>
        </Drawer.Navigator>
    );
}
