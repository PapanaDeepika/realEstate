import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
 import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BuyerDeals from './buyerDeals';
import AgentDeals from './agentDeals';
 

const BuyerNewDeals = () => {
  const [value, setValue] = React.useState('train');  
  const [v, setV] = React.useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={{marginBottom:10}}
        buttons={[
          {
            value: 'train',
            label: 'Property Based Deals',
            labelStyle:{fontFamily:"Montserrat_600SemiBold"}

          },
         
          {
            value: 'walk',
            label: 'Agent Based Deals',
            labelStyle:{fontFamily:"Montserrat_600SemiBold"}

          },
        
        
        ]}
      />
         {value === 'train' && <BuyerDeals />}

        {value === 'walk' && <AgentDeals />}

 
      
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

export default BuyerNewDeals;
