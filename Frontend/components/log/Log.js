
// import styles from '../../styles/log/Log.json';

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Datatable from './Tabela';

export default class Log extends React.Component {
  render() {

    let datatable = [
      {
        _id: '5d406a171ed43384972f04b5',
        index: 0,
        age: 28,
        eyeColor: 'brown',
        name: {
          first: 'Myra',
          last: 'Navarro',
        },
        company: 'SUSTENZA',
        email: 'myra.navarro@sustenza.net',
      },
      {
        _id: '5d406a170db0f4b04d9a9acf',
        index: 1,
        age: 23,
        eyeColor: 'blue',
        name: {
          first: 'Harriett',
          last: 'Tanner',
        },
        company: 'VALPREAL',
        email: 'harriett.tanner@valpreal.com',
      },
      {
        _id: '5d406a17e95da8ff80a759c5',
        index: 2,
        age: 39,
        eyeColor: 'blue',
        name: {
          first: 'Vega',
          last: 'Hanson',
        },
        company: 'BEDLAM',
        email: 'vega.hanson@bedlam.tv',
      },
      {
        _id: '5d406a175505da190e6875ec',
        index: 3,
        age: 31,
        eyeColor: 'blue',
        name: {
          first: 'Rosemary',
          last: 'Fields',
        },
        company: 'QUAILCOM',
        email: 'rosemary.fields@quailcom.me',
      },
      {
        _id: '5d406a17ea96044c027f4e50',
        index: 4,
        age: 27,
        eyeColor: 'brown',
        name: {
          first: 'Dale',
          last: 'Wilkinson',
        },
        company: 'QIAO',
        email: 'dale.wilkinson@qiao.org',
      },
      {
        _id: '5d406a17c5fff1ff6653a555',
        index: 5,
        age: 25,
        eyeColor: 'blue',
        name: {
          first: 'Beatrice',
          last: 'Contreras',
        },
        company: 'ZENOLUX',
        email: 'beatrice.contreras@zenolux.us',
      },
      {
        _id: '5d406a17a199efcba25e1f26',
        index: 6,
        age: 34,
        eyeColor: 'blue',
        name: {
          first: 'Hancock',
          last: 'Wynn',
        },
        company: 'PLASMOS',
        email: 'hancock.wynn@plasmos.co.uk',
      },
      {
        _id: '5d406a17019a2a4544a4f134',
        index: 7,
        age: 40,
        eyeColor: 'blue',
        name: {
          first: 'Brown',
          last: 'Stanton',
        },
        company: 'SNACKTION',
        email: 'brown.stanton@snacktion.name',
      },
      {
        _id: '5d406a17e516dd71af8210d4',
        index: 8,
        age: 39,
        eyeColor: 'blue',
        name: {
          first: 'Barnes',
          last: 'Dunn',
        },
        company: 'PORTALINE',
        email: 'barnes.dunn@portaline.ca',
      },
      {
        _id: '5d406a17516936a025b73c33',
        index: 9,
        age: 34,
        eyeColor: 'green',
        name: {
          first: 'Blanche',
          last: 'Cherry',
        },
        company: 'ISOSWITCH',
        email: 'blanche.cherry@isoswitch.io',
      },
      {
        _id: '5d406a17527a4d2c6a7897dd',
        index: 10,
        age: 33,
        eyeColor: 'blue',
        name: {
          first: 'Gilliam',
          last: 'Farley',
        },
        company: 'AMTAS',
        email: 'gilliam.farley@amtas.biz',
      },
      {
        _id: '5d406a175ff11478c416c30b',
        index: 11,
        age: 26,
        eyeColor: 'brown',
        name: {
          first: 'Laura',
          last: 'Short',
        },
        company: 'FISHLAND',
        email: 'laura.short@fishland.info',
      },
      {
        _id: '5d406a1738181b471847339a',
        index: 12,
        age: 20,
        eyeColor: 'brown',
        name: {
          first: 'Moreno',
          last: 'Barber',
        },
        company: 'KEENGEN',
        email: 'moreno.barber@keengen.net',
      },
      {
        _id: '5d406a17a6bcae6fe3ad1735',
        index: 13,
        age: 30,
        eyeColor: 'brown',
        name: {
          first: 'Fischer',
          last: 'French',
        },
        company: 'INCUBUS',
        email: 'fischer.french@incubus.com',
      },
      {
        _id: '5d406a17600ca53e8f63f263',
        index: 14,
        age: 30,
        eyeColor: 'brown',
        name: {
          first: 'Donaldson',
          last: 'Carr',
        },
        company: 'SUNCLIPSE',
        email: 'donaldson.carr@sunclipse.tv',
      },
      {
        _id: '5d406a17530655789a27174f',
        index: 15,
        age: 35,
        eyeColor: 'green',
        name: {
          first: 'Sophia',
          last: 'Payne',
        },
        company: 'PRISMATIC',
        email: 'sophia.payne@prismatic.me',
      },
      {
        _id: '5d406a175dbc687b4c7669d8',
        index: 16,
        age: 34,
        eyeColor: 'green',
        name: {
          first: 'Simone',
          last: 'Pollard',
        },
        company: 'DIGIGEN',
        email: 'simone.pollard@digigen.org',
      },
      {
        _id: '5d406a179f35ed326a6a5567',
        index: 17,
        age: 28,
        eyeColor: 'green',
        name: {
          first: 'Yvette',
          last: 'Daugherty',
        },
        company: 'CHILLIUM',
        email: 'yvette.daugherty@chillium.us',
      },
    ];
    let page = 3;

    return (
      <View style={styles.container}>
        <Datatable
          header={[
            {
              name: 'Data',
              attr: 'email',
              sortDirection: 'descending',
            },
            {
              name: 'Modificação',
              attr: 'name.first',
             
            },
            {
              name: 'Tipo',
              attr: 'name.last',
            },
            {
              name: 'Usuário',
              attr: 'company',
              },
          ]}
          datatable={datatable}
          //page={page}
          //perPage={4}
          style={{ backgroundColor: '#fff' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#ecf0f1',
    
  },
});