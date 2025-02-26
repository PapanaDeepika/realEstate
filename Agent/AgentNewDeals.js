import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
 import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AgentCustomerDeals from './AgentCustomerDeals';
import AgentPropertyDeals from './AgentPropertyDeals';
import { LanguageContext } from '../LanguageContext';
import i18n from '../i18n';
import { useFocusEffect } from '@react-navigation/native';


const AgentNewDeals = () => {
  const [value, setValue] = React.useState('walk');  
  const [v, setV] = React.useState(false)
  const { isTelugu, toggleLanguage } = React.useContext(LanguageContext);

    useFocusEffect(
      React.useCallback(() => {
        i18n.locale = isTelugu ? 'te' : 'en'; // Update locale dynamically
        console.log("Here", isTelugu, i18n.locale)
  
       }, [isTelugu])
    );
  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={{marginBottom:10}}
        buttons={[
          {
            value: 'walk',
            label: 'Customers Based Deals',
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
