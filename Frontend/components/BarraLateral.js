import React,{ useState } from 'react';

import { View, StyleSheet } from 'react-native';

import {useTheme,Avatar,Title,Caption,Button,Drawer,Text,TouchableRipple,Switch} from 'react-native-paper';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useGlobal } from '../lib';


export function BarraLateral(props) {

    const paperTheme = useTheme();
    const [expanded, setExpanded] = useState(true);
    const [dark,setDark] = useGlobal("dark");
    const [email, setEmail] = useGlobal('email');

    const handlePress = () => setExpanded(!expanded);
    const onToggleSwitch = () => setDark();
  
    return( 
        <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection:'row',marginTop: 15}}>
                        <Avatar.Icon icon="hard-hat" size={50}/>
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>{email.includes("@") ? email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)  : "Não válido"}</Title>
                            <Caption style={styles.caption}>{email}</Caption>
                        </View>
                    </View>
                </View>
                    
                <DrawerItem icon={({color, size}) => (<Icon name="playlist-edit"  color={color} size={size}/>)} label="Pedidos" onPress={() => {props.navigation.navigate('Pedidos')}}/>
                <DrawerItem  icon={({color, size}) => (<Icon name="barn" color={color} size={size}/>)} label="Estoques" onPress={() => {props.navigation.navigate('Estoque')}}/>
                <DrawerItem icon={({color, size}) => (<Icon name="table" color={color} size={size}/>)} label="Log de Modificações" onPress={() => {props.navigation.navigate('Logs')}}/>

                <Drawer.Section title="Preferências">
                    <TouchableRipple onPress={onToggleSwitch} >
                        <View style={styles.preference}>
                            <Text>Modo noturno</Text>
                            <View pointerEvents="none">
                                <Switch value={dark} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem onPress={() => {props.navigation.navigate('Login')}} icon={({color, size}) => (<Icon name="exit-to-app" color={color} size={size}/>)} label="Sair"/>
        </Drawer.Section>
    </View>
);
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    icon:{
    marginTop:'1.5rem',
    },
    list: {
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
      },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
