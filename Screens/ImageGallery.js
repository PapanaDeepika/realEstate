import React, { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
import ImageViewing from "react-native-image-viewing";

const { width } = Dimensions.get("window");

const ImageGallery = ({ images }) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
console.log("Imagesssssssssssssssssssssssssss", images)
  // Ensure all images are formatted properly
  const formattedImages = images.map((img) => (typeof img === "string" ? { uri: img } : img));

  console.log("Formatted Images:", formattedImages);

  return (
    <View style={styles.container}>
      {formattedImages.map((img, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setCurrentIndex(index); // Set the correct image index
            setVisible(true); // Open the viewer
          }}
        >
          <Image source={{ uri: img.uri }} style={styles.image} />
        </TouchableOpacity>
      ))}

      <ImageViewing
        images={formattedImages} // Ensure full list is passed
        imageIndex={currentIndex} // Start from the clicked image
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  image: {
    width: width,
    height: 250,
    resizeMode: "cover",
  },
});

export default ImageGallery;
