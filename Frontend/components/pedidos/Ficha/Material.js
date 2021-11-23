import React, { useState } from 'react';

import { ScrollView, Image, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Card, IconButton, Chip, Title,Colors, TextInput, HelperText, Button, Snackbar, Portal, Dialog, Paragraph } from 'react-native-paper';

import { AspectView, Icon, DropDown, DateTimePicker, useEmit, useEffect, useStorage, useRequest } from '../../../lib';

import settings from '../../../settings.json';

import styles from '../../../styles/pedidos/Ficha.json';

export default function Ficha(props) {
    const { navigation, route } = props;

    const pedido = route.params;

    const [urgencia, setUrgencia] = useState(pedido ? pedido.urgencia : 'BAIXA');
    const [observacoes, setObservacao] = useState(pedido ? pedido.observacoes : '');
    const [observacoesError, setObservacaoError] = useState(typeof observacoes !== 'string' || !observacoes.trim());
    const [registerError, setRegisterError] = useState(false);
    const [removeError, setRemoveError] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);

    const [cimento, setCimento] = useState(pedido ? pedido.materiais.cimento : 0);
    const [argamassa, setArgamassa] = useState(pedido ? pedido.materiais.argamassa : 0);
    const [brita, setBrita] = useState(pedido ? pedido.materiais.brita : 0);
    const [cal, setCal] = useState(pedido ? pedido.materiais.cal : 0);
    const [areia, setAreia] = useState(pedido ? pedido.materiais.areia : 0);
    const [outros, setOutros] = useState(pedido ? pedido.materiais.outros : 0);

    const [selected7, setSelected7] = useState(false);
    const [selected8, setSelected8] = useState(false);
    const [selected9, setSelected9] = useState(false);

    const emit = useEmit('updated-pedidos');

    const { post, put, response: registerResponse } = useRequest(settings.url);
    const { del, response: removeResponse } = useRequest(settings.url);

    function decrementaCimento() {
        if (cimento >=1){
        setCimento(cimento - 1);
        }
    }

    function incrementaCimento() {
        setCimento(cimento + 1);
    }

    function decrementaArgamassa() {
        if (argamassa >=1){
        setArgamassa(argamassa - 1);
        }
    }

    function incrementaArgamassa() {
        setArgamassa(argamassa + 1);
    }

    function decrementaBrita() {
        if (brita >=1){
        setBrita(brita - 1);
        }
    }

    function incrementaBrita() {
        setBrita(brita + 1);
    }

    function decrementaCal() {
        if (cal >=1){
        setCal(cal - 1);
        }
    }

    function incrementaCal() {
        setCal(cal + 1);
    }

    function decrementaAreia() {
        if (areia >=1){
        setAreia(areia - 1);
        }
    }

    function incrementaAreia() {
        setAreia(areia + 1);
    }

    function decrementaOutros() {
        if (outros >=1){
        setOutros(outros - 1);
        }
    }
    function incrementaOutros() {
        setOutros(outros + 1);
    }

    function onPressSelect7() {
        if (selected7 == false){
            setSelected7(true);
        }
        else{
            setSelected7(false);
        }
    }
    function onPressSelect8() {
        if (selected8 == false){
            setSelected8(true);
        }
        else{
            setSelected8(false);
        }
    }
    function onPressSelect9() {
        if (selected9 == false){
            setSelected9(true);
        }
        else{
            setSelected9(false);
        }
    }

    function onPressRegister() {
        setRegisterError(true);
        const body = {
            urgencia: urgencia,
            observacoes: observacoes,
            materiais:{"cimento":cimento,"areia":areia,
            "brita":brita,"cal":cal,"argamassa":argamassa,"outros":outros},
        };
        if (pedido) {
            body.id = pedido.id;
            put('/pedido', body);
        } else {
            post('/pedido', body);
        }
    }

    function onDismissRemove() {
        setRemoveVisible(false);
    }

    function onConfirmRemove() {
        onDismissRemove();
        setRemoveError(true);
        del(`/pedido?id=${pedido.id}`);
    }

    useEffect(() => {
        if ((registerResponse.success && registerResponse.body !== null) || (removeResponse.success && removeResponse.body !== null)) {
            emit();
            navigation.navigate('Pedidos Realizados');
        } else {
            navigation.setOptions({ title: pedido ? "Pedido #"+ pedido.id : 'Material' });
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
                    <Title>Materiais</Title>
                </View>
                <View style={styles.cardContainer}>
                <Card style={styles.card}>
                    <Card.Title title="Cimento" subtitle="Cimento Portland comum" />
                    <Card.Cover source={{ uri: 'https://telhanorte.vteximg.com.br/arquivos/ids/330671-NaN-NaN/1444778.jpg?v=636652679501130000'  }} resizeMode="stretch" />
                    <Card.Actions>
                <View style={styles.buttons}>
                    <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaCimento} /> 
                    <Text>{cimento}</Text>
                    <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaCimento} /> 
                </View>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Argamassa" subtitle="Argamassa Portland comum" />
                    <Card.Cover  source={{ uri: 'https://telhanorte.vteximg.com.br/arquivos/ids/317111-NaN-NaN/Argamassa-de-uso-interno-para-Porcelanato-20kg-cinza-Quartzolit.jpg?v=636649224491400000'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <View style={styles.buttons}>
                        <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaArgamassa} /> 
                        <Text>{argamassa}</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaArgamassa} /> 
                    </View> 
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Brita" subtitle="Cimento Portland comum" />
                    <Card.Cover source={{ uri: 'https://cdn.leroymerlin.com.br/products/pedra_britada_0_saco_de_20kg_casa_forte__89361104_0862_600x600.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <View style={styles.buttons}>
                        <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaBrita} /> 
                        <Text>{brita}</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaBrita} /> 
                    </View>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Cal" subtitle="Argamassa Portland comum" />
                    <Card.Cover  source={{ uri: 'http://maisconectado.com/mccaltrevo/painel/imagens/1568391015-Cal_Hidratada_CH_I.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <View style={styles.buttons}>
                        <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaCal} /> 
                        <Text>{cal}</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaCal} /> 
                    </View> 
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Areia" subtitle="Cimento Portland comum" />
                    <Card.Cover source={{ uri: 'https://cdn.leroymerlin.com.br/products/areia_fina_ensacada_saco_de_20kg_casa_forte_89361090_f77c_600x600.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                <View style={styles.buttons}>
                    <IconButton icon="minus" color={Colors.red500} size={25} onPress={decrementaAreia} /> 
                    <Text>{areia}</Text>
                    <IconButton icon="plus" color={Colors.red500} size={25} onPress={incrementaAreia} /> 
                </View>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Outros" subtitle="Argamassa Portland comum" />
                    <Card.Cover  source={{ uri: 'https://www.sdmaterialdeconstrucao.com.br/img/artigo_26_20180710094908_0.jpeg'  }} resizeMode="stretch" />
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