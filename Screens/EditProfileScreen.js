import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,Platform,ScrollView,ToastAndroid
} from 'react-native';
import {useTheme} from 'react-native-paper';
import { Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
 import Animated from 'react-native-reanimated';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';
import { useRef } from 'react';
import { BottomSheet } from 'react-native-btr';
import * as ImagePicker from "expo-image-picker"
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
 
function EditProfileScreen() {
 
  const [fieldUpdate,setFieldUpdate]=useState(true)
  useEffect(()=>{
    getAgentProfileData();
    },[])
  const nav= useNavigation()
  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const {colors} = useTheme();
const [profileImage, setProfileImage]= useState()
const uploadImage =async(mode)=>{

  try{
    let result ={}
  if(mode === "gallery"){
await ImagePicker.getMediaLibraryPermissionsAsync();
 result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes:ImagePicker.MediaTypeOptions.Images,
  allowsEditing:true,
  aspect:[1,1],
  quality:1,
})
  }
  else{
    await ImagePicker.requestCameraPermissionsAsync();
   result = await ImagePicker.launchCameraAsync({
      cameraType:ImagePicker.CameraType.front,
      allowsEditing:true,
      aspect:[1,1],
      quality:1
    })
  }

   
    if(!result.canceled){
await saveImage(result.assets[0].uri)
uploadToCloudinary(result.assets[0].uri)
    }
  }
  catch(error){
alert("Error uploading image:"+error.message)
//bottom sheet close
toggleBottomSheet()
  }
}

const saveImage =async(image) => {
try{
setImage(image)
console.log("IMAGEEEEEEEEEEEEE", image)
//bottom sheet close
toggleBottomSheet()
}
catch{

}
}
const cloudName = 'ddv2y93jq'; // Your Cloudinary Cloud Name

const uploadToCloudinary = async (imageUri) => {
   try {
 
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
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

    setProfileImage(response.data.secure_url)
//  setAgentData({...agentData,profilePicture:profileImage})
//     setFieldUpdate(false)

          

    console.log('Uploaded url:', response.data.secure_url);
     console.log('Uploaded :', profileImage);
     updateAgentProfile(response.data.secure_url)
    // updateAgentData()

    // Ensure onUrlsReturn is a valid function
   
  } catch (error) {
    console.error('Upload error:', error);
    Alert.alert('Upload failed', 'There was an error uploading your images.');
  }
};

const [flashMode, setFlashMode] = useState("off");
const [cameraType, setCameraType] = useState('back');
const [selectedImage, setSelectedImage] = useState(null);




const renderInner =()=>(
  <Text>Hello</Text>
)
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

const toggleBottomSheet = () => {
  setIsBottomSheetVisible(!isBottomSheetVisible);
};
const { height } = Dimensions.get('window');  // Get screen height
const [agentData, setAgentData] = useState({})
const snapPoints = [height * 0.5, height * 0.8];
const getAgentProfileData=async()=>{
  try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        console.log("No token found");
        return;
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.userId;
      console.log("USER", token)
      const response = await fetch(`http://172.17.13.106:3000/users/getprofile`
, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Fetched profile data:", data);
      setAgentData(data);
   
    } catch (error) {
      console.error("Failed to fetch profile:", error);
 
    }
}
useEffect(()=>{
getAgentProfileData();
},[])
const [updatedData,setUpdatedData] = useState({})

const showToastWithGravityAndOffset = () => {
  ToastAndroid.showWithGravityAndOffset(
    'Updated Successfully!',
    ToastAndroid.LONG,
    ToastAndroid.TOP,
    25,
    50,
  );
};


const updateAgentProfile = async(cImage) =>{

  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.log("No token found");
      return;
    }
    
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user.userId;
    console.log("USER", cImage);
    const agentData = {
      ...agentData,  
      profilePicture: cImage,  
    };
     console.log("UPDATED Deepika", agentData);
    const response = await fetch(`http://172.17.13.106:3000/users/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agentData),
    });

     if (response.ok) {
      console.log("RRESPONSE FROM BACK", response.ok)
       setProfileImage(null)
       showToastWithGravityAndOffset()

// alert("Profile updated successfully!")
 
       nav.navigate('Bottom1');  // Assuming 'Profile' is the name of the screen
    } else {
      throw new Error('Failed to update profile');
    }
  } catch (error) {
    console.error("Failed to update profile:", error);
    // Show error toast in case of failure
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Failed to update profile!',
      visibilityTime: 3000,
    });
  }

}

const updateAgentData = async () => {
  console.log("In the profile image", profileImage)

   if (profileImage) {
  console.log("In the profile image", profileImage)
    setAgentData((prevData) => ({ ...prevData,profilePicture: profileImage }));   
    console.log("UPDATED DATA in profileeeeeeeeeee", agentData);
  }
 
  
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      console.log("No token found");
      return;
    }
    
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user.userId;
    // console.log("USER", agentData);
    
    const response = await fetch(`http://172.17.13.106:3000/users/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agentData),
    });

    // If the response is successful, show a toast and navigate
    if (response.ok) {
      console.log("RRESPONSE FROM BACK", response.ok)
      // Show success toast
      setProfileImage(null)
       showToastWithGravityAndOffset()
// alert("Profile updated successfully!")
 
      // // Navigate to Profile page
      // nav.navigate('Profile');
      nav.navigate('Bottom1');  // Assuming 'Profile' is the name of the screen
    } else {
      throw new Error('Failed to update profile');
    }
  } catch (error) {
    console.error("Failed to update profile:", error);
    // Show error toast in case of failure
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Failed to update profile!',
      visibilityTime: 3000,
    });
  }
};

  return (
    <ScrollView>
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
    <TouchableOpacity style={styles.panelButton} onPress={()=>{
  uploadImage()
    }}>
      <Text style={styles.panelButtonTitle}>Take Photo</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.panelButton} onPress={()=>{
      uploadImage("gallery")
    }}>
      <Text style={styles.panelButtonTitle}>Choose From Library</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.panelButton}>
      <Text style={styles.panelButtonTitle}>Cancel</Text>
    </TouchableOpacity>
  </View>
