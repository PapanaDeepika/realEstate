import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import dayjs from "dayjs"

export default function FutureDealNotification({ deal, onDismiss }) {
  const daysUntilStart = dayjs(deal.endDate).diff(dayjs(), "day")

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          New deal starting in {daysUntilStart} day{daysUntilStart > 1 ? "s" : ""}!
        </Text>
        <Text style={styles.subtext}>
          {deal.location} - {deal.price}
        </Text>
      </View>
      <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
        <Ionicons name="close" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
  },
  subtext: {
    fontSize: 14,
    color: "#4a4a4a",
    marginTop: 4,
  },
  dismissButton: {
    padding: 4,
  },
})

