import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import {Title, Divider, ActivityIndicator, Text, Button, DataTable } from 'react-native-paper';

import { Icon, useSignal, useEmit, useEffect, useRequest, map } from '../../lib';

import settings from '../../settings.json';

import styles from '../../styles/log/Log.json';


function ModificacaoItem(props) {
  const { navigation, modificacoes } = props;
  return (
      <>
          <View style={styles.container}>
              <DataTable.Row style={styles.row}>
                <DataTable.Cell style={styles.data} ><Text style={styles.fonte}>{modificacoes.data}</Text></DataTable.Cell>
                <DataTable.Cell style={styles.hora}><Text style={styles.fonte}>{modificacoes.hora}</Text></DataTable.Cell> 
                <DataTable.Cell style={styles.text}><Text style={styles.fonte}>{modificacoes.modificacao}</Text></DataTable.Cell>
                <DataTable.Cell  style={styles.tipo}><Text style={styles.fonte}>{modificacoes.tipo}</Text></DataTable.Cell>
              </DataTable.Row>
              </View>
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
  const emit = useEmit('updated-estoques');

  const { get, response } = useRequest(settings.url);

  useEffect(() => {
      setGetError(true);
      get('/modificacoes/list');
  }, [signal,signal1,signal2]);

  return (
      <>
      <View style={styles.title}>
        <Title>Modificações</Title>
      </View>
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
                                <Icon style={styles.None} name="table-remove"/>
                                <Text style={styles.text1}>
                                Nenhuma modificação notificada
                                </Text>
                          </View>
                      </View>
                  ) : (
                         <DataTable>
                           <View style={styles.modificacao}>
                            <Text>{response.body.length} modificações catalogadas</Text>
                            </View>
                            <DataTable.Header>
                              <DataTable.Title  style={styles.data}>Data</DataTable.Title>
                              <DataTable.Title  style={styles.hora}>Hora</DataTable.Title>
                              <DataTable.Title  style={styles.text}>Modificação</DataTable.Title>
                              <DataTable.Title  style={styles.tipo}>Tipo</DataTable.Title>
                            </DataTable.Header>
                              {map(response.body.reverse(), (modificacoes) => <ModificacaoItem navigation={navigation} modificacoes={modificacoes} />)}    
                      </DataTable>
                  )
              ) : (
                  <View style={styles.center}>
                      <Button mode="contained" onPress={emit}>
                          Tentar novamente
                      </Button>
                  </View>
              )
          )}
          </ScrollView>
      </>
  );
}