</BottomSheet>


    <View style={{margin:20}}>
      <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={toggleBottomSheet}>
          <View style={{
            height:100,
            width:100,
            borderRadius:15,
            justifyContent:"center",
            alignItems:"center"
          }}>
            {/* <ImageBackground source={{
              uri:agentData.profilePicture
            }}
            style={{height:120,width:120}}
            imageStyle={{borderRadius:15}}>
              <View style={{flex:1,
                alignItems:'center',justifyContent:'center'
              }}>
                <Icon name="camera" size={35} color="black"
                style={{
                  opacity:0.7,
                  alignItems:'center',
                  justifyContent:'center',
                  borderWidth:1,
                  borderColor:"black",
                  borderRadius:10
                }}></Icon>
              </View>
            </ImageBackground> */}
   <ImageBackground
  source={{ uri: agentData.profilePicture }}
  style={{
    height: 120,
    width: 120,
    borderRadius: 60,  // Makes the image round
     position: 'relative', // Allows positioning of the camera icon inside it
    borderWidth: 2,       // Optional: adds a border around the image
    borderColor: 'white', // Optional: adds a white border for better separation
  }}
  imageStyle={{
    borderRadius: 60,  // Ensures the image itself is round
  }}
>
  <View
    style={{
      position: 'absolute',
      bottom: -10,  // Moves the icon slightly outside the circle
      right: -10,   // Moves the icon slightly outside the circle
      zIndex: 1,    // Ensures the icon is on top
    }}
  >
    <Icon
      name="camera-outline"
      size={30}
      color="white"
      style={{
        backgroundColor: 'black',  // Background for the icon
        borderRadius: 20,         // Rounds the icon's background
        padding: 6,               // Gives some space around the icon
        borderWidth: 2,           // Optional: adds a border around the icon
        borderColor: 'white',     // Optional: white border for the icon
        alignItems:'center',
        justifyContent:'center',
        paddingLeft:10,
        paddingTop:10
      }}
    />
  </View>
