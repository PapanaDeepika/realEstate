import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import DisplayMeetings from "./DisplayMeetings";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AgendaWeekCalendar from "./AgentWeekCalendar";
import AgentMonthCalendar from "./AgentMonthCalendar";
import i18n from "../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AgendaCalendar = () => {
  const [value, setValue] = React.useState("walk");
  const [v, setV] = React.useState(false);

  React.useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem("language");
    console.log("saved language", savedLanguage);
    // setSavedLanguage(savedLanguage);
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
            label: `${i18n.t("Today")}`,
            labelStyle:{fontFamily:"Montserrat_600SemiBold"}
          },
          {
            value: "train",
            label:  i18n.t("Week") ,
            labelStyle:{fontFamily:"Montserrat_600SemiBold"}

          },
          {
            value: "month",
            label: i18n.t("Month") ,
            labelStyle:{fontFamily:"Montserrat_600SemiBold"}

          },
        ]}
      />

      {value === "walk" && <DisplayMeetings />}
      {value === "month" && (
        <AgentMonthCalendar />

        //  ): (
        //     <>
        // <View style={{   justifyContent: 'flex-end', alignItems: 'flex-end' }} onPress={()=> setV(false)}>
        //   <View style={{ borderColor: '#4184AB', borderWidth: 1, padding: 5 , borderRadius:5, marginBottom:5}} onPress={()=> setV(false)}>
        //     <FontAwesome name="calendar-o" size={24} color="#4184AB" onPress={()=> setV(false)} />
        //   </View>
        // </View>

        //     <DisplayMeetings />
        //     </>
        //   )
      )}

      {value === "train" && <AgendaWeekCalendar />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    fontFamily:"Montserrat_500Medium",

  },

  text: {
    fontSize: 16,
    fontFamily:"Montserrat_500Medium",

    textAlign: "center",
  },
});

export default AgendaCalendar;
