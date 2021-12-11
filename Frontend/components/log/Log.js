import React, { useState } from 'react';

import { View, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { TouchableRipple, Title, Divider, ActivityIndicator, Text, Button, DataTable, Snackbar } from 'react-native-paper';

import { useGlobal, useSignal, useEmit, useEffect, useRequest, map } from '../../lib';

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
  const numberOfItemsPerPageList = [2, 3, 4];

  const items = [
    {
      key: 1,
      name: 'Page 1',
    },
    {
      key: 2,
      name: 'Page 2',
    },
    {
      key: 3,
      name: 'Page 3',
    },
  ];
  const { navigation } = props;

  const [getError, setGetError] = useState(false);

  const signal = useSignal('updated-estoques');
  const signal1 = useSignal('updated-materiais');
  const signal2 = useSignal('updated-ferramentas');
  const emit = useEmit('updated-estoques');

  const { get, response } = useRequest(settings.url);

  const [notificacoes, setNotificacoes] = useGlobal("size");

  useEffect(() => {
      setGetError(true);
      get('/modificacoes/list');
  }, [signal,signal1,signal2]);

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;


  useEffect(() => {
     setPage(0);
  }, [numberOfItemsPerPage]);
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
                          <Text>
                              Nenhuma alteração notificada 
                          </Text>
                      </View>
                  ) : (
                      
                         <DataTable>
                            <DataTable.Header>
                              <DataTable.Title sortDirection="ascending" style={styles.data}>Data</DataTable.Title>
                              <DataTable.Title style={styles.hora}>Hora</DataTable.Title>
                              <DataTable.Title style={styles.text}>Modificação</DataTable.Title>
                              <DataTable.Title  style={styles.tipo}>Tipo</DataTable.Title>
                            </DataTable.Header>
                  
                              {map(response.body, (modificacoes) => <ModificacaoItem navigation={navigation} modificacoes={modificacoes} />)}
                          <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(response.body.length / numberOfItemsPerPage)}
                            onPageChange={page => setPage(page)}
                            label={`${from + 1}-${Math.min((page + 1) * numberOfItemsPerPage,response.body.length)} de ${response.body.length}`}
                            showFastPaginationControls
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={numberOfItemsPerPage}
                            onItemsPerPageChange={onItemsPerPageChange}
                            selectPageDropdownLabel={'Linhas por página'}
                        />
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