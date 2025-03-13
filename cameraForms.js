 

// // // import React, { useState } from 'react';
// // // import { View, Text, TouchableOpacity, Alert } from 'react-native';
// // // import { BottomSheet } from 'react-native-btr'; // Assuming you are using react-native-btr for BottomSheet
// // // import * as ImagePicker from 'expo-image-picker';
// // // import axios from 'axios';
// // // import { Image } from 'react-native';

// // // const CameraOption = ({onSelectImage}) => {
// // //   // State for managing visibility of BottomSheet and selected camera type
// // //   const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
// // //   const [cameraType, setCameraType] = useState(ImagePicker.CameraType.front); // Set initial camera type to front
// // //   const [image, setImage] = useState(null);
// // //   const [profileImage, setProfileImage] = useState(null);

// // //   // Toggles BottomSheet visibility
// // //   const toggleBottomSheet = () => {
// // //     console.log("toggle")
// // //     setBottomSheetVisible(!isBottomSheetVisible);
// // //   };
 
// // //   // Toggles between front and back camera
// // //   const toggleCameraType = () => {
// // //     setCameraType((prevCameraType) =>
// // //       prevCameraType === ImagePicker.CameraType.front
// // //         ? ImagePicker.CameraType.back
// // //         : ImagePicker.CameraType.front
// // //     );
// // //   };

// // //   // Upload image (either take a photo or pick from gallery)
// // //   const uploadImage = async (mode) => {
// // //     console.log("Mode",mode)

// // //     try {
// // //         console.log("Mode",mode)
// // //       let result = {};
// // //       if (mode === 'gallery') {
// // //         await ImagePicker.getMediaLibraryPermissionsAsync();
// // //         result = await ImagePicker.launchImageLibraryAsync({
// // //           mediaTypes: ImagePicker.MediaTypeOptions.Images,
// // //           allowsEditing: true,
// // //           aspect: [1, 1],
// // //           quality: 1,
// // //         });
// // //       } else {
// // //         await ImagePicker.requestCameraPermissionsAsync();
// // //         result = await ImagePicker.launchCameraAsync({
// // //           cameraType: cameraType, // Use dynamic camera type
// // //           allowsEditing: true,
// // //           aspect: [1, 1],
// // //           quality: 1,
// // //         });
// // //       }
// // // console.log("res",result)
// // //       if (!result.canceled) {
// // //         console.log("cancel")
// // //         await saveImage(result.assets[0].uri);

// // //         uploadToCloudinary(result.assets[0].uri);
// // //       }
// // //     } catch (error) {
// // //       alert('Error uploading image: ' + error.message);
// // //       toggleBottomSheet(); // Close the bottom sheet
// // //     }
// // //   };

// // //   // Save image locally
// // //   const saveImage = async (imageUri) => {
// // //     try {
// // //       setImage(imageUri);
// // //       console.log('Saved image URI:', imageUri);
// // //       toggleBottomSheet(); // Close the bottom sheet
// // //     } catch (error) {
// // //       console.error('Error saving image:', error);
// // //     }
// // //   };

// // //   // Upload image to Cloudinary
// // //   const cloudName = 'ddv2y93jq'; // Your Cloudinary Cloud Name
// // //   const uploadToCloudinary = async (imageUri) => {
// // //     try {
// // //         console.log("upload")
// // //       const formData = new FormData();
// // //       formData.append('file', {
// // //         uri: imageUri,
// // //         type: 'image/jpeg',
// // //         name: 'upload.jpg',
// // //       });
// // //       formData.append('upload_preset', 'sni4p6lt');

// // //       const response = await axios.post(
// // //         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
// // //         formData,
// // //         {
// // //           headers: { 'Content-Type': 'multipart/form-data' },
// // //         }
// // //       );

// // //       setProfileImage(response.data.secure_url);
// // //       onSelectImage(response.data.secure_url);
// // //       console.log('Uploaded URL:', response.data.secure_url);

// // //       // You can implement other actions such as saving the profile image URL to the user profile

// // //     } catch (error) {
// // //       console.error('Upload error:', error);
// // //       Alert.alert('Upload failed', 'There was an error uploading your image.');
// // //     }
// // //   };

