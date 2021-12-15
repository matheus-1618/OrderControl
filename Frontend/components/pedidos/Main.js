import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { useTheme } from 'react-native-paper';

import { Icon } from '../../lib';

import styles from '../../styles/pedidos/Main.json';

import Material from './Material/Main';
import Ferramenta from './Ferramenta/Main';

const Tab = createMaterialTopTabNavigator();

export default function Main(props) {
    const theme = useTheme();

    return (
        <Tab.Navigator initialRouteName="Material" screenOptions={theme.screenOptions}>
             <Tab.Screen name="Material" component={Material} options={{ tabBarIcon: ({ color,size }) => <Icon name="wall" size={size} color="#2385A2" /> }}/>
             <Tab.Screen name="Ferramenta" component={Ferramenta} options={{ tabBarIcon: ({ color,size }) => <Icon name="hammer" size={size} color="#2385A2" /> }}/>
        </Tab.Navigator>
    );
}

