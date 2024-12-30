import React from 'react'
import { FlatList, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity, View, Text, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const { width, height } = Dimensions.get('window')// Import FontAwesome for icons

function Appointments({ data }) {
    return (
    <SafeAreaView style={styles.container}>

    <View style={styles.appointmentsContainer}>
    <FlatList
    data={data}
    numColumns={2}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
    <TouchableOpacity style={styles.appointments}>
    <View style={styles.row}>
    <Icon name="user" size={20} color="#0d416b" style={styles.icon} />
    <Text
    style={styles.name}
    numberOfLines={1}
    ellipsizeMode="tail"
    >
    {item.name}
    </Text>
    </View>
    
    <View style={styles.row}>
    <Icon name="clock-o" size={18} color="#0d416b" style={styles.icon} />
    <Text style={styles.text}>
    {item.time}
    </Text>
    </View>
    
    <View style={styles.row}>
    <Icon name="map-marker" size={20} color="#0d416b" style={styles.icon} />
    <Text style={styles.text}>
    {item.location}
    </Text>
    </View>
    </TouchableOpacity>
    )}
    contentContainerStyle={styles.flatListContent}
    />
    </View>
    </SafeAreaView>
    )
    }
    
    export default Appointments
    
    const styles = StyleSheet.create({

    header: {
    padding: 16,
    backgroundColor: '#ffffff',
    },
    headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    },
    appointmentsContainer: {
   
    paddingHorizontal: 5,
    },

    appointments: {
    width: 170,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e6eaeb',
    padding: 10,
    margin: 5,
    elevation:4
    },
    row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    },
    icon: {
    marginRight: 10,
    },
    name: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    },
    text: {
    fontSize: 16,
    fontWeight: '500',
    color: "black",
    },
    })