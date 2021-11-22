import React,{ useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { View, Image, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Chip, Card, Paragraph , Title,Divider, ActivityIndicator, Text, Button, FAB, Snackbar } from 'react-native-paper';

import { Rounded, Icon,AspectView, useSignal, useEmit, useEffect, useRequest, map } from '../../lib';

import settings from '../../settings.json';

import styles from '../../styles/pedidos/Lista.json';



function PedidoItem(props) {
    const { navigation, pedido } = props;
    return (
        <>
            <Card style={styles.itemContainer} onPress={() => navigation.navigate('Novo Pedido', pedido)}>
                <View style={styles.cardTitle}>
                    <View style={styles.urgenciaIcon}>
                    {pedido.urgencia == "BAIXA" ? (
                      <Icon name="alarm-light-outline" size={10} color="green"/>
                    ) :
                    ( <Icon name="alarm-light" size={10} color="red"/>)
                    }
                    </View>
                <Card.Title title={"Pedido #"+pedido.id}  />
                </View>
                <Card.Content styles={styles.observacoes}>

                <Paragraph>Solicitações</Paragraph>

                    <View style={styles.chipContainer}>
                        <Chip style={styles.chip} icon="wall">Andaime</Chip>
                        <Chip style={styles.chip} icon="wall">Cimento</Chip>
                        <Chip style={styles.chip} icon="wall">Cal</Chip>
                        
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
                            <Button mode="outlined" onPress={() => navigation.navigate('Novo Pedido', null)}>
                                Solicitar novo pedido
                            </Button>
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
            <FAB style={styles.fab} icon="plus"  color={Colors.white500} onPress={() => navigation.navigate('Novo Pedido', null)} />
            {!response.running && !response.success && (
                <Snackbar visible={getError} action={{ label: 'Ok', onPress: () => setGetError(false) }} onDismiss={() => { }}>
                    {response.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${response.body.status}: ${response.body.message}`}
                </Snackbar>
            )}
        </>
    );
}
