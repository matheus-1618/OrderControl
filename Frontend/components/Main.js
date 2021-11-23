import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTheme,IconButton,Colors } from 'react-native-paper';

import Pedidos from './pedidos/Main'

import styles from '../styles/Main.json';

import ListaPedido from './pedidos/Lista';
import FichaPedido from './pedidos/Ficha/Main';
import ListaEstoque from './estoques/Lista';
import FichaEstoque from './estoques/Ficha';

import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function Main(props) {
  const theme = useTheme();

    return (
         <Drawer.Navigator drawerContent={props => <DrawerContent {...props} /> } initialRouteName="Pedidos" screenOptions={theme.screenOptions}>  
             <Drawer.Screen name="Pedidos" component={ListaPedido}/>
             <Drawer.Screen name="Novo Pedido" component={FichaPedido}/>
             <Drawer.Screen name="Estoques" component={ListaEstoque}/>
             <Drawer.Screen name="Adicionar Estoque" component={FichaEstoque}/>
        </Drawer.Navigator>
    );
}