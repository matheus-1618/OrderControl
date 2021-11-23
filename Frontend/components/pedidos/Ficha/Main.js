import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useTheme } from 'react-native-paper';

import styles from '../../../styles/pedidos/Ficha/Main.json';

import Material from './Material';
import Ferramenta from './Ferramenta';

const Tab = createMaterialTopTabNavigator();

export default function Main(props) {
    const theme = useTheme();

    return (
        <Tab.Navigator initialRouteName="Material" screenOptions={theme.screenOptions}>
             <Tab.Screen name="Material" component={Material}/>
             <Tab.Screen name="Ferramenta" component={Ferramenta}/>
        </Tab.Navigator>
    );
}