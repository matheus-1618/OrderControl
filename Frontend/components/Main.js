import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { View } from 'react-native';

import { useTheme,IconButton,Avatar,Title } from 'react-native-paper';

import Pedidos from './pedidos/Main'

import styles from '../styles/Main.json';

console.reportErrorsAsExceptions = false;

import ListaMaterial from './pedidos/Lista/Material';
import ListaFerramenta from './pedidos/Lista/Ferramenta';
import FichaPedido from './pedidos/Ficha/Main';
import ListaEstoque from './estoques/Lista';
import FichaEstoque from './estoques/Ficha';

import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function Main(props) {
  const theme = useTheme();

  const headerStyle = {
    ...theme.screenOptions.headerStyle,
    ...styles.header,
    };

  const headerTintColor = theme.screenOptions.headerTintColor;
  const headerTitleStyle = theme.screenOptions.headerTitleStyle;
  const screenOptions = {
    ...theme.screenOptions,
    header: ({ navigation, route }) => {
        return (
            <View style={headerStyle}>
              <IconButton icon="menu" onPress={navigation.openDrawer} />
              <View style={styles.center}>
                  <Avatar.Image source={{uri: 'https://gust-production.s3.amazonaws.com/uploads/startup/panoramic_image/887508/connectdata_marca_1_3.jpg' }} size={35}/>
              </View>
              <IconButton icon="bell" onPress={() => {navigation.navigate('Estoques')}} />
            </View>
        );
    },
  };
    return (
         <Drawer.Navigator drawerContent={props => <DrawerContent {...props} /> } initialRouteName="Materiais" screenOptions={screenOptions}>  
             <Drawer.Screen name="Materiais" component={ListaMaterial}/>
             <Drawer.Screen name="Ferramentas" component={ListaFerramenta}/>
             <Drawer.Screen name="Novo Pedido" component={FichaPedido}/>
             <Drawer.Screen name="Estoques" component={ListaEstoque}/>
             <Drawer.Screen name="Adicionar Estoque" component={FichaEstoque}/>
        </Drawer.Navigator>
    );
}