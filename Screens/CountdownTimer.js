// import { useState, useEffect } from "react"
// import { Text, StyleSheet } from "react-native"
// import dayjs from "dayjs"

// export default function CountdownTimer({ targetDate, currentDate }) {
//   const [timeLeft, setTimeLeft] = useState("")

//   useEffect(() => {
//     const updateTimer = () => {
//       const now = dayjs(currentDate)
//       const end = dayjs(targetDate)
//       const duration = end.diff(now)

//       if (duration <= 0) {
//         setTimeLeft("Deal Ended")
//       } else {
//         const hours = Math.floor(duration / (1000 * 60 * 60))
//         const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
//         const seconds = Math.floor((duration % (1000 * 60)) / 1000)
//         setTimeLeft(`Ends in ${hours}h ${minutes}m ${seconds}s`)
//       }
//     }

//     updateTimer()
//     const timer = setInterval(updateTimer, 1000)
//     return () => clearInterval(timer)
//   }, [targetDate, currentDate])

//   return <Text style={styles.timer}>{timeLeft}</Text>
// }

// const styles = StyleSheet.create({
//   timer: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#e74c3c",
//     marginTop: 8,
//   },
// })

import { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import dayjs from "dayjs";

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateTimer = () => {
      const now = dayjs(); // Get current time dynamically
      const end = dayjs(targetDate);
      const duration = end.diff(now);

      if (duration <= 0) {
        setTimeLeft("Deal Ended");
      } else {
        const hours = Math.floor(duration / (1000 * 60 * 60));
        const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((duration % (1000 * 60)) / 1000);
        setTimeLeft(`Ends In ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateTimer(); // Run immediately
    const timer = setInterval(updateTimer, 1000); // Update every second
    return () => clearInterval(timer);
  }, [targetDate]); // Only depend on `targetDate`

  return <Text style={styles.timer}>{timeLeft}</Text>;
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 16,
     color: "#e74c3c",
     fontFamily:'Montserrat_700Bold'
    
  },
});

