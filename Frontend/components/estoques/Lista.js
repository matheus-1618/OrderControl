import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { TouchableRipple, Title, Divider, ActivityIndicator, Text, Button, FAB, Snackbar,Avatar } from 'react-native-paper';

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
                            <Avatar.Icon  icon="barn" size={50}  />
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
        <Title>Estoques cadastrados</Title>
    </View>
            {response.running ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                response.success ? (
                    response.body === null || response.body.length === 0 ? (
                        <View style={styles.center}>
                             <View style={styles.noNotification}>
                                <Icon style={styles.None} name="truck-fast"/>
                                <Text style={styles.text}>
                                    Nenhum estoque cadastrado
                                </Text>
                            <Button style = {styles.button} icon={"plus-circle-outline"} mode="contained" onPress={() => navigation.navigate('Adicionar Estoque', null)}>
                                Cadastrar novo estoque
                            </Button>
                            </View>
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
            <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('Adicionar Estoque', null)} />
            {!response.running && !response.success && (
                <Snackbar visible={getError} action={{ label: 'Ok', onPress: () => setGetError(false) }} onDismiss={() => { }}>
                    {response.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${response.body.status}: ${response.body.message}`}
                </Snackbar>
            )}
        </>
    );
}