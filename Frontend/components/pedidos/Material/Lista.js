import React,{ useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { View, Image, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Chip, Card, Paragraph , Title,Divider, ActivityIndicator, Text, Button, FAB, Snackbar } from 'react-native-paper';

import { Rounded, Icon,AspectView, useSignal, useEmit, useEffect, useRequest, map } from '../../../lib';

import styles from '../../../styles/pedidos/Material/Lista.json';

import settings from '../../../settings.json';

function PedidoItem(props) {
    const { navigation, pedido } = props;
    return (
        <>
            <Card style={styles.itemContainer} onPress={() => navigation.navigate('Ficha', pedido)}>
                <View style={styles.cardTitle}>
                    <View style={styles.cardheader}>
                        <View style={styles.urgenciaIcon}>
                        {pedido.urgencia == "BAIXA" ? (
                        <Icon name="alarm-light-outline" size={10} color="green"/>
                        ) :
                        ( <Icon name="alarm-light" size={10} color="red"/>)
                        }
                        </View>
                    <Card.Title title={"Pedido #"+pedido.id}  />
                    </View>
                    <View style={styles.icon}>
                        <Icon name="wall" color="gray"/>
                    </View>
                </View>
                <Card.Content styles={styles.observacoes}>
                <Paragraph>Solicitações:</Paragraph>
                <View style={styles.chipContainer}>
                
                </View>

                    <View style={styles.chipContainer}>
                        {pedido.materiais.brita != 0 &&
                            (<Chip style={styles.chip} selectedColor="blue" icon="wall">Brita {pedido.materiais.brita}x</Chip>)}
                        {pedido.materiais.argamassa != 0 &&
                            (<Chip style={styles.chip} selectedColor="blue" icon="pillar">Argamassa {pedido.materiais.argamassa}x</Chip>)}
                        {pedido.materiais.cal != 0 &&
                            (<Chip style={styles.chip} selectedColor="blue" icon="hard-hat">Cal {pedido.materiais.cal}x</Chip>)}
                        {pedido.materiais.cimento != 0 &&
                            (<Chip style={styles.chip} selectedColor="blue" icon="texture">Cimento {pedido.materiais.cimento}x</Chip>)}
                        {pedido.materiais.areia != 0 &&
                            (<Chip style={styles.chip} selectedColor="blue" icon="nut">Areia {pedido.materiais.areia}x</Chip>)}
                        {pedido.materiais.outros != 0 &&
                            (<Chip style={styles.chip} selectedColor="blue" icon="help-circle">Outros {pedido.materiais.outros}x</Chip>)}

                        
                        
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
                            <Text>
                                Nenhum pedido registrado
                            </Text>
                            <Button mode="outlined" onPress={() => navigation.navigate('Ficha', null)}>
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
            <FAB style={styles.fab} icon="plus"  color="white" onPress={() => navigation.navigate('Ficha', null)} />
            {!response.running && !response.success && (
                <Snackbar visible={getError} action={{ label: 'Ok', onPress: () => setGetError(false) }} onDismiss={() => { }}>
                    {response.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${response.body.status}: ${response.body.message}`}
                </Snackbar>
            )}
        </>
    );
}