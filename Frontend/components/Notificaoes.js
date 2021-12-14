import styles from '../styles/Notificaoes.json';

import React, { useState } from 'react';

import { View, ScrollView,ImageBackground } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, Divider, ActivityIndicator, Text, Button, Paragraph,Snackbar,Avatar } from 'react-native-paper';

import { Icon, useSignal, useEmit, useEffect, useRequest, map } from '../lib';

import settings from '../settings.json';

function NotificacaoItem(props) {
  const { notificacoes } = props;
  return (
      <>
          <Card style={styles.itemContainer}>  
              {notificacoes.tipo == "Material" ? (
                  <Card.Title title={notificacoes.notificacao} titleStyle={styles.title} left={(props) => <Avatar.Icon {...props} icon="wall" />}  />
                  ) :  ( notificacoes.tipo == "Ferramenta" ?
                  (<Card.Title title={notificacoes.notificacao} titleStyle={styles.title} left={(props) => <Avatar.Icon {...props} icon="hammer" />}  />)
                   : 
                  (<Card.Title title={notificacoes.notificacao} titleStyle={styles.title} left={(props) => <Avatar.Icon {...props} icon="barn" />}  />))
                  }
              <Card.Content styles={styles.observacoes}>
              <View style={styles.chipContainer}>
              <Paragraph>Data: {notificacoes.data} {notificacoes.hora}  </Paragraph>
              </View>
              </Card.Content>
          </Card>
          <Divider />
      </>
  );
}

export default function Lista(props) {
  
  const { navigation } = props;

  const [getError, setGetError] = useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [removeError, setRemoveError] = useState(false);

  const signal = useSignal('updated-estoques');
  const signal1 = useSignal('updated-materiais');
  const signal2 = useSignal('updated-ferramentas');

  const emit = useEmit('updated-ferramentas');

  const { get, response } = useRequest(settings.url);
  const { del, response: removeResponse } = useRequest(settings.url);

  function onDismissRemove() {
    setRemoveVisible(false);
}

  function onConfirmRemove() {
    onDismissRemove();
    setRemoveError(true);
    del(`/notificacoes/list`);
}

  useEffect(() => {
      setGetError(true);
      get('/notificacoes/list');
  }, [signal,signal1,signal2]);

  useEffect(() => {
    if ((removeResponse.success && removeResponse.body !== null)) {
        emit();
        navigation.navigate('Notificacao');
    } 
}, [removeResponse]);

    return (
        <>
        <Button mode="contained" disabled={removeResponse.running} loading={removeResponse.running} onPress={onConfirmRemove}>
        Limpar notificações
        </Button>
        <ScrollView>
            {response.running ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                response.success ? (
                    response.body === null || response.body.length === 0 ? (
                        <View style={styles.center}>
                            <View style={styles.noNotification}>
                                <Icon style={styles.None} name="alarm-snooze"/>
                                <Text style={styles.text}>
                                    Nenhuma nova notificação
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <SafeAreaView style={styles.container}>
                            {map(response.body.reverse(), (notificacoes) => <NotificacaoItem navigation={navigation} notificacoes={notificacoes} />)}
                            </SafeAreaView>
    
                        </View>
                    )
                ) : (
                    <View style={styles.center}>
                       <View style={styles.noNotification}>
                            <Icon style={styles.None} name="close-box-multiple"/>
                            <Text style={styles.text}>
                                Ocorreu um erro inesperado
                            </Text>
                            <Button style = {styles.button} icon={"backup-restore"} mode="contained" onPress={emit}>
                                Tentar novamente
                            </Button>
                            </View>
                    </View>
                )
                
            )}
            {!response.running && !response.success && (
                <Snackbar visible={getError} action={{ label: 'Ok', onPress: () => setGetError(false) }} onDismiss={() => { }}>
                    {response.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${response.body.status}: ${response.body.message}`}
                </Snackbar>
                )}
                </ScrollView>
        </>
    );
}