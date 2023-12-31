import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from 'react-native-paper';

import styles from '../../styles/estoques/Main.json';

import Lista from './Lista';
import Ficha from './Ficha';

const Stack = createStackNavigator();

export default function Main(props) {
    const theme = useTheme();
    const screenOptions = {
        ...theme.screenOptions,
        headerShown: false
      };
    return (
        <Stack.Navigator  initialRouteName="Estoques" screenOptions={screenOptions} >
             <Stack.Screen name="Estoques" component={Lista}/>
             <Stack.Screen name="Adicionar Estoque" component={Ficha}/>
        </Stack.Navigator>
    );
}
