import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Lista from './Lista';
import Ficha from './Ficha';

import styles from '../../styles/pedidos/Main.json';

const Stack = createStackNavigator();

import { DrawerContent } from '../DrawerContent';

export default function Main(props) {
    const theme = useTheme();

    return (
        <Stack.Navigator  initialRouteName="Pedidos Realizados" screenOptions={theme.screenOptions} >
             <Stack.Screen name="Pedidos Realizados" component={Lista}/>
             <Stack.Screen name="Novo Pedido" component={Ficha}/>
        </Stack.Navigator>
    );
}
