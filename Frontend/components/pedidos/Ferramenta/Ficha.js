
import { View } from 'react-native';

import React, { useState } from 'react';

import { ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {  Switch,TouchableRipple, Divider, List, Text, Card, IconButton, ActivityIndicator, Title,Colors, TextInput, HelperText, Button, Snackbar, Portal, Dialog, Paragraph } from 'react-native-paper';

import {  Icon, DropDown, useGlobal, useEmit, useEffect, map, useRequest } from '../../../lib';


import settings from '../../../settings.json';

import styles from '../../../styles/pedidos/Ferramenta/Ficha.json';

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

    const [andaime, setAndaime] = useState(pedido ? pedido.ferramentas.andaime : 0);
    const [betoneira, setBetoneira] = useState(pedido ? pedido.ferramentas.betoneira : 0);
    const [bomba, setBomba] = useState(pedido ? pedido.ferramentas.bomba : 0);
    const [esmerilhadeira, setEsmerilhadeira] = useState(pedido ? pedido.ferramentas.esmerilhadeira : 0);
    const [furadeira, setFuradeira] = useState(pedido ? pedido.ferramentas.furadeira : 0);
    const [outros, setOutros] = useState(pedido ? pedido.ferramentas.outros : 0);

    const [getSize, setGetSize] = useGlobal("size");

    const [nomeFerramenta, setNomeFerramenta] = useState(pedido ? pedido.nomeFerramenta : '');
    const [nomeFerramentaError, setNomeFerramentaError] = useState(typeof nomeFerramenta !== 'string');
    const [codigoFerramenta, setCodigoFerramenta] = useState(pedido ? pedido.codigoFerramenta : "");
    const [codigoFerramentaError, setCodigoFerramentaError] = useState(typeof codigoFerramenta !== 'string');
    const [codigoNCM, setCodigoNCM] = useState(pedido ? pedido.codigoNCM : "");
    const [codigoNCMError, setCodigoNCMError] = useState(typeof codigoNCM !== 'string');
    const [codigoERP, setCodigoERP] = useState(pedido ? pedido.codigoERP : "");
    const [codigoERPError, setCodigoERPError] = useState(typeof codigoERP !== 'string');
    const [descricao, setDescricao] = useState(pedido ? pedido.descricao : '');
    const [descricaoError, setDescricaoError] = useState(typeof descricao !== 'string');

    const [estoqueKeys, setEstoqueKeys] = useState(pedido && pedido.chavesEstoques instanceof Array ? pedido.chavesEstoques : []);

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
        if (andaime==0 && betoneira ==0 && bomba ==0 &&
            esmerilhadeira==0 && furadeira==0 && outros==0){
            alert("Não é possível fazer um pedido sem solicitações");
        }
        else if (outros>0 && !nomeFerramenta.trim() && !codigoFerramenta.trim() &&
            !codigoERP.trim() && !codigoNCM.trim() && !descricao.trim()){
            setNomeFerramentaError(!nomeFerramenta.trim());
            setCodigoFerramentaError(!codigoFerramenta.trim());
            setCodigoERPError(!codigoERP.trim());
            setCodigoNCMError(!codigoNCM.trim());
            setDescricaoError(!descricao.trim());
        }
        else if ( outros>0 && !nomeFerramenta.trim()){
            setNomeFerramentaError(!nomeFerramenta.trim());
        }
        else if ( outros>0 && !codigoFerramenta.trim()){
            setCodigoFerramentaError(!codigoFerramenta.trim());
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
                ferramentas:{"andaime":andaime,"betoneira":betoneira,
                "bomba":bomba,"esmerilhadeira":esmerilhadeira,"furadeira":furadeira,"outros":outros},
                nomeFerramenta:nomeFerramenta,
                codigoFerramenta:codigoFerramenta,
                codigoNCM:codigoNCM,
                codigoERP:codigoERP,
                descricao:descricao,
                chavesEstoques: estoqueKeys,
            };
            if (pedido) {
                const alteration = {
                    modificacao: "Alteração do Pedido #" + pedido.id,
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Ferramenta",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                const notification = {
                    notificacao: "Pedido #"+ pedido.id +" foi alterado",
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Ferramenta",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                notificacao()
                post('/modificacoes',alteration)
                post('/notificacoes',notification)
                body.id = pedido.id;
                put('/ferramenta', body);
            } 
            else {
                post('/ferramenta', body);
                const newOne = {
                    modificacao: "Cadastro de Pedido",
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Ferramenta",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                const newNotification = {
                    notificacao: "Pedido de ferramenta solicitado",
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Ferramenta",
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
            tipo:"Ferramenta",
            hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
        };
        const newNotification = {
            notificacao: "Pedido #" + pedido.id +" excluído",
            data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
            tipo:"Ferramenta",
            hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
        };
        notificacao()
        post('/modificacoes',newOne)
        post('/notificacoes',newNotification)
        del(`/ferramenta?id=${pedido.id}`);
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
 
    }

    function onChangeTextNome(text) {
        setNomeFerramenta(text);
        setNomeFerramentaError(!text.trim());
    }

    function onChangeTextCodigo(text) {
        setCodigoFerramenta(text);
        setCodigoFerramentaError(!text.trim());
    }

    function onChangeTextERP(text) {
        setCodigoERP(text);
        setCodigoERPError(!text.trim());
    }

    function onChangeTextNCM(text) {
        setCodigoNCM(text);
        setCodigoNCMError(!text.trim());
    }

    function onChangeTextDescricao(text) {
        setDescricao(text);
        setDescricaoError(text.trim());
    }


    return (
        <>
            <ScrollView>
                <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>  
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
                    <TextInput style={styles.input} label="Observações" value={observacoes} onChangeText={onChangeTextObs} />
                   

                    {outros>0 && ( <TextInput style={styles.input} label="Nome da Ferramenta" value={nomeFerramenta} error={nomeFerramentaError} onChangeText={onChangeTextNome} />)}
                    {nomeFerramentaError && outros>0 && (
                        <HelperText style={styles.error} type="error">
                           Necessário o nome da Ferramenta
                        </HelperText>
                    )}
                    {outros>0 && ( <TextInput style={styles.input} label="Código da ferramenta" value={codigoFerramenta} error={codigoFerramentaError} onChangeText={onChangeTextCodigo} />)}
                    {codigoFerramentaError && outros>0 && (
                        <HelperText style={styles.error} type="error">
                            O código da Ferramenta é um número inteiro
                        </HelperText>
                    )}
                    {outros>0 && ( <TextInput style={styles.input} label="Código NCM" value={codigoNCM} error={codigoNCMError} onChangeText={onChangeTextNCM} />)}
                    {codigoNCMError && outros>0 && (
                        <HelperText style={styles.error} type="error">
                            O código NCM é um número inteiro
                        </HelperText>
                    )}
                    {outros>0 && ( <TextInput style={styles.input} label="Código ERP" value={codigoERP} error={codigoERPError} onChangeText={onChangeTextERP}/> )}
                    {codigoERPError && outros>0 && (
                        <HelperText style={styles.error} type="error">
                            O código ERP é um número inteiro
                        </HelperText>
                    )}
                    {outros>0 && ( <TextInput style={styles.input} label="Descrição da ferramenta" value={descricao} error={descricaoError} onChangeText={onChangeTextDescricao} />)}

                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="contained" color="#72bcd4" disabled={registerResponse.running || removeResponse.running} loading={registerResponse.running} onPress={onPressRegister}>
                            {pedido ? 'Salvar' : 'Solicitar Pedido'}
                        </Button>
                        {!pedido && (
                            <Button style={styles.button} mode="outlined" color="blue" disabled={registerResponse.running || removeResponse.running} loading={removeResponse.running} onPress={() => {navigation.navigate('Lista')}}>
                                Cancelar
                            </Button>
                        )}
                        {pedido && (
                            <Button style={styles.button} mode="outlined" color="blue" disabled={registerResponse.running || removeResponse.running} loading={removeResponse.running} onPress={() => setRemoveVisible(true)}>
                                Excluir
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