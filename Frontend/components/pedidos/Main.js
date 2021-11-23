import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ListaMaterial from './Lista/Material';
import ListaFerramenta from './Lista/Ferramenta';
import Ficha from './Ficha/Main';

import styles from '../../styles/pedidos/Main.json';

const Stack = createStackNavigator();

import { DrawerContent } from '../DrawerContent';

export default function Main(props) {
    const theme = useTheme();

    return (
        <Stack.Navigator  initialRouteName="Materiais Pedidos" screenOptions={theme.screenOptions} >
             <Stack.Screen name="Materiais Pedidos" component={ListaMaterial}/>
             <Stack.Screen name="Ferramentas Pedidas" component={ListaMaterial}/>
             <Stack.Screen name="Novo Pedido" component={Ficha}/>
        </Stack.Navigator>
    );
}
