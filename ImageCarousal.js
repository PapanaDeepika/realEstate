import React, { useState, useRef } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const imageWidth = (width - 40) / 3; // 40 is the total horizontal padding

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const renderItem = ({ item }) => (
    <Image
      source={{ uri: item }}
      style={styles.image}
      resizeMode="cover"
    />
  );

  const handlePrevious = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 3, animated: true });
      setCurrentIndex(currentIndex - 3);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 3) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 3, animated: true });
      setCurrentIndex(currentIndex + 3);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton} onPress={handlePrevious}>
        <Icon name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={imageWidth * 3}
        decelerationRate="fast"
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / (imageWidth * 3));
          setCurrentIndex(newIndex * 3);
        }}
      />
      <TouchableOpacity style={styles.navButton} onPress={handleNext}>
        <Icon name="chevron-forward" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
 
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    marginHorizontal: 1,
  },
   
});

export default ImageCarousel;