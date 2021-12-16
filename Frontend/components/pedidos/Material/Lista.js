import React,{ useState } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar,Chip, Card, Paragraph ,Divider, ActivityIndicator, Text, Button, FAB, Snackbar } from 'react-native-paper';

import { Icon, useSignal, useEmit, useEffect, useRequest, map } from '../../../lib';

import styles from '../../../styles/pedidos/Material/Lista.json';

import settings from '../../../settings.json';

function PedidoItem(props) {
    const { navigation, pedido } = props;
    return (
        <>
            <Card style={styles.itemContainer} elevation={15} onPress={() => navigation.navigate('Ficha', pedido)}>
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
                        <Avatar.Icon size={45} icon="wall" />
                    </View>
                </View>
                <Card.Content styles={styles.observacoes}>
                    <Paragraph>Solicitações:</Paragraph>
                        <View style={styles.chipContainer}>
                            {pedido.materiais.brita != 0 &&
                                (<Chip style={styles.chip} selectedColor="#2D2A9B" icon="wall">Brita {pedido.materiais.brita}x</Chip>)}
                            {pedido.materiais.argamassa != 0 &&
                                (<Chip style={styles.chip} selectedColor="#2D2A9B" icon="pillar">Argamassa {pedido.materiais.argamassa}x</Chip>)}
                            {pedido.materiais.cal != 0 &&
                                (<Chip style={styles.chip} selectedColor="#2D2A9B" icon="hard-hat">Cal {pedido.materiais.cal}x</Chip>)}
                            {pedido.materiais.cimento != 0 &&
                                (<Chip style={styles.chip} selectedColor="#2D2A9B" icon="texture">Cimento {pedido.materiais.cimento}x</Chip>)}
                            {pedido.materiais.areia != 0 &&
                                (<Chip style={styles.chip} selectedColor="#2D2A9B" icon="sack">Areia {pedido.materiais.areia}x</Chip>)}
                            {pedido.materiais.outros != 0 &&
                                (<Chip style={styles.chip} selectedColor="#2D2A9B" icon="help-circle">Outros {pedido.materiais.outros}x</Chip>)}
                        </View>   
                    </Card.Content>
                <Card.Actions >
                    {pedido.observacoes != "" ? 
                    (<View style={styles.col}>
                        <Paragraph>Observações: {pedido.observacoes}</Paragraph>
                        <View style={styles.sol}>
                        <Button style={styles.sol} icon="clock" mode="outlined" >{pedido.data}</Button>
                        </View>
                    </View>) :
                    (<View style={styles.sol}>
                        <Button style={styles.sol} icon="clock" mode="outlined" >{pedido.data}</Button>
                    </View>)}
                </Card.Actions>
            </Card>
            <Divider />
        </>
    );
}

export default function Lista(props) {
    const { navigation } = props;
    const [getError, setGetError] = useState(false);
    const signal = useSignal('updated-materiais');
    const emit = useEmit('updated-materiais');
    const { get, response } = useRequest(settings.url);

    useEffect(() => {
        setGetError(true);
        get('/material/list');
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
                                <Icon style={styles.None} color="#2385A2" name="package-variant"/>
                                <Text style={styles.text}>
                                    Nenhum pedido registrado
                                </Text>
                            <Button style = {styles.button} icon={"plus-circle-outline"} mode="contained" onPress={() => navigation.navigate('Ficha', null)}>
                                Solicitar Material
                            </Button>
                            </View>
                        </View>
                    ) : (
                        <ScrollView>
                            <SafeAreaView style={styles.container}>
                                {map(response.body.reverse(), (pedido) => <PedidoItem navigation={navigation} pedido={pedido} />)}
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