
import { View } from 'react-native';

import React, { useState } from 'react';

import { ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {  Switch,TouchableRipple, Divider, List, Text, Card, IconButton, ActivityIndicator, Title,Colors, TextInput, HelperText, Button, Snackbar, Portal, Dialog, Paragraph } from 'react-native-paper';

import {  Icon, DropDown, DateTimePicker, useEmit, useEffect, map, useRequest } from '../../../lib';

import settings from '../../../settings.json';

import styles from '../../../styles/pedidos/Material/Ficha.json';


function EstoqueItem(props) {
    const estoque = props.estoque;
    return (
        <>
            <TouchableRipple style={styles.estoqueItem} onPress={() => props.onPress(estoque)}>
                <Text>{estoque.nome}</Text>
            </TouchableRipple>
            <Divider />
        </>
    );
}

export default function Ficha(props) {
    const { navigation, route } = props;

    const pedido = route.params;

    const [urgencia, setUrgencia] = useState(pedido ? pedido.urgencia : false);
    const [observacoes, setObservacao] = useState(pedido ? pedido.observacoes : '');
    const [observacoesError, setObservacaoError] = useState(typeof observacoes !== 'string' || !observacoes.trim());
    const [registerError, setRegisterError] = useState(false);
    const [removeError, setRemoveError] = useState(false);
    const [addVisible, setAddVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);

    const [cimento, setCimento] = useState(pedido ? pedido.materiais.cimento : 0);
    const [argamassa, setArgamassa] = useState(pedido ? pedido.materiais.argamassa : 0);
    const [brita, setBrita] = useState(pedido ? pedido.materiais.brita : 0);
    const [cal, setCal] = useState(pedido ? pedido.materiais.cal : 0);
    const [areia, setAreia] = useState(pedido ? pedido.materiais.areia : 0);
    const [outros, setOutros] = useState(pedido ? pedido.materiais.outros : 0);

    const [estoqueKeys, setEstoqueKeys] = useState(pedido && pedido.chavesEstoques instanceof Array ? pedido.chavesEstoques : []);

    const emit = useEmit('updated-materiais');

    const { post, put, response: registerResponse } = useRequest(settings.url);
    const { del, response: removeResponse } = useRequest(settings.url);

    const { get: pedidoEstoqueGet, skip: pedidoEstoqueSkip, response: pedidoEstoqueResponse } = useRequest(settings.url);
    const { get: outroEstoqueGet, response: outroEstoqueResponse } = useRequest(settings.url);

    function getPedidoEstoque() {
        if (estoqueKeys.length === 0) {
            pedidoEstoqueSkip([]);
        } else {
            pedidoEstoqueGet(`/estoque/list?keys=${estoqueKeys.join(',')}`);
        }
    }

    function getOutroEstoque() {
        if (estoqueKeys.length === 0) {
            outroEstoqueGet('/estoque/list');
        } else {
            outroEstoqueGet(`/estoque/list?other=true&keys=${estoqueKeys.join(',')}`);
        }
    }

    function onPressAddEstoque() {
        getOutroEstoque();
        setAddVisible(true);
    }

    function onDismissAddEstoque() {
        setAddVisible(false);
    }

    function onConfirmAddEstoque(estoque) {
        onDismissAddEstoque();
        setEstoqueKeys([...estoqueKeys, estoque.key]);
        pedidoEstoqueSkip([...pedidoEstoqueResponse.body, estoque]);
    }

    function onPressRemoveEstoque(estoque) {
        setEstoqueKeys(estoqueKeys.filter((x) => x !== estoque.key));
        pedidoEstoqueSkip(pedidoEstoqueResponse.body.filter((x) => x !== estoque));
    }

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

    function onPressRegister() {
        setRegisterError(true);
        const body = {
            urgencia: urgencia,
            observacoes: observacoes,
            materiais:{"cimento":cimento,"areia":areia,
            "brita":brita,"cal":cal,"argamassa":argamassa,"outros":outros},
            chavesEstoques: estoqueKeys,
        };
        
        if (pedido) {
            const alteration = {
                modificacao: "Alteração do Pedido #" + pedido.id,
                data: "29/11/2021 14:58",
                tipo:"Material",
                usuario: "Funcionario",
            };
            post('/modificacoes',alteration)
            body.id = pedido.id;
            put('/material', body);
        } else {
            post('/material', body);
            const newOne = {
                modificacao: "Cadastro de Pedido",
                data: "29/11/2021 14:58",
                tipo:"Material",
                usuario: "Funcionario",
            };
            post('/modificacoes',newOne)
        }
    }

    function onDismissRemove() {
        setRemoveVisible(false);
    }

    function onConfirmRemove() {
        onDismissRemove();
        setRemoveError(true);
        del(`/material?id=${pedido.id}`);
    }

    const onToggleSwitch = () => setUrgencia(!urgencia);

    useEffect(() => {
        if ((registerResponse.success && registerResponse.body !== null) || (removeResponse.success && removeResponse.body !== null)) {
            emit();
            navigation.navigate('Lista');
        } else {
            navigation.setOptions({ title: pedido ? "Pedido #"+ pedido.id : 'Novo pedido' });
        }
    }, [registerResponse, removeResponse]);

    useEffect(() => {
        getPedidoEstoque();
    }, []);


    function onChangeTextObs(text) {
        setObservacao(text);
        setObservacaoError(!text.trim());
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>  
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
                <List.Accordion style={styles.list} title="Estoques" left={props => <List.Icon {...props} icon="barn" />}>
                            {pedidoEstoqueResponse.running ? (
                                <ActivityIndicator style={styles.listIndicator} size="small" />
                            ) : (
                                <>
                                    {pedidoEstoqueResponse.success ? (
                                        <>
                                            {pedidoEstoqueResponse.body !== null && (
                                                map(pedidoEstoqueResponse.body, (estoque) => <List.Item style={styles.listItem} title={estoque.nome} right={(props) => <TouchableRipple onPress={() => onPressRemoveEstoque(estoque)}><List.Icon {...props} style={styles.listIcon} icon="minus-circle-outline" /></TouchableRipple>} />)
                                            )}
                                            <IconButton style={styles.listButton} icon="plus-circle-outline" onPress={onPressAddEstoque} />
                                        </>
                                    ) : (
                                        <List.Item style={styles.listItem} title="Tentar novamente" onPress={getPedidoEstoque} right={(props) => <List.Icon {...props} style={styles.listIcon} icon="refresh" />} />
                                    )}
                                    <Portal>
                                        <Dialog visible={addVisible} onDismiss={onDismissAddEstoque}>
                                            <Dialog.Title>
                                                Adicionar estoque
                                            </Dialog.Title>
                                            <Dialog.Content>
                                                {outroEstoqueResponse.running ? (
                                                    <ActivityIndicator style={styles.photoContainer} size="large" />
                                                ) : (
                                                    outroEstoqueResponse.success ? (
                                                        outroEstoqueResponse.body !== null && outroEstoqueResponse.body.length > 0 ? (
                                                            <>
                                                                <Divider />
                                                                {map(outroEstoqueResponse.body, (estoque) => <EstoqueItem estoque={estoque} onPress={onConfirmAddEstoque} />)}
                                                            </>
                                                        ) : (
                                                            <Paragraph>Todos os estoques cadastraods já receberam a solicitação.</Paragraph>
                                                        )
                                                    ) : (
                                                        <Paragraph>Não foi possível conectar ao servidor.</Paragraph>
                                                    )
                                                )}
                                            </Dialog.Content>
                                            <Dialog.Actions>
                                                <Button onPress={onDismissAddEstoque}>
                                                    Fechar
                                                </Button>
                                            </Dialog.Actions>
                                        </Dialog>
                                    </Portal>
                                </>
                            )}
                        </List.Accordion>
                        
                    
                    <View style={styles.switchContainer}>
                        <View style={styles.urgenciaLine}>
                            <Icon name="alarm-light" style={styles.urgenciaIcon} color={urgencia==true ? "red" : "grey"}/>
                            <Text style={styles.text}>Urgência</Text>
                        </View>
                        <Switch style={styles.switch} value={urgencia} onValueChange={onToggleSwitch} color="red"/>
                    </View>
                    <TextInput style={styles.input} label="Observações" value={observacoes} error={observacoesError} onChangeText={onChangeTextObs} />
                    {observacoesError && (
                        <HelperText style={styles.error} type="error">
                            Adicione uma observação
                        </HelperText>
                    )}

                    {outros>0 && ( <TextInput style={styles.input} label="Nome do material" />)}
                    {outros>0 && ( <TextInput style={styles.input} label="Código do produto" />)}
                    {outros>0 && ( <TextInput style={styles.input} label="Código NCM" />)}
                    {outros>0 && ( <TextInput style={styles.input} label="Código ERP" />)}
                    {outros>0 && ( <TextInput style={styles.input} label="Descrição do material" />)}

                       

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

            {!pedidoEstoqueResponse.running && !pedidoEstoqueResponse.success && (
                <Snackbar visible={registerError} action={{ label: 'Ok', onPress: () => setRegisterError(false) }} onDismiss={() => { }}>
                    {pedidoEstoqueResponse.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${pedidoEstoqueResponse.body.status}: ${pedidoEstoqueResponse.body.message}`}
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
