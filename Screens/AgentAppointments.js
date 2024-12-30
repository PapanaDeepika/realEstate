import React from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Avatar, Card, Title, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

 const appointments = [
  {
    id: '1',
    buyerName: 'John Doe',
    buyerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShZ75KKy6w0Rw_ExGPMO1ZcccgpjXaK-xKgQ&s',
    propertyName: 'Sunset Villa',
    location: '123 Ocean Drive, Miami, FL',
    time: '2023-05-15 14:00',
  },
  {
    id: '2',
    buyerName: 'Jane Smith',
    buyerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9jYBBnSPwSvmWF9_jx_UboSJ3uTS2FogB3Q&s',
    propertyName: 'Mountain View Cottage',
    location: '456 Pine Road, Aspen, CO',
    time: '2023-05-16 10:30',
  },
  {
    id: '3',
    buyerName: 'Robert Johnson',
    buyerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIbgmVnVKknkAjikXREPvJMGrnfQ56OsT2DA&s',
    propertyName: 'Downtown Loft',
    location: '789 Main Street, New York, NY',
    time: '2023-05-17 16:45',
  },
  {
    id: '4',
    buyerName: 'John Doe',
    buyerImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    propertyName: 'Sunset Villa',
    location: '123 Ocean Drive, Miami, FL',
    time: '2023-05-15 14:00',
  },
  {
    id: '5',
    buyerName: 'Jane Smith',
    buyerImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    propertyName: 'Mountain View Cottage',
    location: '456 Pine Road, Aspen, CO',
    time: '2023-05-16 10:30',
  },
  {
    id: '6',
    buyerName: 'Robert Johnson',
    buyerImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    propertyName: 'Downtown Loft',
    location: '789 Main Street, New York, NY',
    time: '2023-05-17 16:45',
  },
];

const AppointmentCard = ({ appointment }) => {
 

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Avatar.Image size={80} source={{ uri: appointment.buyerImage }} />
        <View style={styles.appointmentDetails}>
          <Title style={styles.buyerName}>{appointment.buyerName}</Title>
          <View style={styles.detailRow}>
            <Icon name="home" size={20} color="#000"/>
            <Paragraph style={styles.detailText}>{appointment.propertyName}</Paragraph>
          </View>
          <View style={styles.detailRow}>
            <Icon name="map-marker" size={20} color="#000" />
            <Paragraph style={styles.detailText}>{appointment.location}</Paragraph>
          </View>
          <View style={styles.detailRow}>
            <Icon name="clock-outline" size={20} color="#000" />
            <Paragraph style={styles.detailText}>{appointment.time}</Paragraph>
          </View>
        </View>
      </Card.Content>

      <View style={styles.buttonsContainer}>
        <Button mode="contained" onPress={() => console.log('Accepted')} style={[styles.button, { backgroundColor:"#2E7D32"}]}>
          Accept
        </Button>
        <Button mode="outlined" onPress={() => console.log('Rejected')} style={[styles.button,{backgroundColor:"#C62828"}]}   labelStyle={{ color: "white" }}
        >
          Reject
        </Button>
      </View>
    </Card>
  );
};

const AgentAppointments = () => {
  return (
    <ScrollView style={styles.container}>
    <View style={styles.listContainer}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AppointmentCard appointment={item} />}
        scrollEnabled={false}
      />
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentDetails: {
    flex: 1,
    marginLeft: 16,
  },
  buyerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color:"#000"
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Space out buttons evenly
    paddingBottom: 8,
    paddingTop: 8,
  },
  button: {
    width: 100, // Fixed width for buttons
    marginHorizontal: 4,
  },
});

export default AgentAppointments;
