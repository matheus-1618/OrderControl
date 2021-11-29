import React from 'react';

import { View, StyleSheet } from 'react-native';

import { List } from 'react-native-paper';

import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useGlobal } from '../lib';

import settings from '../settings.json';

export function DrawerContent(props) {

    const paperTheme = useTheme();
    const [expanded, setExpanded] = React.useState(true);

    //const onToggleSwitch = () => setMode(!mode);

    const handlePress = () => setExpanded(!expanded);
  

    return( 
        <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection:'row',marginTop: 15}}>
                        <Avatar.Image 
                            source={{
                                uri: 'https://gust-production.s3.amazonaws.com/uploads/startup/panoramic_image/887508/connectdata_marca_1_3.jpg'
                            }}
                            size={50}
                        />
                        <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Title style={styles.title}>Funcionário</Title>
                            <Caption style={styles.caption}>hospitalemp@connect.com</Caption>
                        </View>
                    </View>
                </View>
                    

                <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="playlist-edit" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Pedidos"
                        onPress={() => {props.navigation.navigate('Pedidos')}}
                    />

                     <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="barn" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Estoques"
                        onPress={() => {props.navigation.navigate('Estoque')}}
                    />

<DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="table" 
                            color={color}
                            size={size}
                            />
                        )}
                        label="Logs"
                        onPress={() => {props.navigation.navigate('Logs')}}
                    />

                <Drawer.Section title="Preferências">
                    <TouchableRipple >
                        <View style={styles.preference}>
                            <Text>Modo noturno</Text>
                            <View pointerEvents="none">
                                <Switch/>
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem 
                icon={({color, size}) => (
                    <Icon 
                    name="exit-to-app" 
                    color={color}
                    size={size}
                    />
                )}
                label="Sair"
                onPress={() => {signOut()}}
            />
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