import React,{ useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { View, Image, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Chip, Card, Paragraph , Title,Divider, ActivityIndicator, Text, Button, FAB, Snackbar } from 'react-native-paper';

import { Rounded, Icon,AspectView, useSignal, useEmit, useEffect, useRequest, map } from '../../../lib';

import settings from '../../../settings.json';


import styles from '../../../styles/pedidos/Ferramenta/Lista.json';

function PedidoItem(props) {
    const { navigation, pedido } = props;
    return (
        <>
            <Card style={styles.itemContainer} onPress={() => navigation.navigate('Ficha', pedido)}>
                <View style={styles.cardTitle}>
                <View style={styles.cardheader}>
                    <View style={styles.urgenciaIcon}>
                    {pedido.urgencia == false ? (
                      <Icon name="alarm-light-outline" size={10} color="green"/>
                    ) :
                    ( <Icon name="alarm-light" size={10} color="red"/>)
                    }
                    </View>
                <Card.Title title={"Pedido #"+pedido.id}  />
                </View>
                <View style={styles.icon}>
                    <Icon name="hammer" size={10} color="gray"/>
                    </View>
               
                </View>
                <Card.Content styles={styles.observacoes}>
                <Paragraph>Solicitações:</Paragraph>
                <View style={styles.chipContainer}>
                
                </View>

                    <View style={styles.chipContainer}>
                    {pedido.ferramentas.andaime != 0 &&
                            (<Chip style={styles.chip} selectedColor="green" icon="escalator">Andaime {pedido.ferramentas.andaime}x</Chip>)}
                        {pedido.ferramentas.betoneira != 0 &&
                            (<Chip style={styles.chip} selectedColor="green" icon="wrench">Betoneira {pedido.ferramentas.betoneira}x</Chip>)}
                        {pedido.ferramentas.bomba != 0 &&
                            (<Chip style={styles.chip} selectedColor="green" icon="nut">Bomba {pedido.ferramentas.bomba}x</Chip>)}
                        {pedido.ferramentas.esmerilhadeira != 0 &&
                            (<Chip style={styles.chip} selectedColor="green" icon="circular-saw">Lixadeira {pedido.ferramentas.esmerilhadeira}x</Chip>)}
                        {pedido.ferramentas.furadeira != 0 &&
                            (<Chip style={styles.chip} selectedColor="green" icon="screw-flat-top">Furadeira {pedido.ferramentas.furadeira}x</Chip>)}
                        {pedido.ferramentas.outros != 0 &&
                            (<Chip style={styles.chip} selectedColor="green" icon="help-box">Outros {pedido.ferramentas.outros}x</Chip>)}
                        
                    </View>   
                </Card.Content>
                <Card.Actions>
                    <Paragraph>Observações: {pedido.observacoes}</Paragraph>
                </Card.Actions>
            </Card>
            <Divider />
        </>
    );
}

export default function Lista(props) {
    const { navigation } = props;

    const [getError, setGetError] = useState(false);

    const signal = useSignal('updated-ferramentas');
    const emit = useEmit('updated-ferramentas');

    const { get, response } = useRequest(settings.url);

    useEffect(() => {
        setGetError(true);
        get('/ferramenta/list');
    }, [signal]);

    


    return (
        <>
            {response.running ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                response.success ? (
                    response.body === null || response.body.length === 0 ? (
                        <View style={styles.center}>
                            <View style={styles.noNotification}>
                                <Icon style={styles.None} name="package-variant-closed"/>
                                <Text style={styles.text}>
                                    Nenhum pedido registrado
                                </Text>
                            <Button style = {styles.button} icon={"plus-circle-outline"} mode="contained" onPress={() => navigation.navigate('Ficha', null)}>
                                Solicitar Ferramenta
                            </Button>
                            </View>
                        </View>
                    ) : (
                        <ScrollView>
                            <SafeAreaView style={styles.container}>
                                {map(response.body, (pedido) => <PedidoItem navigation={navigation} pedido={pedido} />)}
                            </SafeAreaView>
                        </ScrollView>
                    )
                ) : (
                    <View style={styles.center}>
                        <View style={styles.noNotification}>
                                <Icon style={styles.None} name="close-box-multiple"/>
                                <Text style={styles.text}>
                                    Ocorreu um erro inesperado
                                </Text>
                            <Button style = {styles.button} icon={"backup-restore"} mode="contained" onPress={emit}>
                                Tentar novamente
                            </Button>
                            </View>
                    </View>
                )
            )}
            <FAB style={styles.fab} icon="plus"  color="white" onPress={() => navigation.navigate('Ficha', null)} />
            {!response.running && !response.success && (
                <Snackbar visible={getError} action={{ label: 'Ok', onPress: () => setGetError(false) }} onDismiss={() => { }}>
                    {response.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${response.body.status}: ${response.body.message}`}
                </Snackbar>
            )}
        </>
    );
}
