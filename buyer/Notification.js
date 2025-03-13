import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';

const NotificationBuyer = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const navigation=useNavigation()
  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error('Token not found');
        return;
      }

      const response = await fetch('https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/activity/getNotifications', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error('Failed to fetch notifications:', response.status);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const removeNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.notificationId !== notificationId)
    );
  };

  const renderRightActions = (notificationId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => removeNotification(notificationId)}
    >
      <Ionicons name="trash" size={24} color="#fff" />
    </TouchableOpacity>
  );
const navigate=(item)=>{
  console.log("sada",item)
  if(item.notifyType==="Customer")
  {
    navigation.navigate("BuyersProperties")
  }
  else if(item.notifyType==="Deal")
  {
    navigation.navigate("deal")
  }
 
  // setExpandedId(isExpanded ? null : item.notificationId)

}

  const renderItem = ({ item }) => {
    const isExpanded = expandedId === item.notificationId;

    return (
      <Swipeable
        renderRightActions={() => renderRightActions(item.notificationId)}
      >
        <TouchableOpacity
          onPress={() =>
            navigate(item)
           }
          style={[
            styles.notificationCard,
            isExpanded && styles.expandedNotification,
          ]}
        >
          <Image
            source={{ uri: item.profilePicture }}
            style={styles.profilePicture}
          />
          <View style={styles.notificationContent}>
            <Text style={styles.senderName}>{item.senderName}</Text>
            <Text
              style={[
                styles.message,
                isExpanded ? styles.expandedText : styles.collapsedText,
              ]}
              numberOfLines={isExpanded ? undefined : 1}
            >
              {item.message}
            </Text>
          </View>
          <Ionicons name="notifications" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </Swipeable>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
    >
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.notificationId}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default NotificationBuyer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 3,
  },
  expandedNotification: {
    backgroundColor: '#f0f8ff',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  expandedText: {
    color: '#000',
  },
  collapsedText: {
    color: '#555',
  },
  deleteButton: {
    backgroundColor: '#ff5252',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
    borderRadius: 10,
    marginVertical: 5,
  },
});