// // //   return (
// // //     <View style={{ flex: 1, justifyContent: 'center' }}>

  
// // //         <TouchableOpacity
// // //         style={{
// // //           padding: 15,
// // //           backgroundColor: '#1e90ff',
// // //           marginBottom: 20,
// // //           borderRadius: 5,
// // //           alignSelf: 'center',
// // //         }}
// // //         onPress={toggleBottomSheet}
// // //       >
// // //         <Text style={{ color: '#fff', textAlign: 'center' }}> Choose Image</Text>
// // //       </TouchableOpacity>
// // //       <BottomSheet
// // //         visible={isBottomSheetVisible}
// // //         onBackButtonPress={toggleBottomSheet}
// // //         onBackdropPress={toggleBottomSheet}
// // //         snapPoints={['50%', '80%']}
// // //         initialSnapIndex={0}
// // //       >
// // //         <View style={{ padding: 20 }}>
// // //           <View style={{ alignItems: 'center' }}>
// // //             <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Upload Photo</Text>
// // //             <Text style={{ fontSize: 14, color: '#888' }}>Choose your photo</Text>
// // //           </View>

// // //           <TouchableOpacity
// // //             style={{ padding: 15, backgroundColor: '#1e90ff', marginVertical: 10, borderRadius: 5 }}
// // //             onPress={() => uploadImage()}
// // //           >
// // //             <Text style={{ color: '#fff', textAlign: 'center' }}>Take Photo</Text>
// // //           </TouchableOpacity>

// // //           <TouchableOpacity
// // //             style={{ padding: 15, backgroundColor: '#1e90ff', marginVertical: 10, borderRadius: 5 }}
// // //             onPress={() => uploadImage('gallery')}
// // //           >
// // //             <Text style={{ color: '#fff', textAlign: 'center' }}>Choose From Library1</Text>
// // //           </TouchableOpacity>

// // //           {/* Button to switch between front and back camera */}
// // //           {/* <TouchableOpacity
// // //             style={{ padding: 15, backgroundColor: '#ff6347', marginVertical: 10, borderRadius: 5 }}
// // //             onPress={toggleCameraType}
// // //           >
// // //             {/* <Text style={{ color: '#fff', textAlign: 'center' }}>
// // //               Switch to {cameraType === ImagePicker.CameraType.front ? 'Back' : 'Front'} Camera
// // //             </Text> * 
// // //           </TouchableOpacity> */}

// // //           <TouchableOpacity
// // //             style={{ padding: 15, backgroundColor: '#ccc', marginVertical: 10, borderRadius: 5 }}
// // //             onPress={toggleBottomSheet}
// // //           >
// // //             <Text style={{ textAlign: 'center' }}>Cancel</Text>
// // //           </TouchableOpacity>
// // //         </View>
// // //       </BottomSheet>

// // //       {/* Show uploaded image (for demonstration purposes) */}

// // //       <View style={{ marginBottom: 10, flex: 1 }}>
// // //             {loading ? (
// // //               <ActivityIndicator
// // //                 size="small"
// // //                 color="blue"
// // //                 style={{
// // //                   flex: 1,
// // //                   justifyContent: "center",
// // //                   alignItems: "center",
// // //                 }}
// // //               />
// // //             ) : (
// // //               <FlatList
// // //                 data={images}
// // //                 horizontal
// // //                 keyExtractor={(item, index) => index.toString()}
// // //                 renderItem={renderItem}
// // //               />
// // //             )}
// // //           </View>    
      
// // //     </View>
// // //   );
// // // };

// // // export default CameraOption;



// // import React, { useState } from 'react';
// // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, FlatList ,StyleSheet} from 'react-native';
// // import { BottomSheet } from 'react-native-btr'; // Assuming you are using react-native-btr for BottomSheet
// // import * as ImagePicker from 'expo-image-picker';
// // import axios from 'axios';
// // import { Image } from 'react-native';
// // import { useTranslation } from 'react-i18next';

// // const CameraOption = ({ onSelectImage }) => {
// //   const {t}=useTranslation()
// //   const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
// //   const [cameraType, setCameraType] = useState(ImagePicker.CameraType.front); // Set initial camera type to front
// //   const [images, setImages] = useState([]); // Store selected images
// //   const [loading, setLoading] = useState(false); // Manage loading state during upload

// //   // Toggles BottomSheet visibility
// //   const toggleBottomSheet = () => {
// //     setBottomSheetVisible(!isBottomSheetVisible);
// //   };

// //   // Upload image (either take a photo or pick from gallery)
// //   const uploadImage = async (mode) => {
// //     try {
// //       setLoading(true); // Start loading
// //       let result = {};
      
