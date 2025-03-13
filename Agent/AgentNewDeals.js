import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AgentCustomerDeals from "./AgentCustomerDeals";
import AgentPropertyDeals from "./AgentPropertyDeals";
import i18n from "../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
 
const AgentNewDeals = () => {
  const [value, setValue] = React.useState("walk");
  const [v, setV] = React.useState(false);
//  React.useEffect(  () => {
//     loadLanguage();
//   }, []);


  useFocusEffect(
    React.useCallback(()=>{
      loadLanguage();

    },[loadLanguage])
  )
  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    console.log("saved language122",savedLanguage)

    if (savedLanguage) {
      i18n.locale = savedLanguage;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        style={{ marginBottom: 10 }}
        buttons={[
          {
            value: "walk",
            label:i18n.t("Customer Based Deals"),
            labelStyle:{fontFamily:"Montserrat_600SemiBold"}

          },
          {
            value: "train",
            label:i18n.t("Property Based Deals") ,
            labelStyle:{fontFamily:"Montserrat_600SemiBold"}

          },
        ]}
      />

      {value === "walk" && <AgentCustomerDeals />}

      {value === "train" && <AgentPropertyDeals />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  text: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default AgentNewDeals;
