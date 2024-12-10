import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  Animated,
} from 'react-native';

const CustomSlider = ({ min, max }) => {
  const [value, setValue] = useState(min);
  const translateX = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get('window').width;
  const sliderWidth = screenWidth - 40; // Adjust according to your design
  const thumbWidth = 30; // Width of the thumb
  const minTranslateX = 0; // Minimum thumb position
  const maxTranslateX = sliderWidth - thumbWidth; // Maximum thumb position

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        let newTranslateX = gestureState.dx;

        // Keep the thumb within bounds
        if (newTranslateX < minTranslateX) {
          newTranslateX = minTranslateX;
        } else if (newTranslateX > maxTranslateX) {
          newTranslateX = maxTranslateX;
        }

        translateX.setValue(newTranslateX);
        // Calculate the value based on the thumb position
        const newValue =
          Math.round(((newTranslateX / maxTranslateX) * (max - min)) + min);
        setValue(newValue);
      },
      onPanResponderRelease: (evt, gestureState) => {
        let newTranslateX = gestureState.dx;

        // Keep the thumb within bounds
        if (newTranslateX < minTranslateX) {
          newTranslateX = minTranslateX;
        } else if (newTranslateX > maxTranslateX) {
          newTranslateX = maxTranslateX;
        }

        translateX.setValue(newTranslateX);
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Value: {value}</Text>
      <View style={styles.sliderContainer}>
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX: translateX }],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>
      <Text style={styles.rangeLabel}>
        {min} - {max}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  sliderContainer: {
    width: '100%',
    height: 30,
    backgroundColor: '#ccc',
    borderRadius: 5,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    width: 30,
    height: 30,
    backgroundColor: '#6200ee',
    borderRadius: 15,
    position: 'absolute',
  },
  rangeLabel: {
    marginTop: 10,
  },
});

export default CustomSlider;
