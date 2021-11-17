import React,{ useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { View, Image, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Card,Paragraph , Title,Divider, ActivityIndicator, Text, Button, FAB, Snackbar } from 'react-native-paper';

import { Rounded, Icon,AspectView, useSignal, useEmit, useEffect, useRequest, map } from '../../lib';

import settings from '../../settings.json';

import styles from '../../styles/pedidos/Lista.json';

function PedidoItem(props) {
    const { navigation, pedido } = props;
    return (
        <>
            <Card style={styles.itemContainer} onPress={() => navigation.navigate('FichaPedido', pedido)}>
                <View style={styles.photoContainer}>
                    <Icon name="circle" size={10} color="green"/>
                </View>
                <Card.Title title={pedido.urgencia} style={styles.detalhes} />
                <Card.Content>
                    <Paragraph styles={styles.observacoes}>
                        Observações: {pedido.observacoes}
                    </Paragraph>
                </Card.Content>
                    
                <Card.Actions>
                   
                    <Button>Deletar Pedido</Button>
                </Card.Actions>
            </Card>
            <Divider />
        </>
    );
}

export default function Lista(props) {
    const { navigation } = props;

    const [getError, setGetError] = useState(false);

    const signal = useSignal('updated-pedidos');
    const emit = useEmit('updated-pedidos');

    const { get, response } = useRequest(settings.url);

    useEffect(() => {
        setGetError(true);
        get('/pedido/list');
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
                            <Text>
                                Nenhum pedido registrado
                            </Text>
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
                        <Button mode="outlined" onPress={emit}>
                            Tentar novamente
                        </Button>
                    </View>
                )
            )}
            <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('FichaPedido', null)} />
            {!response.running && !response.success && (
                <Snackbar visible={getError} action={{ label: 'Ok', onPress: () => setGetError(false) }} onDismiss={() => { }}>
                    {response.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${response.body.status}: ${response.body.message}`}
                </Snackbar>
            )}
        </>
    );
}
