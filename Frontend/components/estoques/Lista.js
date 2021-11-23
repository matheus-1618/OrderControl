import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { TouchableRipple, Title, Divider, ActivityIndicator, Text, Button, FAB, Snackbar } from 'react-native-paper';

import { Rounded, Icon, useSignal, useEmit, useEffect, useRequest, map } from '../../lib';

import settings from '../../settings.json';

import styles from '../../styles/estoques/Lista.json';

function EstoqueItem(props) {
    const { navigation, estoque } = props;
    return (
        <>
            <TouchableRipple style={styles.itemContainer} onPress={() => navigation.navigate('Adicionar Estoque', estoque)}>
                <View style={styles.item}>
                    <Rounded>
                        <View style={styles.photoContainer}>
                            <Icon name="barn" />
                        </View>
                    </Rounded>
                    <Title style={styles.name}>
                        {estoque.nome}
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

    const signal = useSignal('updated-estoques');
    const emit = useEmit('updated-estoques');

    const { get, response } = useRequest(settings.url);

    useEffect(() => {
        setGetError(true);
        get('/estoque/list');
    }, [signal]);

    return (
        <>
        <View style={styles.title}>
        <Title>Estoques</Title>
    </View>
            {response.running ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                response.success ? (
                    response.body === null || response.body.length === 0 ? (
                        <View style={styles.center}>
                            <Text>
                                Nenhum estoque salvo
                            </Text>
                        </View>
                    ) : (
                        <ScrollView>
                            <SafeAreaView style={styles.container}>
                                {map(response.body, (estoque) => <EstoqueItem navigation={navigation} estoque={estoque} />)}
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
            <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('Adicionar Estoque', null)} />
            {!response.running && !response.success && (
                <Snackbar visible={getError} action={{ label: 'Ok', onPress: () => setGetError(false) }} onDismiss={() => { }}>
                    {response.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${response.body.status}: ${response.body.message}`}
                </Snackbar>
            )}
        </>
    );
}