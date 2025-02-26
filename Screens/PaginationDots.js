import { View, StyleSheet } from "react-native"

const MAX_VISIBLE_DOTS = 10

export default function PaginationDots({ total, active }) {
  const renderDots = () => {
    if (total <= MAX_VISIBLE_DOTS) {
      return [...Array(total)].map((_, index) => (
        <View key={index} style={[styles.dot, index === active ? styles.activeDot : styles.inactiveDot]} />
      ))
    } else {
      const dots = []
      for (let i = 0; i < MAX_VISIBLE_DOTS; i++) {
        if (i === 0 || i === MAX_VISIBLE_DOTS - 1) {
          dots.push(<View key={i} style={[styles.dot, i === active ? styles.activeDot : styles.inactiveDot]} />)
        } else if (i === Math.floor(MAX_VISIBLE_DOTS / 2)) {
          dots.push(
            <View key={i} style={[styles.dot, styles.inactiveDot]}>
              <View style={styles.ellipsis} />
              <View style={styles.ellipsis} />
              <View style={styles.ellipsis} />
            </View>,
          )
        } else {
          const actualIndex = i < Math.floor(MAX_VISIBLE_DOTS / 2) ? i : total - (MAX_VISIBLE_DOTS - i)
          dots.push(
            <View key={i} style={[styles.dot, actualIndex === active ? styles.activeDot : styles.inactiveDot]} />,
          )
        }
      }
      return dots
    }
  }

  return <View style={styles.container}>{renderDots()}</View>
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#2e7d32",
  },
  inactiveDot: {
    backgroundColor: "#c8e6c9",
  },
  ellipsis: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#c8e6c9",
    marginVertical: 1,
  },
})

