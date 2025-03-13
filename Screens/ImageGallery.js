import React, { useEffect, useState } from "react";
import { ImageBackground, Text } from "react-native";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import ImageViewing from "react-native-image-viewing";

const { width } = Dimensions.get("window");

const ImageGallery = ({ images,dateDif }) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
 
  console.log("Imagesssssssssssssssssssssssssss", images);
  // Ensure all images are formatted properly
  const formattedImages = images.map((img) =>
    typeof img === "string" ? { uri: img } : img
  );
 
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
          {/* <Image source={{ uri: img.uri }} style={styles.image} /> */}

          <ImageBackground source={{ uri: img?.uri }} style={styles.image}>
            <Text style={styles.imageBg}>{`Posted ${dateDif}  days ago`}</Text>
          </ImageBackground>
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
  imageBg: {
    backgroundColor: "#047f91",
    color: "#fff",
    fontFamily: "Montserrat_500Medium",

    padding: 10,
    fontSize: 16,
    // textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "48%",
  },
  image: {
    width: width,
    height: 250,
    resizeMode: "cover",
  },
});

export default ImageGallery;
