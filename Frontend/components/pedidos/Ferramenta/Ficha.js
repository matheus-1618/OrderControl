import React, { useState } from 'react';

import { ScrollView, Image, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Card, IconButton, Chip, Title,Colors, TextInput, HelperText, Button, Snackbar, Portal, Dialog, Paragraph } from 'react-native-paper';

import { AspectView, Icon, DropDown, DateTimePicker, useEmit, useEffect, useStorage, useRequest } from '../../../lib';


import settings from '../../../settings.json';

import styles from '../../../styles/pedidos/Ferramenta/Ficha.json';

export default function Ficha(props) {
    const { navigation, route } = props;

    const pedido = route.params;

    const [urgencia, setUrgencia] = useState(pedido ? pedido.urgencia : 'BAIXA');
    const [observacoes, setObservacao] = useState(pedido ? pedido.observacoes : '');
    const [observacoesError, setObservacaoError] = useState(typeof observacoes !== 'string' || !observacoes.trim());
    const [registerError, setRegisterError] = useState(false);
    const [removeError, setRemoveError] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);

    const [andaime, setAndaime] = useState(pedido ? pedido.ferramentas.andaime : 0);
    const [betoneira, setBetoneira] = useState(pedido ? pedido.ferramentas.betoneira : 0);
    const [bomba, setBomba] = useState(pedido ? pedido.ferramentas.bomba : 0);
    const [esmerilhadeira, setEsmerilhadeira] = useState(pedido ? pedido.ferramentas.esmerilhadeira : 0);
    const [furadeira, setFuradeira] = useState(pedido ? pedido.ferramentas.furadeira : 0);
    const [outros, setOutros] = useState(pedido ? pedido.ferramentas.outros : 0);

    const emit = useEmit('updated-ferramentas');

    const { post, put, response: registerResponse } = useRequest(settings.url);
    const { del, response: removeResponse } = useRequest(settings.url);

    function decrementaAndaime() {
        if (andaime >=1){
        setAndaime(andaime - 1);
        }
    }

    function incrementaAndaime() {
        setAndaime(andaime + 1);
    }

    function decrementaBetoneira() {
        if (betoneira >=1){
        setBetoneira(betoneira - 1);
        }
    }

    function incrementaBetoneira() {
        setBetoneira(betoneira + 1);
    }

    function decrementaBomba() {
        if (bomba >=1){
        setBomba(bomba - 1);
        }
    }

    function incrementaBomba() {
        setBomba(bomba + 1);
    }

    function decrementaEsmerilhadeira() {
        if (esmerilhadeira >=1){
        setEsmerilhadeira(esmerilhadeira - 1);
        }
    }

    function incrementaEsmerilhadeira() {
        setEsmerilhadeira(esmerilhadeira + 1);
    }

    function decrementaFuradeira() {
        if (furadeira >=1){
        setFuradeira(furadeira - 1);
        }
    }

    function incrementaFuradeira() {
        setFuradeira(furadeira + 1);
    }

    function decrementaOutros() {
        if (outros >=1){
        setOutros(outros - 1);
        }
    }
    function incrementaOutros() {
        setOutros(outros + 1);
    }

    function onPressRegister() {
        setRegisterError(true);
        const body = {
            urgencia: urgencia,
            observacoes: observacoes,
            ferramentas:{"andaime":andaime,"betoneira":betoneira,
            "bomba":bomba,"esmerilhadeira":esmerilhadeira,"furadeira":furadeira,"outros":outros},
        };
        if (pedido) {
            body.id = pedido.id;
            put('/ferramenta', body);
        } else {
            post('/ferramenta', body);
        }
    }

    function onDismissRemove() {
        setRemoveVisible(false);
    }

    function onConfirmRemove() {
        onDismissRemove();
        setRemoveError(true);
        del(`/ferramenta?id=${pedido.id}`);
    }

    useEffect(() => {
        if ((registerResponse.success && registerResponse.body !== null) || (removeResponse.success && removeResponse.body !== null)) {
            emit();
            navigation.navigate('Lista');
        } else {
            navigation.setOptions({ title: pedido ? "Pedido #"+ pedido.id : 'Ferramenta' });
        }
    }, [registerResponse, removeResponse]);


    const urgencias = [
        { label: 'Alta', value: 'ALTA' },
        { label: 'Baixa', value: 'BAIXA' },
    ];


    function onChangeTextObs(text) {
        setObservacao(text);
        setObservacaoError(!text.trim());
    }

    return (
        <>
            <ScrollView>
                <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>  
                <View style={styles.title}>
                    <Title>Ferramentas</Title>
                </View>
                <View style={styles.cardContainer}>
                <Card style={styles.card}>
                    <Card.Title title="Andaime" subtitle="Cimento Portland comum" />
                    <Card.Cover source={{ uri: 'https://www.casadoconstrutor.com.br/wp-content/uploads/2018/07/andaimes.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                <View style={styles.buttons}>
                    <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaAndaime} /> 
                    <Text>{andaime}</Text>
                    <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaAndaime} /> 
                </View>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Betoneira" subtitle="Argamassa Portland comum" />
                    <Card.Cover  source={{ uri: 'https://a-static.mlcdn.com.br/618x463/betoneira-menegotti-400-litros-prime/lojaszema/2116/6489f17ea00a03aa2beb1e9074686ada.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <View style={styles.buttons}>
                        <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaBetoneira} /> 
                        <Text>{betoneira}</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaBetoneira} /> 
                    </View> 
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Bomba" subtitle="Cimento Portland comum" />
                    <Card.Cover source={{ uri: 'https://images-submarino.b2w.io/produtos/01/00/item/111605/8/111605854_1GG.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <View style={styles.buttons}>
                        <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaBomba} /> 
                        <Text>{bomba}</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaBomba} /> 
                    </View>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Lixadeira" subtitle="Argamassa Portland comum" />
                    <Card.Cover  source={{ uri: 'https://casadosoldador.com.br/files/products_images/12587/esmerilhadeira-angular-840w-4-1-2-pol-9557hng-makita-casa-do-soldador-01.jpg?1515090040'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <View style={styles.buttons}>
                        <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaEsmerilhadeira} /> 
                        <Text>{esmerilhadeira}</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaEsmerilhadeira} /> 
                    </View> 
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Furadeira" subtitle="Cimento Portland comum" />
                    <Card.Cover source={{ uri: 'https://m.media-amazon.com/images/I/612zj2sywuL._AC_SY355_.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                <View style={styles.buttons}>
                    <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaFuradeira} /> 
                    <Text>{furadeira}</Text>
                    <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaFuradeira} /> 
                </View>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Outros" subtitle="Argamassa Portland comum" />
                    <Card.Cover  source={{ uri: 'https://m.media-amazon.com/images/I/71V4LbulRaL._AC_SY355_.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <View style={styles.buttons}>
                        <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaOutros} /> 
                        <Text>{outros}</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaOutros} /> 
                    </View> 
                    </Card.Actions>
                </Card>
                </View>

                    <DropDown style={styles.input} label="Urgencia" list={urgencias} value={urgencia} setValue={setUrgencia} />
                    <TextInput style={styles.input} label="Observações" value={observacoes} error={observacoesError} onChangeText={onChangeTextObs} />
                    {observacoesError && (
                        <HelperText style={styles.error} type="error">
                            Adicione uma observação
                        </HelperText>
                    )}
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="outlined" disabled={registerResponse.running || removeResponse.running} loading={registerResponse.running} onPress={onPressRegister}>
                            {pedido ? 'Salvar' : 'Solicitar Pedido'}
                        </Button>
                        {pedido && (
                            <Button style={styles.button} mode="outlined" disabled={registerResponse.running || removeResponse.running} loading={removeResponse.running} onPress={() => setRemoveVisible(true)}>
                                Remover
                            </Button>
                        )}
                    </View>
                </SafeAreaView>
            
            {!registerResponse.running && !registerResponse.success && (
                <Snackbar visible={registerError} action={{ label: 'Ok', onPress: () => setRegisterError(false) }} onDismiss={() => { }}>
                    {registerResponse.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${registerResponse.body.status}: ${registerResponse.body.message}`}
                </Snackbar>
            )}
            {!removeResponse.running && !removeResponse.success && (
                <Snackbar visible={removeError} action={{ label: 'Ok', onPress: () => setRemoveError(false) }} onDismiss={() => { }}>
                    {removeResponse.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${removeResponse.body.status}: ${removeResponse.body.message}`}
                </Snackbar>
            )}
            {pedido && (
                <Portal>
                    <Dialog visible={removeVisible} onDismiss={onDismissRemove}>
                        <View>
                            <Dialog.Title>
                            </Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>
                                    Esta operação não pode ser desfeita.
                                </Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={onDismissRemove}>
                                    Cancelar
                                </Button>
                                <Button onPress={onConfirmRemove}>
                                    Ok
                                </Button>
                            </Dialog.Actions>
                        </View>
                    </Dialog>
                </Portal>
                
            )}
            </ScrollView>
        </>
    );
}