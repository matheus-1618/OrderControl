import React, { useState } from 'react';

import { ScrollView, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Title, Portal, TextInput, HelperText, Dialog, Paragraph, Button, Snackbar } from 'react-native-paper';

import { useEmit, useEffect, useRequest,useGlobal } from '../../lib';

import settings from '../../settings.json';

import styles from '../../styles/estoques/Ficha.json';

export default function Ficha(props) {
    const { navigation, route } = props;

    const estoque = route.params;

    const [nome, setNome] = useState(estoque ? estoque.nome : '');
    const [nomeError, setNomeError] = useState(typeof nome !== 'string');
    const [empresa, setEmpresa] = useState(estoque ? estoque.empresa : '');
    const [empresaError, setEmpresaError] = useState(typeof empresa !== 'string');
    const [empreedimento, setEmpreedimento] = useState(estoque ? estoque.empreedimento : '');
    const [empreedimentoError, setEmpreedimentoError] = useState(typeof empreedimento !== 'string');
    const [localizacao, setLocalizacao] = useState(estoque ? estoque.localizacao : '');
    const [localizacaoError, setLocalizacaoError] = useState(typeof localizacao !== 'string');

    const [registerError, setRegisterError] = useState(false);
    const [removeError, setRemoveError] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(false);

    const [getSize, setGetSize] = useGlobal("size");

    const emit = useEmit('updated-estoques');

    const { post, put, response: registerResponse } = useRequest(settings.url);
    const { del, response: removeResponse } = useRequest(settings.url);

    function notificacao() {
        setGetSize(getSize + 1);
    }

    function nomeInvalid(nome) {
        return !nome.trim();
    }

    function empresaInvalid(empresa) {
        return !empresa.trim();
    }

    function empreedimentoInvalid(empreedimento) {
        return !empreedimento.trim();
    }

    function localizacaoInvalid(localizacao) {
        return !localizacao.trim();
    }


    function onChangeTextNome(text) {
        setNome(text);
        setNomeError(nomeInvalid(text));
    }

    function onChangeTextEmpresa(text) {
        setEmpresa(text);
        setEmpresaError(empresaInvalid(text));
    }

    function onChangeTextEmpreedimento(text) {
        setEmpreedimento(text);   
        setEmpreedimentoError(empreedimentoInvalid(text));
    }

    function onChangeTextLocalizacao(text) {
        setLocalizacao(text);
        setLocalizacaoError(localizacaoInvalid(text));
    }

    function onPressRegister() {
        if (nomeInvalid(nome) && empresaInvalid(empresa) &&
        empreedimentoInvalid(empreedimento) && localizacaoInvalid(localizacao)){
            setNomeError(nomeInvalid(nome));
            setEmpresaError(empresaInvalid(empresa));
            setEmpreedimentoError(empreedimentoInvalid(empreedimento));
            setLocalizacaoError(localizacaoInvalid(localizacao));
        }
        else if (nomeInvalid(nome)){
            setNomeError(nomeInvalid(nome));
        }
        else if (empresaInvalid(empresa)) {
            setEmpresaError(empresaInvalid(empresa));
        }
        else if (empreedimentoInvalid(empreedimento)) {
            setEmpreedimentoError(empreedimentoInvalid(empreedimento));
        }
        else if (localizacaoInvalid(localizacao)) {
            setLocalizacaoError(localizacaoInvalid(localizacao));
        }
        else {
            setRegisterError(true);
            const body = {
                nome: nome,
                empresa: empresa,
                empreedimento: empreedimento,
                localizacao: localizacao,
            };
            if (estoque) {
                const alteration = {
                    modificacao: "Alteração do Estoque ",
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Estoque",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                const notification = {
                    notificacao: "Estoque "+estoque.nome+" alterado" ,
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Estoque",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                notificacao()
                post('/modificacoes',alteration)
                post('/notificacoes',notification)
                body.key = estoque.key;
                put('/estoque', body);
            } else {
                post('/estoque', body);
                const newOne = {
                    modificacao: "Cadastro de Estoque",
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Estoque",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                const newNotification = {
                    notificacao: "Novo estoque cadastrado",
                    data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
                    tipo:"Estoque",
                    hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
                };
                notificacao()
                post('/notificacoes',newNotification)
                post('/modificacoes',newOne)
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
            modificacao: "Estoque " + estoque.nome +" excluído",
            data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
            tipo:"Estoque",
            hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
        };
        const newNotification = {
            notificacao: "Estoque " + estoque.nome +" removido",
            data: String(new Date().getDate()).padStart(2, '0') +'/'+ String(new Date().getMonth()+1).padStart(2, '0') + '/' + new Date().getFullYear(),
            tipo:"Estoque",
            hora: (String(("0" + new Date().getHours()).slice(-2))) + ':'+ String(("0" +new Date().getMinutes()).slice(-2)),
        };
        notificacao()
        post('/modificacoes',newOne)
        post('/notificacoes',newNotification)
        del(`/estoque?key=${estoque.key}`);
    }

    useEffect(() => {
        if ((registerResponse.success && registerResponse.body !== null) || (removeResponse.success && removeResponse.body !== null)) {
            emit();
            navigation.navigate('Estoques');
        } else {
            navigation.setOptions({ title: estoque ? estoque.nome : 'Novo estoque' });
        }
    }, [registerResponse, removeResponse]);

    return (
        <>
           <ScrollView>
                <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>  
                <View style={styles.title}>
                    <Title>{estoque ? estoque.nome : "Adicionar Estoque"}</Title>
                </View>
                    <TextInput style={styles.input} label="Nome do Estoque" value={nome} error={nomeError} onChangeText={onChangeTextNome} />
                    {nomeError && (
                        <HelperText style={styles.error} type="error">
                            O campo nome é obrigatório
                        </HelperText>
                    )}
                    <TextInput style={styles.input} label="Empresa" value={empresa} error={empresaError} onChangeText={onChangeTextEmpresa} />
                    {empresaError && (
                        <HelperText style={styles.error} type="error">
                            O campo empresa é obrigatório
                        </HelperText>
                    )}
                    <TextInput style={styles.input} label="Empreedimento" value={empreedimento} error={empreedimentoError} onChangeText={onChangeTextEmpreedimento} />
                    {empreedimentoError && (
                        <HelperText style={styles.error} type="error">
                            O campo empreedimento é obrigatório
                        </HelperText>
                    )}
                    <TextInput style={styles.input} label="Localização" value={localizacao} error={localizacaoError} onChangeText={onChangeTextLocalizacao} />
                    {localizacaoError && (
                        <HelperText style={styles.error} type="error">
                            O campo localização é obrigatório
                        </HelperText>
                    )}
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} mode="contained" color="#2385A2" disabled={registerResponse.running || removeResponse.running} loading={registerResponse.running} onPress={onPressRegister}>
                            {estoque ? 'Salvar' : 'Cadastrar Estoque'}
                        </Button>

                        {!estoque && (
                            <Button style={styles.button} mode="outlined" disabled={registerResponse.running || removeResponse.running} loading={removeResponse.running} onPress={() => {navigation.navigate('Estoques')}}>
                                Cancelar
                            </Button>
                        )}
                        {estoque && (
                            <Button style={styles.button} mode="outlined" disabled={registerResponse.running || removeResponse.running} loading={removeResponse.running} onPress={() => setRemoveVisible(true)}>
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
            {!removeResponse.running && !removeResponse.success && (
                <Snackbar visible={removeError} action={{ label: 'Ok', onPress: () => setRemoveError(false) }} onDismiss={() => { }}>
                    {removeResponse.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${removeResponse.body.status}: ${removeResponse.body.message}`}
                </Snackbar>
            )}
            {estoque && (
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