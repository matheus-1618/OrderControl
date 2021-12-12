import React,{ useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { View } from 'react-native';

import { useTheme,IconButton,Avatar,Badge } from 'react-native-paper';

import Pedidos from './pedidos/Main'

import styles from '../styles/Main.json';

console.reportErrorsAsExceptions = false;

import { useGlobal } from '../lib';

import Pedido from './pedidos/Main';
import Estoque from './estoques/Main';
import Notificacoes from './Notificaoes';
import Logs from './log/Main';

import settings from '../settings.json';

import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function Main(props) {
  const theme = useTheme();
  const { navigation } = props;
  const [getSize, setGetSize] = useGlobal("size");

  function notificacao() {
    setGetSize(0);
}

  const headerStyle = {
    ...theme.screenOptions.headerStyle,
    ...styles.header,
    };


  const screenOptions = {
    ...theme.screenOptions,
    header: ({ navigation, route }) => {
        return (
            <View style={headerStyle}>
              <IconButton icon="menu" color="gray" onPress={navigation.openDrawer} />
              <View style={styles.center}>
                  <Avatar.Image source={{uri: 'https://gust-production.s3.amazonaws.com/uploads/startup/panoramic_image/887508/connectdata_marca_1_3.jpg'}} size={35} />
              </View>
              <IconButton icon="bell" animated={true} color="gray" onPress={() => {navigation.navigate('Notificacao'),notificacao()}} />
              <View style={styles.badge}>
              {getSize>0 && (<Badge color="blue" style={styles.size} size={17}>{getSize}</Badge>)}
              </View>
            </View>
        );
    },
  };
    return (
         <Drawer.Navigator drawerContent={props => <DrawerContent {...props} /> } initialRouteName="Pedidos" screenOptions={screenOptions}>  
            <Drawer.Screen name="Pedidos" component={Pedido}/>
            <Drawer.Screen name="Estoque" component={Estoque}/>
            <Drawer.Screen name="Notificacao" component={Notificacoes}/>
            <Drawer.Screen name="Logs" component={Logs}/>
        </Drawer.Navigator>
    );
}