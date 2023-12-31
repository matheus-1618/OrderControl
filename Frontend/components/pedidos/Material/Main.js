import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from 'react-native-paper';

import styles from '../../../styles/pedidos/Material/Main.json';

import Ficha from './Ficha'
import Lista from './Lista'

const Stack = createStackNavigator();

export default function Main(props) {
    const theme = useTheme();

    return (
        <Stack.Navigator initialRouteName="Lista" screenOptions={theme.screenOptions}>
            <Stack.Screen name="Lista" component={Lista} options={{headerShown: false}}/>
            <Stack.Screen name="Ficha" component={Ficha}/>
        </Stack.Navigator>
    );
}
