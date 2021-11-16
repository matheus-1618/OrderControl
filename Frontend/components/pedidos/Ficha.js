import React, { useState } from 'react';

import { ScrollView, Image, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, TouchableRipple, TextInput, HelperText, Button, Snackbar, Portal, Dialog, Paragraph } from 'react-native-paper';

import { AspectView, Icon, DropDown, DateTimePicker, useEmit, useEffect, useStorage, useRequest } from '../../lib';

import settings from '../../settings.json';

import styles from '../../styles/pedidos/Ficha.json';

export default function Ficha(props) {
    const { navigation, route } = props;

    const pedido = route.params;

    const [photoError, setPhotoError] = useState(false);
    const [urgencia, setUrgencia] = useState(pedido ? pedido.urgencia : 'MEDIA');
    const [urgenciaError, setUrgenciaError] = useState(false);
    const [registerError, setRegisterError] = useState(false);
    const [removeError, setRemoveError] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);

    //const emit = useEmit('updated-pedidos');

    const { pick, file } = useStorage(pedido ? pedido.foto : null);

    const { post, put, response: registerResponse } = useRequest(settings.url);
    const { del, response: removeResponse } = useRequest(settings.url);

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
            foto: file.uri,
            urgencia: urgencia,
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
        { label: 'Media', value: 'MEDIA' },
        { label: 'Baixa', value: 'BAIXA' },
    ];



    return (
        <>
            <ScrollView>
                <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
                    <AspectView style={styles.photoOuter}>
                        {file.loading ? (
                            <ActivityIndicator style={styles.photoInner} size="large" />
                        ) : (
                            <TouchableRipple style={styles.photoInner} onPress={onPressPhoto}>
                                {file.uri === null ? (
                                    <Icon name="file-image" />
                                ) : (
                                    <Image style={styles.photo} source={{ uri: file.uri }} resizeMode="stretch" />
                                )}
                            </TouchableRipple>
                        )}
                    </AspectView>
                    <DropDown style={styles.input} label="Urgencia" list={urgencias} value={urgencia} setValue={setUrgencia} />
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="outlined" disabled={registerResponse.running || removeResponse.running} loading={registerResponse.running} onPress={onPressRegister}>
                            {pedido ? 'Atualizar' : 'Cadastrar'}
                        </Button>
                        {pedido && (
                            <Button style={styles.button} mode="outlined" disabled={registerResponse.running || removeResponse.running} loading={removeResponse.running} onPress={() => setRemoveVisible(true)}>
                                Remover
                            </Button>
                        )}
                    </View>
                </SafeAreaView>
            </ScrollView>
            {!file.loading && !file.valid && (
                <Snackbar visible={photoError} action={{ label: 'Ok', onPress: () => setPhotoError(false) }} onDismiss={() => { }}>
                    Não foi possível carregar a foto.
                </Snackbar>
            )}
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