// //       if (mode === 'gallery') {
// //         // Get permission and launch gallery picker
// //         await ImagePicker.requestMediaLibraryPermissionsAsync();
// //         result = await ImagePicker.launchImageLibraryAsync({
// //           mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //           allowsEditing: true,
// //           aspect: [1, 1],
// //           quality: 1,
// //           allowsMultipleSelection: true, // Allow multiple image selection
// //         });
// //       } else {
// //         // Request camera permission and take a photo
// //         await ImagePicker.requestCameraPermissionsAsync();
// //         result = await ImagePicker.launchCameraAsync({
// //           cameraType: cameraType,
// //           allowsEditing: true,
// //           aspect: [1, 1],
// //           quality: 1,
// //         });
// //       }
// // console.log(result)
// //       if (!result.canceled && result.assets.length > 0) {
// //         // If images are selected
// //         if (result.assets && result.assets.length > 0) {
// //           const selectedImages = result.assets.map((asset) => asset.uri);
// //           setImages(selectedImages); // Set selected images to state
          
// //                uploadToCloudinary( );

// //           // Upload images
// //         //   selectedImages.forEach((imageUri) => {
// //         //     uploadToCloudinary(imageUri);
// //         //   });
// //         }
// //       }
// //     } catch (error) {
// //       alert('Error uploading image: ' + error.message);
// //       setLoading(false); // End loading on error
// //       toggleBottomSheet(); // Close the bottom sheet
// //     }
// //   };

// //   // Upload image to Cloudinary
// //   const cloudName = 'ddv2y93jq'; // Your Cloudinary Cloud Name
// //   const uploadToCloudinary = async (imageUri) => {

// //     try {
// //             uploadedUrls=[]
// //         for(let img of images)
// //         {
// //             const formData = new FormData();
// //             formData.append('file', {
// //               uri: img,
// //               type: 'image/jpeg',
// //               name: 'upload.jpg',
// //             });
// //             formData.append('upload_preset', 'sni4p6lt');
      
// //             const response = await axios.post(
// //               `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
// //               formData,
// //               {
// //                 headers: { 'Content-Type': 'multipart/form-data' },
// //               }
// //             );
      
// //           //    setImages(prev=>(...prev,response.data.secure_url))
// //             // Call the callback function with the uploaded image URL
             
// //             uploadedUrls.push(response.data.secure_url)
// //         }
// //    console.log("uploadedUrls",uploadedUrls)
// //         onSelectImage(uploadedUrls);
// //     //   console.log('Uploaded URL:', response.data.secure_url);
    
// //       setLoading(false); // End loading after upload is finished
// //     } catch (error) {
// //       console.error('Upload error:', error);
// //       Alert.alert('Upload failed', 'There was an error uploading your image.');
// //       setLoading(false); // End loading on error
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TouchableOpacity
// //         style={{
// //           padding: 10,
// //           backgroundColor: '#1e90ff',
// //           marginBottom: 20,
// //            width:350,
// //           alignSelf: 'center',
// //         }}
// //         onPress={toggleBottomSheet}
// //       >
// //         <Text style={{ color: '#fff', textAlign: 'center' }}>{i18n.t("Choose Image")}</Text>
// //       </TouchableOpacity>
      
// //       <BottomSheet
// //         visible={isBottomSheetVisible}
// //         onBackButtonPress={toggleBottomSheet}
// //         onBackdropPress={toggleBottomSheet}
// //         snapPoints={['50%', '80%']}
// //         initialSnapIndex={0}
// //       >
// //         <View style={{ padding: 20 }}>
// //           <View style={{ alignItems: 'center' }}>
// //             <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{i18n.t("Upload Photo")}</Text>
// //             <Text style={{ fontSize: 14, color: '#888' }}>{i18n.t("Choose your photo")}</Text>
// //           </View>

// //           {/* Button to take a photo */}
// //           <TouchableOpacity
// //             style={{ padding: 15, backgroundColor: '#1e90ff', marginVertical: 10, borderRadius: 5 }}
// //             onPress={() => uploadImage()}
// //           >
// //             <Text style={{ color: '#fff', textAlign: 'center' }}>{i18n.t("Take Photo")}</Text>
// //           </TouchableOpacity>

// //           {/* Button to choose from gallery */}
// //           <TouchableOpacity
// //             style={{ padding: 15, backgroundColor: '#1e90ff', marginVertical: 10, borderRadius: 5 }}
// //             onPress={() => uploadImage('gallery')}
// //           >
// //             <Text style={{ color: '#fff', textAlign: 'center' }}>{i18n.t("Choose From Library")}</Text>
// //           </TouchableOpacity>

