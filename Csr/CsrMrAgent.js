import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "@expo/vector-icons/Feather";
import { counter } from "@fortawesome/fontawesome-svg-core";
import * as ImagePicker from "expo-image-picker";
import axios, { Axios } from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function CsrMrAgent() {
  const [agentsData, setAgentsData] = useState([]);

  const [addAgent, setAddAgent] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const cloudName = "ddv2y93jq"; // Your Cloudinary Cloud Name

  const [phoneNumber, setPhoneNumber] = useState("");

  const [pincode, setPincode] = useState("");

  const [country, setCountry] = useState("India");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [mandal, setMandal] = useState("");
  const [state, setState] = useState("Andhra Pradesh");

  const [assignMandal, setAssignMandal] = useState("");
  const [assignDist, setAssignDist] = useState("");

  const [images, setImages] = useState([]);
  const [proof, setProof] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [mrName, setMrName] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchMrAgents();
  }, []);

  const fetchMrAgents = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      setLoading(true);

      const response = await fetch(
        `https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/getMAgent`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error(`Error fetching agents: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("response.data", data);
      setAgentsData(data.data);
      setFilteredData(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Allow multiple images to be selected
    });

    if (!result.canceled && result.assets.length > 0) {
      //   setProof(result.assets);
      uploadImages(result.assets);
    }
  };

  const uploadImages = async (imageAssets) => {
    const uploadedUrls = [];

    try {
      for (const asset of imageAssets) {
        const formData = new FormData();
        formData.append("file", {
          uri: asset.uri,
          type: "image/jpeg",
          name: "upload.jpg",
        });
        formData.append("upload_preset", "sni4p6lt");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        uploadedUrls.push(response.data.secure_url);
        setProof(uploadedUrls);
      }
      console.log("Uploaded URLs:", uploadedUrls);
      console.log("Uploaded :", selectedImages);

      // Ensure onUrlsReturn is a valid function
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload failed", "There was an error uploading your images.");
    }
  };

  const pickImages1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true, // Allow multiple images to be selected
    });

    if (!result.canceled && result.assets.length > 0) {
      //   setProof(result.assets);
      uploadImages1(result.assets);
    }
  };

  const handleClose = async () => {
    console.log("close");
    setAddAgent(false);
  };

  const handleMrSearch = (text) => {
    setMrName(text);
    if (text === "") {
      setFilteredData(agentsData);
    } else {
      const data = agentsData.filter((item) => {
        return (
          item.firstName.toLowerCase().includes(text) ||
          item.lastName.toLowerCase().includes(text.toLowerCase()) ||
          item.district.toLowerCase().includes(text.toLowerCase())
        );
      });
      setFilteredData(data);
    }
  };

  const resetData = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmail("");
    setPincode("");
    setMandal("");
    setDistrict("");
    setAssignDist("");
    setAssignMandal("");
    setImages([]);
    setProof([]);
    setVillage("");
  };

  const handleSubmit = async () => {
    try {
      const data = {
        firstName: firstName,
        lastName: lastname,
        email: email,
        phoneNumber: phoneNumber,

        assignedDistrict: assignDist,
        assignedMandal: assignMandal,
        country: country,
        district: district,

        identityProof: proof,

        mandal: mandal,
        pinCode: pincode,
        profilePicture: images[0],

        state: state,
        village: village,
        role: 6,
      };

      const token = await AsyncStorage.getItem("userToken");

      axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/marketingAgent/addMAgent`, {
        method: "post",

        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          ToastAndroid.showWithGravityAndOffset(
            "Marketing Agent added Successfully",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
          resetData();
          setAddAgent(false);
        })
        .catch((er) => {
          console.log(er);
        });

      console.log("dataaaaa", data);
    } catch (error) {}
  };

  const uploadImages1 = async (imageAssets) => {
    const uploadedUrls = [];

    try {
      for (const asset of imageAssets) {
        const formData = new FormData();
        formData.append("file", {
          uri: asset.uri,
          type: "image/jpeg",
          name: "upload.jpg",
        });
        formData.append("upload_preset", "sni4p6lt");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        uploadedUrls.push(response.data.secure_url);
        setImages(uploadedUrls);
      }
      console.log("Uploaded URLs:", uploadedUrls);
      setSelectedImages(uploadedUrls);
      console.log("Uploaded :", selectedImages);

      // Ensure onUrlsReturn is a valid function
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload failed", "There was an error uploading your images.");
    }
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const cleanedValue = value.replace(/\D/g, "");

    // Format it into 'xxx xxx xxxx'
    let formattedPhoneNumber = "";
    if (cleanedValue.length <= 3) {
      formattedPhoneNumber = cleanedValue;
    } else if (cleanedValue.length <= 6) {
      formattedPhoneNumber =
        cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
    } else {
      formattedPhoneNumber =
        cleanedValue.substring(0, 3) +
        "-" +
        cleanedValue.substring(3, 6) +
        "-" +
        cleanedValue.substring(6, 10);
    }

    return formattedPhoneNumber;
  };

  //   const handlePincodeChange = async (e) => {
  //     const pincodeValue = e.nativeEvent.text;
  //     console.log(pincodeValue);

  //     setPincode(pincodeValue);

  //     setAddressDetails({
  //       district: "",
  //       mandal: "",
  //       village: "",
  //     });
  //     setMandals([]);
  //     setVillages([]);

  //     if (pincodeValue.length === 6) {
  //       try {
  //         const response = await axios.get(
  //           ` https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/location/getlocationbypincode/${pincodeValue}/@/@`
  //         );
  //         console.log(response.data);
  //         const districtList = response.data.districts;
  //         const mandalList = response.data.mandals || [];
  //         const villageList = response.data.villages || [];

  //         setDistrict(districtList[0] || "");
  //         setMandal(mandalList);
  //         setVillages(villageList);
  //         setAddressDetails({
  //           district: districtList[0] || "",
  //           mandal: mandalList[0] || "",
  //           village: villageList[0] || "",
  //         });
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //         Alert.alert("Error", "Failed to fetch location data.");
  //       }
  //     }
  //   };

  const renderCustomer = ({ item }) => {
    return (
      <View style={[styles.cardContainer, { flex: 1 }]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MarketingAgentsInfo", { userId: item._id });
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: item.profilePicture }} // Ensure 'profilePicture' exists
              style={styles.profileImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={styles.contact}>
                Phone: {formatPhoneNumber(item.phoneNumber)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#4184AB", padding: 10, elevation: 2 }}>
        <TextInput
          placeholder="Search by name & location"
          style={[{
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            backgroundColor: "white",
          },styles.text]}
          placeholderTextColor={"black"}
          value={mrName}
          onChangeText={(value) => handleMrSearch(value)}
        />
      </View>

      {loading ? (
        <View style={{marginVertical:250}}>
          <ActivityIndicator size={"large"} color={"#007bff"} />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderCustomer}
          style={{ marginTop: 20 }}
        />
      )}

      <View style={styles.overlayButtonContainer}>
        <TouchableOpacity
          style={styles.overlayButton}
          onPress={() => setAddAgent(true)}
        >
          <Text style={styles.overlayButtonText}>
            <Feather name="plus" size={20} color="white" />
          </Text>
        </TouchableOpacity>

        {addAgent && (
          <Modal visible={addAgent} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[styles.text,{ fontWeight: "bold", fontSize: 22, marginLeft: 10 }]}
                >
                  {" "}
                  Add Marketing Agents
                </Text>

                <TouchableOpacity
                  onPress={() => handleClose()}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                  <TextInput
                    placeholder="First Name"
                    value={firstName}
                    style={styles.input}
                    onChangeText={(value) => setFirstName(value)}
                  />
                  <TextInput
                    placeholder="Last Name"
                    value={lastname}
                    style={styles.input}
                    onChangeText={(value) => setLastName(value)}
                  />
                  <TextInput
                    placeholder="Phone Number"
                    keyboardType="numeric"
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={(value) => setPhoneNumber(value)}
                  />
                  <TextInput
                    placeholder="Email"
                    value={email}
                    style={styles.input}
                    onChangeText={(value) => setEmail(value)}
                  />
                  <TextInput
                    placeholder="Pincode"
                    value={pincode}
                    style={styles.input}
                    onChangeText={(value) => setPincode(value)}
                  />
                  <TextInput
                    placeholder="Country"
                    value={country}
                    style={styles.input}
                    onChangeText={(value) => setCountry(value)}
                  />
                  <TextInput
                    placeholder="State"
                    value={state}
                    style={styles.input}
                    onChangeText={(value) => setState(value)}
                  />
                  <TextInput
                    placeholder="District"
                    value={district}
                    style={styles.input}
                    onChangeText={(value) => setDistrict(value)}
                  />
                  <TextInput
                    placeholder="Mandal"
                    value={mandal}
                    style={styles.input}
                    onChangeText={(value) => setMandal(value)}
                  />
                  <TextInput
                    placeholder="Village"
                    value={village}
                    style={styles.input}
                    onChangeText={(value) => setVillage(value)}
                  />
                  <TextInput
                    placeholder="Assigned District"
                    style={styles.input}
                    value={assignDist}
                    onChangeText={(value) => setAssignDist(value)}
                  />
                  <TextInput
                    placeholder="Assigned Mandal"
                    value={assignMandal}
                    style={styles.input}
                    onChangeText={(value) => setAssignMandal(value)}
                  />
                </View>

                <View style={styles.imageUploadContainer}>
                  <Button title="Upload Identity Proof" onPress={pickImages} />
                  <FlatList
                    data={proof}
                    horizontal

                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <Image
                        source={{ uri: item }}
                        style={styles.imagePreview}
                      />
                    )}
                  />
                </View>

                <View style={styles.imageUploadContainer}>
                  <Button title="Upload Profile Photo" onPress={pickImages1} />
                  <FlatList
                    data={images}
                    horizontal
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <Image
                        source={{ uri: item }}
                        style={styles.imagePreview}
                      />
                    )}
                  />
                </View>

                <View style={styles.submitContainer}>
                  <Button title="Submit" onPress={() => handleSubmit()} />
                </View>
              </ScrollView>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Modal: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 18,
    fontFamily:"Montserrat_700Bold"

  },

  input: {
    height: 45,
    fontSize: 18,
    fontFamily:"Montserrat_700Bold",

    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,
    alignContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  closeButton: {
    top: 0,
    right: 0,
    width: 45,
    marginLeft: 100,
    padding: 10,
    backgroundColor: "#d4d4d4",
    borderRadius: 25,
    justifyContent: "flex-end",
  },
  closeButtonText: {
    color: "black",
    marginLeft: 5,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
  modalContent: {
    marginTop: 5,
    paddingTop: 3,
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  text:
  {
    fontFamily:"Montserrat_700Bold"

  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    fontFamily:"Montserrat_700Bold"

  },
  imageUploadContainer: {
    marginTop: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  submitContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  cardContainer: {
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    fontSize: 30,
    fontFamily:"Montserrat_700Bold"

  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,

  },
  textContainer: {
    marginLeft: 10,
    fontFamily:"Montserrat_700Bold"

  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
  email: {
    fontSize: 14,
    color: "gray",
    fontFamily:"Montserrat_700Bold"

  },
  contact: {
    fontSize: 12,
    color: "gray",
    fontFamily:"Montserrat_700Bold"

  },
  overlayButtonContainer: {
    position: "absolute",
    bottom: 50,
    right: 20,
    zIndex: 1, // Ensure the button stays on top
  },
  overlayButton: {
    backgroundColor: "#007bff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5, // Adds a shadow to make the button pop
  },
  overlayButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:"Montserrat_700Bold"

  },
});

export default CsrMrAgent;
