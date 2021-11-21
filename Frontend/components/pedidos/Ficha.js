import React, { useState } from 'react';

import { ScrollView, Image, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Card, IconButton, Chip, Title,Colors, TextInput, HelperText, Button, Snackbar, Portal, Dialog, Paragraph } from 'react-native-paper';

import { AspectView, Icon, DropDown, DateTimePicker, useEmit, useEffect, useStorage, useRequest } from '../../lib';

import settings from '../../settings.json';

import styles from '../../styles/pedidos/Ficha.json';

export default function Ficha(props) {
    const { navigation, route } = props;

    const pedido = route.params;

    const [urgencia, setUrgencia] = useState(pedido ? pedido.urgencia : 'BAIXA');
    const [urgenciaError, setUrgenciaError] = useState(false);
    const [observacoes, setObservacao] = useState(pedido ? pedido.observacoes : '');
    const [observacoesError, setObservacaoError] = useState(typeof observacoes !== 'string' || !observacoes.trim());
    const [registerError, setRegisterError] = useState(false);
    const [removeError, setRemoveError] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);

    const [selected1, setSelected1] = useState(false);
    const [selected2, setSelected2] = useState(false);
    const [selected3, setSelected3] = useState(false);
    const [selected4, setSelected4] = useState(false);
    const [selected5, setSelected5] = useState(false);
    const [selected6, setSelected6] = useState(false);
    const [selected7, setSelected7] = useState(false);
    const [selected8, setSelected8] = useState(false);
    const [selected9, setSelected9] = useState(false);

    const emit = useEmit('updated-pedidos');

    const { post, put, response: registerResponse } = useRequest(settings.url);
    const { del, response: removeResponse } = useRequest(settings.url);

    function onPressSelect1() {
        if (selected1 == false){
            setSelected1(true);
        }
        else{
            setSelected1(false);
        }
    }

    function onPressSelect2() {
        if (selected2 == false){
            setSelected2(true);
        }
        else{
            setSelected2(false);
        }
    }

    function onPressSelect3() {
        if (selected3 == false){
            setSelected3(true);
        }
        else{
            setSelected3(false);
        }
    }

    function onPressSelect4() {
        if (selected4 == false){
            setSelected4(true);
        }
        else{
            setSelected4(false);
        }
    }

    function onPressSelect5() {
        if (selected5 == false){
            setSelected5(true);
        }
        else{
            setSelected5(false);
        }
    }

    function onPressSelect6() {
        if (selected6 == false){
            setSelected6(true);
        }
        else{
            setSelected6(false);
        }
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


    function onChangeTextUrgencia(text) {
        setUrgencia(text);
        setUrgenciaError(!text.trim());
    }

    function onPressRegister() {
        setRegisterError(true);
        const body = {
            urgencia: urgencia,
            observacoes: observacoes,
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
            navigation.navigate('ListaPedidos');
        } else {
            navigation.setOptions({ title: pedido ? "Pedido #"+ pedido.id : 'Novo Pedido' });
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
                    <IconButton icon="minus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                    <Text>0</Text>
                    <IconButton icon="plus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                </View>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Argamassa" subtitle="Argamassa Portland comum" />
                    <Card.Cover  source={{ uri: 'https://telhanorte.vteximg.com.br/arquivos/ids/317111-NaN-NaN/Argamassa-de-uso-interno-para-Porcelanato-20kg-cinza-Quartzolit.jpg?v=636649224491400000'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <View style={styles.buttons}>
                        <IconButton icon="minus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                        <Text>0</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                    </View> 
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Brita" subtitle="Cimento Portland comum" />
                    <Card.Cover source={{ uri: 'https://cdn.leroymerlin.com.br/products/pedra_britada_0_saco_de_20kg_casa_forte__89361104_0862_600x600.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <IconButton icon="minus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                    <View style={styles.buttons}>
                        <Text>0</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                    </View>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Cal" subtitle="Argamassa Portland comum" />
                    <Card.Cover  source={{ uri: 'http://maisconectado.com/mccaltrevo/painel/imagens/1568391015-Cal_Hidratada_CH_I.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <View style={styles.buttons}>
                        <IconButton icon="minus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                        <Text>0</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                    </View> 
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Areia" subtitle="Cimento Portland comum" />
                    <Card.Cover source={{ uri: 'https://cdn.leroymerlin.com.br/products/areia_fina_ensacada_saco_de_20kg_casa_forte_89361090_f77c_600x600.jpg'  }} resizeMode="stretch" />
                    <Card.Actions>
                <View style={styles.buttons}>
                    <IconButton icon="minus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                    <Text>0</Text>
                    <IconButton icon="plus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                </View>
                    </Card.Actions>
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Outros" subtitle="Argamassa Portland comum" />
                    <Card.Cover  source={{ uri: 'https://www.sdmaterialdeconstrucao.com.br/img/artigo_26_20180710094908_0.jpeg'  }} resizeMode="stretch" />
                    <Card.Actions>
                    <View style={styles.buttons}>
                        <IconButton icon="minus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                        <Text>0</Text>
                        <IconButton icon="plus" color={Colors.red500} size={25} onPress={() => console.log('Pressed')} /> 
                    </View> 
                    </Card.Actions>
                </Card>
                </View>

                <View style={styles.title}>
                    <Title>Ferramentas</Title>
                </View>
                <View style={styles.chip}>
                    <Chip icon="wall" style={styles.item}  selected={selected7}  onPress={onPressSelect7}>Andaime</Chip>
                    <Chip icon="bulldozer" style={styles.item} selected={selected8}  onPress={onPressSelect8}>Betoneira</Chip>
                    <Chip icon="circular-saw"  style={styles.item}   selected={selected9}  onPress={onPressSelect9}>Furadeira</Chip>
                </View>
                    <DropDown style={styles.input} label="Urgencia" list={urgencias} value={urgencia} setValue={setUrgencia} />
                    <TextInput style={styles.input} label="Observações" value={observacoes} error={observacoesError} onChangeText={onChangeTextObs} />
                    {observacoesError && (
                        <HelperText style={styles.error} type="error">
                            Coloque uma observação
                        </HelperText>
                    )}
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="outlined" disabled={registerResponse.running || removeResponse.running} loading={registerResponse.running} onPress={onPressRegister}>
                            {pedido ? 'Atualizar' : 'Solicitar Pedido'}
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