// //           {/* Cancel button */}
// //           <TouchableOpacity
// //             style={{ padding: 15, backgroundColor: '#ccc', marginVertical: 10, borderRadius: 5 }}
// //             onPress={toggleBottomSheet}
// //           >
// //             <Text style={{ textAlign: 'center' }}>{i18n.t("Cancel")}</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </BottomSheet>

// //       {/* Loading Spinner */}
// //       {loading && (
// //         <ActivityIndicator
// //           size="large"
// //           color="blue"
// //           style={{
// //             flex: 1,
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             position: 'absolute',
// //             top: '50%',
// //             left: '50%',
// //           }}
// //         />
// //       )}

// //       {/* Show selected images */}
// //       <FlatList
// //         data={images}
// //         horizontal
// //         keyExtractor={(item, index) => index.toString()}
// //         renderItem={({ item }) => (
// //           <Image
// //             source={{ uri: item }}
// //             style={{ width: 100, height: 100, marginRight: 10 }}
// //           />
// //         )}
// //       />
// //     </View>
// //   );
// // };

// // export default CameraOption;
// // const styles = StyleSheet.create({

// // container: {
// //     flex: 1,
// //     paddingTop: 20,
// //     paddingLeft: 20,
// //     paddingRight: 20,
// //     paddingBottom: 20,
// //     justifyContent: "start",
// //     backgroundColor: "#fff",
// //   }}
// // )



// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Alert, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native';
// import { BottomSheet } from 'react-native-btr'; 
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import i18n from './i18n';
 
// const CameraOption = ({ onSelectImage }) => {
//    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
//   const [cameraType, setCameraType] = useState(ImagePicker.CameraType.front);
//   const [images, setImages] = useState([]); // Store selected images locally
//   const [loading, setLoading] = useState(false);

//   const toggleBottomSheet = () => {
//     setBottomSheetVisible(!isBottomSheetVisible);
//   };

//   useEffect(()=>{
//     loadLanguage();
//   },[])
    
//     const loadLanguage = async () => {
//       const savedLanguage = await AsyncStorage.getItem('language');
//       if (savedLanguage) {
//         i18n.locale = savedLanguage;
//       }
//     };

//   // Function to upload image (either take a photo or pick from gallery)
//   const uploadImage = async (mode) => {
//     try {
//       setLoading(true); // Start loading indicator
//       let result = {};

//       // Handle image picker based on mode (gallery or camera)
//       if (mode === 'gallery') {
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//         result = await ImagePicker.launchImageLibraryAsync({
//           mediaTypes: ImagePicker.MediaTypeOptions.Images,
//           allowsEditing: true,
//           aspect: [1, 1],
//           quality: 1,
//           allowsMultipleSelection: true, // Allow multiple selection
//         });
//       } else {
//         await ImagePicker.requestCameraPermissionsAsync();
//         result = await ImagePicker.launchCameraAsync({
//           cameraType: cameraType,
//           allowsEditing: true,
//           aspect: [1, 1],
//           quality: 1,
//         });
//       }

//       // If images are selected, handle them
//       if (!result.canceled && result.assets.length > 0) {
//         const selectedImages = result.assets.map((asset) => asset.uri);
//         setImages(selectedImages); // Set selected images to state
//         uploadToCloudinary(selectedImages); // Start uploading images to Cloudinary
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to upload image: ' + error.message);
//       setLoading(false); // End loading on error
//       toggleBottomSheet(); // Close the bottom sheet
//     }
//   };

//   // Function to upload images to Cloudinary
//   const cloudName = 'ddv2y93jq';
//   const uploadToCloudinary = async (selectedImages) => {
//     try {
//       const uploadedUrls = []; // Array to store uploaded image URLs

//       // Upload all images one by one
//       for (let img of selectedImages) {
//         const formData = new FormData();
//         formData.append('file', {
//           uri: img,
//           type: 'image/jpeg',
//           name: 'upload.jpg',
//         });
//         formData.append('upload_preset', 'sni4p6lt');

//         const response = await axios.post(
//           `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//           formData,
//           {
//             headers: { 'Content-Type': 'multipart/form-data' },
//           }
//         );

//         uploadedUrls.push(response.data.secure_url); // Add uploaded image URL to array
//       }

