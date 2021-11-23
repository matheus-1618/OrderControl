import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { useTheme,IconButton,Colors } from 'react-native-paper';

import Pedidos from './pedidos/Main'

import styles from '../styles/Main.json';

import ListaMaterial from './pedidos/Lista/Material';
import ListaFerramenta from './pedidos/Lista/Ferramenta';
import FichaPedido from './pedidos/Ficha/Main';
import ListaEstoque from './estoques/Lista';
import FichaEstoque from './estoques/Ficha';

import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function Main(props) {
  const theme = useTheme();

    return (
         <Drawer.Navigator drawerContent={props => <DrawerContent {...props} /> } initialRouteName="Materiais" screenOptions={theme.screenOptions}>  
             <Drawer.Screen name="Materiais" component={ListaMaterial}/>
             <Drawer.Screen name="Ferramentas" component={ListaFerramenta}/>
             <Drawer.Screen name="Novo Pedido" component={FichaPedido}/>
             <Drawer.Screen name="Estoques" component={ListaEstoque}/>
             <Drawer.Screen name="Adicionar Estoque" component={FichaEstoque}/>
        </Drawer.Navigator>
    );
}