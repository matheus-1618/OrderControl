import styles from '../styles/Notificaoes.json';

import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { Card, Divider, ActivityIndicator, Text, Button, Paragraph,Snackbar } from 'react-native-paper';

import { Icon, useSignal, useEmit, useEffect, useRequest, map } from '../lib';

import settings from '../settings.json';

function ModificacaoItem(props) {
  const { modificacoes } = props;
  return (
      <>
          <Card style={styles.itemContainer}>
              <View style={styles.cardTitle}>
              <View style={styles.cardheader}>
              <Card.Title title={modificacoes.modificacao}  />
              <View style={styles.urgenciaIcon}>
                 
              {modificacoes.tipo == "Material" ? (
                    <Icon name="wall" size={40} color="red"/>
                  ) :  ( modificacoes.tipo == "Ferramenta" ?
                  (<Icon name="hammer" size={40} color="red"/>) : 
                  (<Icon name="barn" size={40} color="red"/>))
                  }
              </View>
              </View>
              </View>
            
              <Card.Content styles={styles.observacoes}>
              <View style={styles.chipContainer}>
              <Paragraph>Data:{modificacoes.data} {modificacoes.hora}  </Paragraph>
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

  const signal = useSignal('updated-estoques');
  const signal1 = useSignal('updated-materiais');
  const signal2 = useSignal('updated-ferramentas');

  const emit = useEmit('updated-ferramentas');

  const { get, response } = useRequest(settings.url);


  useEffect(() => {
      setGetError(true);
      get('/modificacoes/list');
  }, [signal,signal1,signal2]);

    return (
        <>
            {response.running ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                response.success ? (
                    response.body === null || response.body.length === 0 ? (
                        <View style={styles.center}>
                            <Text>
                                Nenhuma nova notificação
                            </Text>
                        </View>
                    ) : (
                        <ScrollView>
                            <SafeAreaView style={styles.container}>
                            {map(response.body, (modificacoes) => <ModificacaoItem navigation={navigation} modificacoes={modificacoes} />)}
                            </SafeAreaView>
                        </ScrollView>
                    )
                ) : (
                    <View style={styles.center}>
                        <Button mode="outlined" onPress={emit}>
                            Tentar novamente
                        </Button>
                    </View>
                )
                
            )}
            {!response.running && !response.success && (
                <Snackbar visible={getError} action={{ label: 'Ok', onPress: () => setGetError(false) }} onDismiss={() => { }}>
                    {response.body.status === 0 ? 'Não foi possível conectar ao servidor' : `ERROR ${response.body.status}: ${response.body.message}`}
                </Snackbar>
                )}
        </>
    );
}