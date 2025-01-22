import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
 import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AgentCustomerDeals from './AgentCustomerDeals';
import AgentPropertyDeals from './AgentPropertyDeals';

const AgentNewDeals = () => {
  const [value, setValue] = React.useState('walk');  
  const [v, setV] = React.useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={{marginBottom:10}}
        buttons={[
          {
            value: 'walk',
            label: 'Customer Based Deals',
          },
          {
            value: 'train',
            label: 'Property Based Deals',
          },
         
        
        ]}
      />
 
        {value === 'walk' && <AgentCustomerDeals />}

 
        {value === 'train' && <AgentPropertyDeals />}
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 16,
 
  },
  
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AgentNewDeals;
