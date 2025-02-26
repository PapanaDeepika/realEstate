import { useState, useEffect, useRef } from "react"
import { View, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity } from "react-native"
import dayjs from "dayjs"
import DealCard from "./DealCard"
import FutureDealNotification from "./FutureDealNotification"
import UpcomingDealsModal from "./UpcomingDealsModal"

const { width: SCREEN_WIDTH } = Dimensions.get("window")
const DEAL_CARD_WIDTH = SCREEN_WIDTH
const AUTO_SCROLL_INTERVAL = 3000 // 3 seconds

// Mock data for property deals (add more deals here)
const mockDeals = [
  {
    id: "1",
    image: "https://example.com/property1.jpg",
    size: "1500 sq ft",
    location: "New York, NY",
    price: "$500,000",
    endDate: dayjs().add(2, "hour").toDate(), // Deal ends in 2 hours
  },
  {
    id: "2",
    image: "https://example.com/property2.jpg",
    size: "2000 sq ft",
    location: "Los Angeles, CA",
    price: "$750,000",
    endDate: dayjs().add(3, "hour").toDate(), // Deal ends in 3 hours
  },
  {
    id: "3",
    image: "https://example.com/property3.jpg",
    size: "1800 sq ft",
    location: "Chicago, IL",
    price: "$600,000",
    endDate: dayjs().add(5, "hour").toDate(), // Deal ends in 5 hours
  },
  {
    id: "4",
    image: "https://example.com/property4.jpg",
    size: "2200 sq ft",
    location: "Miami, FL",
    price: "$800,000",
    endDate: dayjs().add(3, "day").toDate(), // Deal starts in 3 days
  },
  {
    id: "5",
    image: "https://example.com/property5.jpg",
    size: "1600 sq ft",
    location: "Houston, TX",
    price: "$550,000",
    endDate: dayjs().add(1, "day").toDate(), // Deal starts tomorrow
  },
  {
    id: "6",
    image: "https://example.com/property6.jpg",
    size: "2500 sq ft",
    location: "Phoenix, AZ",
    price: "$900,000",
    endDate: dayjs().add(4, "day").toDate(), // Deal starts in 4 days
  },
  {
    id: "7",
    image: "https://example.com/property1.jpg",
    size: "1500 sq ft",
    location: "New York, NY",
    price: "$500,000",
    endDate: dayjs().add(2, "hour").toDate(), // Deal ends in 2 hours
  },
  {
    id: "8",
    image: "https://example.com/property2.jpg",
    size: "2000 sq ft",
    location: "Los Angeles, CA",
    price: "$750,000",
    endDate: dayjs().add(3, "hour").toDate(), // Deal ends in 3 hours
  },
   
  
]

export default function PropertyDealsScreen() {
  const [deals, setDeals] = useState(mockDeals)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [activeDealIndex, setActiveDealIndex] = useState(0)
  const [isUpcomingDealsModalVisible, setIsUpcomingDealsModalVisible] = useState(false)
  const flatListRef = useRef(null)

  const todayDeals = deals.filter((deal) => dayjs(deal.endDate).isSame(dayjs(currentDate), "day"))

  const futureDeals = deals.filter((deal) => dayjs(deal.endDate).isAfter(dayjs(currentDate), "day"))

  useEffect(() => {
    // Update current date every minute
    const timer = setInterval(() => setCurrentDate(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Auto-scroll deals
    const scrollInterval = setInterval(() => {
      if (todayDeals.length > 1) {
        const nextIndex = (activeDealIndex + 1) % todayDeals.length
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true })
        setActiveDealIndex(nextIndex)
      }
    }, AUTO_SCROLL_INTERVAL)

    return () => clearInterval(scrollInterval)
  }, [activeDealIndex, todayDeals.length])

  const renderTodayDeal = ({ item, index }) => (
    <DealCard
      deal={item}
      currentDate={currentDate}
      isActive={index === activeDealIndex}
      totalDeals={todayDeals.length}
      currentIndex={index}
    />
  )

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const index = Math.round(scrollPosition / DEAL_CARD_WIDTH)
    setActiveDealIndex(index)
  }

  const renderFutureDeals = () => {
    if (futureDeals.length === 0) {
      return null
    } else if (futureDeals.length === 1) {
      return <FutureDealNotification deal={futureDeals[0]} onDismiss={() => dismissFutureDeal(futureDeals[0].id)} />
    } else {
      return (
        <TouchableOpacity style={styles.upcomingDealsButton} onPress={() => setIsUpcomingDealsModalVisible(true)}>
          <Text style={styles.upcomingDealsText}>Upcoming deals are here, click for more info</Text>
        </TouchableOpacity>
      )
    }
  }

  const dismissFutureDeal = (id) => {
    setDeals(deals.filter((deal) => deal.id !== id))
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={todayDeals}
        renderItem={renderTodayDeal}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        snapToInterval={DEAL_CARD_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.todayDealsContent}
      />
      {renderFutureDeals()}
      <UpcomingDealsModal
        visible={isUpcomingDealsModalVisible}
        onClose={() => setIsUpcomingDealsModalVisible(false)}
        deals={futureDeals}
        onDismiss={dismissFutureDeal}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: "#f0f0f0",
  },
  todayDealsContent: {
    paddingVertical: 16,
  },
  upcomingDealsButton: {
    backgroundColor: "#e8f5e9",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  upcomingDealsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e7d32",
  },
})

