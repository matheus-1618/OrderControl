import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

import ListaMaterial from './Lista/Material';
import ListaFerramenta from './Lista/Ferramenta';
import FichaMaterial from './Ficha/Main';
import FichaFerramenta from './Ficha/Main';

import styles from '../../styles/pedidos/Main.json';

const Stack = createStackNavigator();


export default function Main(props) {
    const theme = useTheme();

    return (
        <Stack.Navigator  initialRouteName="Materiais Pedidos" screenOptions={theme.screenOptions} >
             <Stack.Screen name="Materiais Pedidos" component={ListaMaterial}/>
             <Stack.Screen name="Ferramentas Pedidas" component={ListaFerramenta}/>
             <Stack.Screen name="Novo Material" component={FichaMaterial}/>
             <Stack.Screen name="Nova Ferramenta" component={FichaFerramenta}/>
        </Stack.Navigator>
    );
}
