
import { View } from 'react-native';

import React, { useState } from 'react';

import { ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {  Switch,TouchableRipple, Divider, List, Text, Card, IconButton, ActivityIndicator, Title,Colors, TextInput, HelperText, Button, Snackbar, Portal, Dialog, Paragraph } from 'react-native-paper';

import {  Icon, DropDown, useGlobal, useEmit, useEffect, map, useRequest } from '../../../lib';

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

    const [getSize, setGetSize] = useGlobal("size");

    const [nomeMaterial, setNomeMaterial] = useState(pedido ? pedido.nomeMaterial : '');
    const [nomeMaterialError, setNomeMaterialError] = useState(typeof nomeMaterial !== 'string');
    const [codigoMaterial, setCodigoMaterial] = useState(pedido ? pedido.codigoMaterial : '');
    const [codigoMaterialError, setCodigoMaterialError] = useState(typeof codigoMaterial !== 'string');
    const [codigoNCM, setCodigoNCM] = useState(pedido ? pedido.codigoNCM : '');
    const [codigoNCMError, setCodigoNCMError] = useState(typeof codigoNCM !== 'string');
    const [codigoERP, setCodigoERP] = useState(pedido ? pedido.codigoERP : '');
    const [codigoERPError, setCodigoERPError] = useState(typeof codigoERP !== 'string');
    const [descricao, setDescricao] = useState(pedido ? pedido.descricao : '');
    const [descricaoError, setDescricaoError] = useState(typeof descricao !== 'string');

    const [estoqueKeys, setEstoqueKeys] = useState(pedido && pedido.chavesEstoques instanceof Array ? pedido.chavesEstoques : []);

    const emit = useEmit('updated-materiais');

    const { post, put, response: registerResponse } = useRequest(settings.url);
    const { del, response: removeResponse } = useRequest(settings.url);

    const { get: pedidoEstoqueGet, skip: pedidoEstoqueSkip, response: pedidoEstoqueResponse } = useRequest(settings.url);
    const { get: outroEstoqueGet, response: outroEstoqueResponse } = useRequest(settings.url);

    function notificacao() {
        setGetSize(getSize + 1);
    }

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

    function onChangeTextObs(text) {
        setObservacao(text);
    }

    function onChangeTextNome(text) {
        setNomeMaterial(text);
        setNomeMaterialError(!nomeMaterial.trim());
    }

    function onChangeTextCodigo(text) {
        setCodigoMaterial(text);
        setCodigoMaterialError(!codigoMaterial.trim());
    }

    function onChangeTextERP(text) {
        setCodigoERP(text);
        setCodigoERPError(!codigoERP.trim());
    }

    function onChangeTextNCM(text) {
        setCodigoNCM(text);
        setCodigoNCMError(!codigoNCM.trim());
    }

    function onChangeTextDescricao(text) {
        setDescricao(text);
        setDescricaoError(!descricao.trim());
    }

    function onPressRegister() {
        if (cimento==0 && argamassa ==0 && brita ==0 &&
            cal==0 && areia==0 && outros==0){
            alert("Não é possível fazer um pedido sem solicitações");
        }
        else if (outros>0 && !nomeMaterial.trim() && !codigoMaterial.trim() &&
        !codigoERP.trim() && !codigoNCM.trim() && !descricao.trim()){
            setNomeMaterialError(!nomeMaterial.trim());
            setCodigoMaterialError(!codigoMaterial.trim());
            setCodigoERPError(!codigoERP.trim());
            setCodigoNCMError(!codigoNCM.trim());
            setDescricaoError(!descricao.trim());
        }
        else if ( outros>0 && !nomeMaterial.trim()){
            setNomeMaterialError(!nomeMaterial.trim());
        }
        else if ( outros>0 && !codigoMaterial.trim()){
            setCodigoMaterialError(!codigoMaterial.trim());
        }
        else if ( outros>0 && !codigoERP.trim()){
            setCodigoERPError(!codigoERP.trim());
        }
        else if ( outros>0 && !codigoNCM.trim()){
            setCodigoNCMError(!codigoNCM.trim());
        }
        else if ( outros>0 && !descricao.trim()){
            setDescricaoError(!descricao.trim());
        }
        else{
            setRegisterError(true);
            const body = {
                urgencia: urgencia,
                observacoes: observacoes,
                materiais:{"cimento":cimento,"areia":areia,
                "brita":brita,"cal":cal,"argamassa":argamassa,"outros":outros},
                nomeMaterial:nomeMaterial,
                codigoMaterial:codigoMaterial,
                codigoNCM:codigoNCM,
                codigoERP:codigoERP,
                descricao:descricao,
                chavesEstoques: estoqueKeys,
            };
            
            if (pedido) {
                const alteration = {
                    modificacao: "Alteração do Pedido #" + pedido.id,
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Material",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                const notification = {
                    notificacao: "Pedido #"+ pedido.id +" foi alterado",
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Material",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                notificacao()
                post('/modificacoes',alteration)
                post('/notificacoes',notification)
                body.id = pedido.id;
                put('/material', body);
            } else {
                post('/material', body);
                const newOne = {
                    modificacao: "Cadastro de Pedido",
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Material",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                const newNotification = {
                    notificacao: "Pedido de material solicitado",
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Material",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                notificacao()
                post('/modificacoes',newOne)
                post('/notificacoes',newNotification)
            }
        }
    }

    function onDismissRemove() {
        setRemoveVisible(false);
    }

    function onConfirmRemove() {
        onDismissRemove();
        setRemoveError(true);
        const newOne = {
            modificacao: "Pedido #" + pedido.id +" excluído",
            data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
            tipo:"Material",
            hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
        };
        const newNotification = {
            notificacao: "Pedido #" + pedido.id +" excluído",
            data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
            tipo:"Material",
            hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
        };
        notificacao()
        post('/modificacoes',newOne)
        post('/notificacoes',newNotification)
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
                                                            <Paragraph>Todos os estoques cadastrados já receberam a solicitação.</Paragraph>
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
                    <TextInput style={styles.input} label="Observações" value={observacoes} onChangeText={onChangeTextObs} />

                    {outros>0 && ( <TextInput style={styles.input} label="Nome do material"  value={nomeMaterial} error={nomeMaterialError} onChangeText={onChangeTextNome}/>)}
                    {nomeMaterialError && outros>0 && (
                        <HelperText style={styles.error} type="error">
                           Necessário o nome do Material
                        </HelperText>
                    )}
                    {outros>0 && ( <TextInput style={styles.input} label="Código do material"  value={codigoMaterial} error={codigoMaterialError} onChangeText={onChangeTextCodigo} />)}
                    {codigoMaterialError && outros>0 && (
                        <HelperText style={styles.error} type="error">
                            O código do Material é um número inteiro
                        </HelperText>
                    )}
                    {outros>0 && ( <TextInput style={styles.input} label="Código NCM"  value={codigoNCM} error={codigoNCMError} onChangeText={onChangeTextNCM} />)}
                    {codigoNCMError && outros>0 && (
                        <HelperText style={styles.error} type="error">
                            O código NCM é um número inteiro
                        </HelperText>
                    )}
                    {outros>0 && ( <TextInput style={styles.input} label="Código ERP"  value={codigoERP} error={codigoERPError} onChangeText={onChangeTextERP}/>)}
                    {codigoERPError && outros>0 && (
                        <HelperText style={styles.error} type="error">
                            O código ERP é um número inteiro
                        </HelperText>
                    )}
                    {outros>0 && ( <TextInput style={styles.input} label="Descrição do material"  value={descricao} error={descricaoError} onChangeText={onChangeTextDescricao}/>)}
                    {descricaoError && outros>0 && (
                        <HelperText style={styles.error} type="error">
                            O campo descrição é necessário
                        </HelperText>
                    )}

                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="contained" color="#72bcd4" disabled={registerResponse.running || removeResponse.running} loading={registerResponse.running} onPress={onPressRegister}>
                            {pedido ? 'Modificar' : 'Solicitar Pedido'}
                        </Button>
                        {pedido && (
                            <Button style={styles.button} mode="outlined" disabled={registerResponse.running || removeResponse.running} loading={removeResponse.running} onPress={() => setRemoveVisible(true)}>
                                Excluir
                            </Button>
                        )}
                         {!pedido && (
                            <Button style={styles.button} mode="outlined" color="blue" disabled={registerResponse.running || removeResponse.running} loading={removeResponse.running} onPress={() => {navigation.navigate('Lista')}}>
                                Cancelar
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