</ImageBackground>

          </View>
          </TouchableOpacity>
        
      </View>
      <View style={styles.action}>
        <FontAwesome name="user" size={20} color="#057ef0" style={{marginTop:10}}/>
        <TextInput placeholder='First Name' placeholderTextColor="#666666" 
        editable={false} value={agentData.firstName}
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>

      <View style={styles.action}>
        <FontAwesome name="user" size={20} color="#057ef0" style={{marginTop:10}}/>
        <TextInput placeholder='Last Name' placeholderTextColor="#666666" 
         value={agentData.lastName}
         editable={false} 
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>
      <View style={styles.action}>
        <FontAwesome name="envelope" size={20} color="#057ef0" style={{marginTop:10}} />
        <TextInput placeholder='Email' placeholderTextColor="#666666"
         value={agentData.email} 
         onChangeText={(value)=>{
          console.log("VALUEEE", value)
          if(value !== agentData.email){
            setFieldUpdate(false)

            setAgentData((prevData) => ({ ...prevData,email: value }));   
           }
         }}
        keyboardType='email-address'
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>
      <View style={styles.action}>
        <FontAwesome5 name="phone-alt" size={20} color="#057ef0" style={{marginTop:10}}/>
        <TextInput placeholder='Phone number' placeholderTextColor="#666666" 
         value={agentData.phoneNumber}
        keyboardType='number-pad'
        onChangeText={(value)=>{
          console.log("VALUEEE", value)
          if(value !== agentData.phoneNumber){

            setFieldUpdate(false)


            setAgentData((prevData) => ({ ...prevData, phoneNumber: value }));   
                                     console.log("phoneNumber",agentData.phoneNumber)
          }
         }}
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>
      <View style={styles.action}>
        <FontAwesome5 name="globe" size={20} color="#057ef0" style={{marginTop:10}}/>
        <TextInput placeholder='Country' placeholderTextColor="#666666" 
                 value={agentData.country}
                 onChangeText={(value)=>{
                  console.log("VALUEEE", value)
                  if(value !== agentData.country){
                    setFieldUpdate(false)

                    setAgentData((prevData) => ({   country: value }));   
                                             console.log("country",agentData.country)
                  }
                 }}
                 
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>
      <View style={styles.action}>
        <FontAwesome5 name="globe" size={20} color="#057ef0" style={{marginTop:10}}/>
        <TextInput placeholder='State' placeholderTextColor="#666666" 
                 value={agentData.state}
                 onChangeText={(value)=>{
                  console.log("VALUEEE", value)
                  if(value !== agentData.state){
                    setFieldUpdate(false)

                    setAgentData((prevData) => ({   state: value }));   
                                             console.log("district",agentData.state)
                  }
                 }}
                 
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>
      <View style={styles.action}>
        <FontAwesome5 name="globe" size={20} color="#057ef0" style={{marginTop:10}}/>
        <TextInput placeholder='District' placeholderTextColor="#666666" 
                 value={agentData.district}
                 onChangeText={(value)=>{
                  console.log("VALUEEE", value)
                  if(value !== agentData.district){
                    setFieldUpdate(false)

                    setAgentData((prevData) => ({   district: value }));   
                                             console.log("district",agentData.district)
                  }
                 }}
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>
      <View style={styles.action}>
        <FontAwesome5 name="globe" size={20} color="#057ef0" style={{marginTop:10}}/>
        <TextInput placeholder='Mandal' placeholderTextColor="#666666" 
                 value={agentData.mandal}
                 onChangeText={(value)=>{
                  console.log("VALUEEE", value)
                  if(value !== agentData.mandal){
                    setFieldUpdate(false)

                    setAgentData((prevData) => ({   mandal: value }));   
                                             console.log("mandal",agentData.mandal)
                  }
                 }}
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>
      <View style={styles.action}>
        <MaterialCommunityIcons name="map-marker-radius" size={24} color="#057ef0" style={{marginTop:10}}/>
        <TextInput placeholder='City' placeholderTextColor="#666666" 
                         value={ agentData.city}
                         onChangeText={(value)=>{
                          console.log("VALUEEE", value)
                          if(value !== agentData.city){
                            setFieldUpdate(false)

                            setAgentData((prevData) => ({   city: value }));   
                                                     console.log("CITYYYYYYYY",agentData.city)
                          }
                         }}
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>
      <View style={styles.action}>
        <MaterialCommunityIcons name="map-marker-radius" size={24} color="#057ef0" style={{marginTop:10}}/>
        <TextInput placeholder='Total Properties' placeholderTextColor="#666666" 
        editable={false}
                         value={String(agentData.totalPropertiesCount)} 
                         onChangeText={(value)=>{
                          console.log("VALUEEE", value)
                          if(value !== agentData.totalPropertiesCount){
                            setFieldUpdate(false)

                            setAgentData((prevData) => ({ totalPropertiesCount: Number(value) }));   
                                                     console.log("totalPropertiesCount",agentData.totalPropertiesCount)
                          }
                         }}
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>
      <View style={styles.action}>
        <MaterialCommunityIcons name="map-marker-radius" size={24} color="#057ef0" style={{marginTop:10}}/>
        <TextInput placeholder='Sold Properties' placeholderTextColor="#666666" 
                         value={String(agentData.soldPropertiesCount)}
                         editable={false}

                         onChangeText={(value)=>{
                          console.log("VALUEEE", value)

                          
                          if(value !== agentData.soldPropertiesCount){
                            setFieldUpdate(false)
                            setAgentData((prevData) => ({  ...prevData ,soldPropertiesCount: Number(value) }));   
                                                     console.log("soldPropertiesCount",agentData.soldPropertiesCount)
                          }
                         }}
        style={[styles.textInput,{
          color:colors.text
        }]}/>
      </View>
    
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.commandButton} onPress={()=>{
nav.goBack()
}}>
<Text style={styles.panelButtonTitle}>Cancel</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.commandButton} onPress={()=>{
 updateAgentData()
}} disabled={fieldUpdate} >
<Text style={styles.panelButtonTitle}>Save</Text>
</TouchableOpacity>
      </View>
 

 

    </View>

 </View>
 </ScrollView>
  );
};
export default EditProfileScreen
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },bottomSheetContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
 buttonContainer: {
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'flex-end', // Push buttons to the right
    gap: 10, // Add space between buttons (optional, React Native >= 0.71)
  },
  commandButton: {
    backgroundColor: '#057ef0', // Green background for the button
    paddingVertical: 12, // Vertical padding for the button
    paddingHorizontal: 10, // Horizontal padding for the button
    borderRadius: 8, // Rounded corners
    marginVertical: 10, // Vertical margin between buttons
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
    width:"22%"
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
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
 
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    color: '#05375a',
    paddingBottom: 4, // Add this
  paddingTop: 4,    // Add this
borderBottomColor:"black",
borderBottomWidth:1,
marginLeft:10
  },
});

 