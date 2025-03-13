import React, { useState } from 'react';
import { View, Button, Image, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const cloudName = 'ddv2y93jq'; // Your Cloudinary Cloud Name

export default function ImageUploader({ onUrlsReturn }) {
  const [images, setImages] = useState([]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Allow multiple images to be selected
    });

    if (!result.canceled && result.assets.length > 0) {
      setImages(result.assets);
      uploadImages(result.assets);
    }
  };

  const uploadImages = async (imageAssets) => {
    const uploadedUrls = [];

    try {
      for (const asset of imageAssets) {
        const formData = new FormData();
        formData.append('file', {
          uri: asset.uri,
          type: 'image/jpeg',
          name: 'upload.jpg',
        });
        formData.append('upload_preset', 'sni4p6lt');

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );

        uploadedUrls.push(response.data.secure_url);
      }

      console.log('Uploaded URLs:', uploadedUrls);
      // Ensure onUrlsReturn is a valid function
      if (typeof onUrlsReturn === 'function') {
        onUrlsReturn(uploadedUrls); // Send the uploaded URLs to the parent
      } else {
        console.error('onUrlsReturn is not a function');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload failed', 'There was an error uploading your images.');
    }
  };

  return (
    <View>
      <Button title="Pick images from camera roll" onPress={pickImages} />
      
      <FlatList
        data={images}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, margin: 5 }} />
        )}
      />
    </View>
  );
}
