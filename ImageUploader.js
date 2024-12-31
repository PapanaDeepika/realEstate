import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadToCloudinary(result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async (imageUri) => {
    setLoading(true);
    setError('');

    const cloudName = 'ddv2y93jq'; // Replace with your Cloudinary cloud name
    const uploadPreset = 'sni4p6lt'; // Replace with your upload preset

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      if (data.secure_url) {
        setCloudinaryUrl(data.secure_url);
        sendUrlToBackend(data.secure_url);
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      console.error('Error uploading to Cloudinary:', err);
      setError('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const sendUrlToBackend = async (url) => {
    try {
      const response = await fetch('YOUR_BACKEND_API_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: url }),
      });

      if (!response.ok) {
        throw new Error('Failed to send URL to backend');
      }

      console.log('URL sent to backend successfully');
    } catch (err) {
      console.error('Error sending URL to backend:', err);
      setError('Failed to send URL to backend');
    }
  };

  return (
    <View style={styles.container}>
        <Text>gdvsgdfvg</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {cloudinaryUrl && (
        <Text style={styles.urlText}>Cloudinary URL: {cloudinaryUrl}</Text>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  urlText: {
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

