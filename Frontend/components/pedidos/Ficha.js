import React, { useState } from 'react';

import { ScrollView, Image, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Chip, Title,Colors, TextInput, HelperText, Button, Snackbar, Portal, Dialog, Paragraph } from 'react-native-paper';

import { AspectView, Icon, DropDown, DateTimePicker, useEmit, useEffect, useStorage, useRequest } from '../../lib';

import settings from '../../settings.json';

import styles from '../../styles/pedidos/Ficha.json';

export default function Ficha(props) {
    const { navigation, route } = props;

    const pedido = route.params;

    const [photoError, setPhotoError] = useState(false);
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


    //const emit = useEmit('updated-pedidos');

    const { pick, file } = useStorage(pedido ? pedido.foto : null);

    const { post, put, response: registerResponse } = useRequest(settings.url);
    const { del, response: removeResponse } = useRequest(settings.url);

    function onPressSelect1() {
        setSelected1(true);
    }

    function onPressSelect2() {
        setSelected2(true);
    }

    function onPressSelect3() {
        setSelected3(true);
    }

    function onPressSelect4() {
        setSelected4(true);
    }

    function onPressSelect5() {
        setSelected5(true);
    }

    function onPressSelect6() {
        setSelected6(true);
    }

    function onPressSelect7() {
        setSelected7(true);
    }
    function onPressSelect8() {
        setSelected8(true);
    }
    function onPressSelect9() {
        setSelected9(true);
    }


    function onPressPhoto() {
        setPhotoError(true);
        pick('image/*', true);
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
            body.key = pedido.key;
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
        del(`/pedido?key=${pedido.key}`);
    }

    // useEffect(() => {
    //     if ((registerResponse.success && registerResponse.body !== null) || (removeResponse.success && removeResponse.body !== null)) {
    //         emit();
    //         navigation.navigate('ListaGatos');
    //     } else {
    //         navigation.setOptions({ title: gato ? gato.nome : 'Novo gato' });
    //     }
    // }, [registerResponse, removeResponse]);


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
                <Title>Materiais</Title>
                <View style={styles.chip}>
                    
                    <Chip icon="dump-truck"  style={styles.item} selected={selected1}   onPress={onPressSelect1}>Cimento</Chip>
                    <Chip icon="hard-hat" style={styles.item}  selected={selected2}   onPress={onPressSelect2}>Madeira</Chip>
                    <Chip icon="tower-fire" style={styles.item}  selected={selected3}  onPress={onPressSelect3}>Madeira</Chip>
                    <Chip icon="truck-fast" style={styles.item}  selected={selected4}  onPress={onPressSelect4}>Madeira</Chip>
                    <Chip icon="wrench"  style={styles.item}  selected={selected5}  onPress={onPressSelect5}>Madeira</Chip>
                    <Chip icon="pillar" style={styles.item}  selected={selected6}   onPress={onPressSelect6}>Argamassa</Chip>
                </View>

                <Title>Ferramentas</Title>
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
            </ScrollView>
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
        </>
    );
}