import { Modal, View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import dayjs from "dayjs"

export default function UpcomingDealsModal({ visible, onClose, deals, onDismiss }) {
  const renderDeal = ({ item }) => (
    <View style={styles.dealItem}>
      <View>
        <Text style={styles.dealLocation}>{item.location}</Text>
        <Text style={styles.dealPrice}>{item.price}</Text>
        <Text style={styles.dealDate}>Starts in {dayjs(item.endDate).diff(dayjs(), "day")} days</Text>
      </View>
      <TouchableOpacity onPress={() => onDismiss(item.id)}>
        <Ionicons name="close" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  )

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Upcoming Deals</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={deals}
            renderItem={renderDeal}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.dealsList}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 40,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dealsList: {
    paddingBottom: 20,
  },
  dealItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  dealLocation: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dealPrice: {
    fontSize: 14,
    color: "#4a4a4a",
  },
  dealDate: {
    fontSize: 14,
    color: "#666",
  },
})

