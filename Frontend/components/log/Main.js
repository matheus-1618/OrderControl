import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from 'react-native-paper';

import styles from '../../styles/log/Main.json';

import Log from './Log';

const Stack = createStackNavigator();

export default function Main(props) {
    const theme = useTheme();

    return (
        <Stack.Navigator initialRouteName="Tabela" screenOptions={theme.screenOptions}>
            <Stack.Screen name="Tabela" component={Log} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}