//       onSelectImage(uploadedUrls); // Return uploaded URLs to parent component
//       setLoading(false); // End loading after upload is finished
//     } catch (error) {
//       console.error('Upload error:', error);
//       Alert.alert('Upload failed', 'There was an error uploading your images.');
//       setLoading(false); // End loading on error
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.button}
//         onPress={toggleBottomSheet}
//       >
//         <Text style={styles.buttonText}>{i18n.t('Choose Image')}</Text>
//       </TouchableOpacity>

//       <BottomSheet
//         visible={isBottomSheetVisible}
//         onBackButtonPress={toggleBottomSheet}
//         onBackdropPress={toggleBottomSheet}
//         snapPoints={['50%', '80%']}
//         initialSnapIndex={0}
//       >
//         <View style={styles.bottomSheetContent}>
//           <View style={styles.header}>
//             <Text style={styles.title}>{i18n.t('Upload Photo')}</Text>
//             <Text style={styles.subtitle}>{i18n.t('Choose your photo')}</Text>
//           </View>

//           <TouchableOpacity
//             style={styles.optionButton}
//             onPress={() => uploadImage('camera')}
//           >
//             <Text style={styles.optionText}>{i18n.t('Take Photo')}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.optionButton}
//             onPress={() => uploadImage('gallery')}
//           >
//             <Text style={styles.optionText}>{i18n.t('Choose From Library')}</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.cancelButton}
//             onPress={toggleBottomSheet}
//           >
//             <Text style={styles.cancelText}>{i18n.t('Cancel')}</Text>
//           </TouchableOpacity>
//         </View>
//       </BottomSheet>

//       {loading && (
//         <ActivityIndicator
//           size="large"
//           color="blue"
//           style={styles.loadingIndicator}
//         />
//       )}

//       {/* Show selected images */}
//       <FlatList
//         data={images}
//         horizontal
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <Image source={{ uri: item }} style={styles.imageThumbnail} />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   button: {
//     padding: 10,
//     backgroundColor: '#1e90ff',
//     marginBottom: 20,
//     width: 350,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   bottomSheetContent: {
//     padding: 20,
//   },
//   header: {
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#888',
//   },
//   optionButton: {
//     padding: 15,
//     backgroundColor: '#1e90ff',
//     marginVertical: 10,
//     borderRadius: 5,
//   },
//   optionText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   cancelButton: {
//     padding: 15,
//     backgroundColor: '#ccc',
//     marginVertical: 10,
//     borderRadius: 5,
//   },
//   cancelText: {
//     textAlign: 'center',
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//   },
//   imageThumbnail: {
//     width: 100,
//     height: 100,
//     marginRight: 10,
//     borderRadius: 5,
//   },
// });

// export default CameraOption;




import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, FlatList, Alert, StyleSheet,Button, ScrollView } from "react-native"
import * as ImagePicker from "expo-image-picker"
import axios from "axios"
import { BottomSheet } from 'react-native-btr';
import { setImagesFromCloud } from "./PropertyForms/imagesHandling";
import { ActivityIndicator } from "react-native-paper";
 
const cloudName = "ddv2y93jq" // Your Cloudinary Cloud Name
const uploadPreset = "sni4p6lt" // Your Cloudinary Upload Preset



export default function CameraOption({onSelectImage}){
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([])

  const [loading,setLoading]=useState(false)
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
        setIsBottomSheetVisible(!isBottomSheetVisible);

        setLoading(true)

 
        
        const assets = Array.isArray(result.assets) ? result.assets : [result.assets]
        const uploadedUrls = await Promise.all(assets.map((asset) => uploadToCloudinary(asset.uri)))
        const sending = setImagesFromCloud(uploadedUrls)
        setUploadedImages((prevImages) => [...prevImages, ...uploadedUrls])
        onSelectImage(sending)
    
      }
    } catch (error) {
      Alert.alert("Error picking images", error.message)
    } finally {
      bottomSheetModalRef.current?.dismiss()
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

setLoading(false)

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


    {/* <FlatList
        data={uploadedImages}
        renderItem={renderImageItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.imageList}
      />
    </View> */}


{loading ? (
          <ActivityIndicator
            size="small"
            color="blue"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical:10,
            }}
          />):(

            <FlatList
            data={uploadedImages}
            renderItem={renderImageItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            contentContainerStyle={styles.imageList}
          />
          )}
          </View>

)

}
const styles= StyleSheet.create({
    container: {
        flex: 1,
      },bottomSheetContent: {
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