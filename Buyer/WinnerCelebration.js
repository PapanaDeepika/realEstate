import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const WinnerCelebration = ({ isWinner, winnerName, propertyName, propertyImage, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isWinner) {
      setShowModal(true);
    }
  }, [isWinner]);

  return (
    <Modal visible={showModal} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Confetti Explosion */}
          <ConfettiCannon count={100} origin={{ x: 200, y: 0 }} />

          <Text style={styles.congratsText}>🎉 Congratulations 🎉</Text>
          <Text style={styles.congratsText}>{winnerName}</Text>

          <Text style={styles.propertyText}>You won the auction for:</Text>

          {/* Property Image */}
          <Image source={{ uri: propertyImage }} style={styles.image} />

          {/* Property Name */}
          <Text style={styles.propertyName}>{propertyName}</Text>

          {/* Close Button */}
          <TouchableOpacity style={styles.button} onPress={() => { 
            setShowModal(false); 
            if (onClose) onClose();
          }}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  congratsText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6600',
    textAlign: 'center',
    marginBottom: 10,
  },
  propertyText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WinnerCelebration;
