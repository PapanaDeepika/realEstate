import { View, Text, Image, StyleSheet, Dimensions } from "react-native"
import CountdownTimer from "./CountdownTimer"
import PaginationDots from "./PaginationDots"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export default function DealCard({ deal, currentDate, isActive, totalDeals, currentIndex }) {
  return (
    <>
    <View style={styles.card}>
      <Image source={{ uri: deal.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.size}>{deal.size}</Text>
        <Text style={styles.location}>{deal.location}</Text>
        <Text style={styles.price}>{deal.price}</Text>
        <CountdownTimer targetDate={deal.endDate} currentDate={currentDate} />
      </View>
    </View>
          <PaginationDots total={totalDeals} active={currentIndex} />
          </>

  )
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  size: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4a4a4a",
    marginBottom: 8,
  },
})

