import React,{ useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { View, Image, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { TouchableRipple, Title, Divider, ActivityIndicator, Text, Button, FAB, Snackbar } from 'react-native-paper';

import { Rounded, Icon, useSignal, useEmit, useEffect, useRequest, map } from '../../lib';

import settings from '../../settings.json';

import styles from '../../styles/pedidos/Lista.json';

function PedidoItem(props) {
    const { navigation, pedido } = props;
    return (
        <>
            <TouchableRipple style={styles.itemContainer} onPress={() => navigation.navigate('FichaPedido', pedido)}>
                <View style={styles.item}>
                    <Rounded>
                        <View style={styles.photoContainer}>
                            {pedido.foto ? (
                                <Image style={styles.photo} source={{ uri: pedido.foto }} resizeMode="stretch" />
                            ) : (
                                <Icon name="account" />
                            )}
                        </View>
                    </Rounded>
                    <Title style={styles.name}>
                        {pedido.urgencia}
                    </Title>
                </View>
            </TouchableRipple>
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
                        <Button mode="contained" onPress={emit}>
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
