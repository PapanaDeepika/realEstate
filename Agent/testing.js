import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, FlatList, Alert, StyleSheet,Button, ScrollView } from "react-native"
import * as ImagePicker from "expo-image-picker"
import axios from "axios"
import { BottomSheet } from 'react-native-btr';
import { sendLocation } from "../sentLocation";

const cloudName = "ddv2y93jq" // Your Cloudinary Cloud Name
const uploadPreset = "sni4p6lt" // Your Cloudinary Upload Preset



export default function Test({setImage}){
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([])
const toggleBottomSheet = () => {
  setIsBottomSheetVisible(!isBottomSheetVisible);
};

const handleImagePick = async (mode) => {
    try {
      let result
      if (mode === "camera") {
        await ImagePicker.requestCameraPermissionsAsync()
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        })
      } else {
        await ImagePicker.requestMediaLibraryPermissionsAsync()
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          aspect: [1, 1],
          quality: 1,
        })
      }

      if (!result.canceled) {

        const assets = Array.isArray(result.assets) ? result.assets : [result.assets]
        const uploadedUrls = await Promise.all(assets.map((asset) => uploadToCloudinary(asset.uri)))
        const sending = sendLocation(uploadedUrls)

        setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls])
        setImage(sending)
    
      }
    } catch (error) {
      Alert.alert("Error picking images", error.message)
    }  
  }

  const uploadToCloudinary = async (imageUri) => {
    try {
      const formData = new FormData()
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: "upload.jpg",
      })
      formData.append("upload_preset", uploadPreset)

      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      console.log("Uploaded url:", response.data.secure_url)



      return response.data.secure_url
    } catch (error) {
      console.error("Upload error:", error)
      Alert.alert("Upload failed", "There was an error uploading your image.")
      return ""
    }
  }

  const removeImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const renderImageItem = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
      <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  )

return(
    <View style={styles.container}>
    <BottomSheet
      visible={isBottomSheetVisible}
      onBackButtonPress={toggleBottomSheet}
      onBackdropPress={toggleBottomSheet}
      snapPoints={['50%', '80%']} // Or you can use numeric values like [200, 400]
      initialSnapIndex={0}
    >
      <View style={styles.panel}>
        <View style={{alignItems:'center'}}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose your profile photo</Text>
        </View>
        <TouchableOpacity style={styles.panelButton}  
    onPress={() => handleImagePick("camera")}
       >
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton}   onPress={() => handleImagePick("gallery")}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>

    <Button title="Upload images" onPress={toggleBottomSheet} ></Button>


    <FlatList
        data={uploadedImages}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.imageList}
      />
    </View>
)

}
const styles= StyleSheet.create({
    container: {
        flex: 1,
      },
      bottomSheetContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelButtonTitle: {
        fontSize: 16, // Font size of the text
        color: '#ffffff', // White text color
       },
      panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
      },
      imageList: {
        paddingBottom: 20,
      },
      imageContainer: {
        width: "48%",
        aspectRatio: 1,
        margin: "1%",
        position: "relative",
      },
      image: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
      },
      removeButton: {
        position: "absolute",
        right: 5,
        top: 5,
        backgroundColor: "rgba(255, 0, 0, 0.7)",
        padding: 5,
        borderRadius: 3,
      },
      removeButtonText: {
        color: "white",
        fontSize: 12,
      },
})