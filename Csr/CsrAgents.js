import React, { useEffect, useState } from "react";
import {
 View,
 Text,
 ScrollView,
 StyleSheet,
 TouchableOpacity,
 Image,
 ActivityIndicator,
 TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from "@react-native-picker/picker";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
 
export const CsrAgents = () => {
 const [agents, setAgents] = useState([]);
 const [loading, setLoading] = useState(true);

  const [dropDownOpen1, setDropDownOpen1] = useState(false);

  const [agentName,setAgentName] =useState("")

    const [dropdownProps, setDropdownProps] = useState([]);
  
    const [agentId,setAgentId]=useState("none")
const [location,setLocation]=useState("")

const [filteredData,setFilterData]=useState([])

 const navigation=useNavigation()
 useEffect(() => {
 const fetchAssignedAgents = async () => {
 try {
 const token = await AsyncStorage.getItem("userToken");
 if (!token) {
 console.log("No token found");
 setLoading(false);
 return;
 }

 // Decode the token to extract the user ID
 const decodedToken = jwtDecode(token);
 const userId = decodedToken.user.userId;

 console.log("User ID:", userId);

 // Fetch agents assigned to the user 
 
 const response = await fetch(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/csr/getAssignedAgents/${userId}`,
 {
 method: "GET",
 headers: {
 Authorization: `Bearer ${token}`,
 "Content-Type": "application/json",
 },
 }
 );

 if (!response.ok) {
 throw new Error(`Error fetching agents: ${response.statusText}`);
 }

 const data = await response.json();
 console.log(data);

 setAgents(data); // Assuming data is an array of agents
setFilterData(data)

let dropdownData=[]
   dropdownData = data.map((agent) => ({
    label: `${agent.firstName} ${agent.lastName}`, // Full name as label
    value: agent._id, // Use accountId as the unique identifier
    key: agent._id, // Ensure key is unique
  }));


  dropdownData.push({
    label:"Agent Name",
    value:"none",
    Key:1
  })


  console.log(dropdownData)
   setDropdownProps(dropdownData);


 } catch (error) {
 console.error("Failed to fetch assigned agents:", error);
 } finally {
 setLoading(false);
 }
 };

 fetchAssignedAgents();
 }, []);

  const handleShare = async (property) => {
    console.log("Sharing property:", property);
    try {
      const result = await Share.share({
        message: `Check out this property:
        Title:${property.landDetails.title}
   Type: ${property.propertyType}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("shared with activity type of", result.activityType);
        } else {
          console.log("shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed action");
      }
    } catch (error) {
      console.log("In the catch", error.message);
    }
    // Add logic to share property details
  };

 const formatPhoneNumber = (value) => {
  // Remove all non-numeric characters
  const cleanedValue = value.replace(/\D/g, "");

  // Format it into 'xxx xxx xxxx'
  let formattedPhoneNumber = "";
  if (cleanedValue.length <= 3) {
    formattedPhoneNumber = cleanedValue;
  } else if (cleanedValue.length <= 6) {
    formattedPhoneNumber = cleanedValue.substring(0, 3) + " " + cleanedValue.substring(3, 6);
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



//  const handleDropDown = async (value) => {
//     console.log(value,value.label);
//      setAgentId(value.value)
//      setAgentName(value.label);

//    const data=agents.filter((item)=>{
//     return item._id===value.value
//    })
 
//    setFilterData(data)

// }


const handleDropDown = async (value) => {
     console.log(value);
  
     const selectedAgent = dropdownProps.find(item => item.value === value);
    if (selectedAgent) {
      setAgentId(value);  
      setAgentName(selectedAgent.label);   
    }
  
   
    const data = agents.filter((item) => item._id === value);
  


     setFilterData(data);

     if(value==="none")
     {
        setFilterData(agents)
     }
  };
  


const handleLocationSearch=async(text)=>{


    setLocation(text)

  if(text==="")
  {
setFilterData(agents)
  }
    const data=agents.filter((items)=>  {
       return (items.district.toLowerCase().includes( text.toLowerCase()) ||  items.mandal.toLowerCase().includes(text.toLowerCase()))
    })

    setFilterData(data)
    console.log(data)
}


 if (loading) {
 return (
 <View style={{marginVertical:310}}>
 <ActivityIndicator size="large" color="#007bff" />
 </View>
 );
 }

 return (


    <View  >
    <View style={{ flexDirection: "row", backgroundColor: '#4184AB', padding: 10, elevation: 2 }}>
      <TextInput
        placeholder="Search by Location"
        style={{ borderWidth: 1,     fontFamily:"Montserrat_500Medium",
          borderRadius: 10, padding: 10, width: 200, backgroundColor: "white" }}
        placeholderTextColor={"black"}
        value={location}
        onChangeText={(value) => { handleLocationSearch(value) }}
      />
  
      {/* <DropDownPicker
        open={dropDownOpen1}
        value={agentName}
        placeholder="Search by Agent"
        items={dropdownProps}
        setOpen={setDropDownOpen1}
        setValue={setAgentName}
        onSelectItem={(item) => handleDropDown(item)}
        style={{
          width: 180,
          marginHorizontal: 5,
          position: "fixed",
         }}
         dropDownContainerStyle={{
            top: "100%", 
            zIndex:10 
            }}
        /> */}
<View style={[styles.text,{backgroundColor:"white",borderRadius:10, marginLeft:5,borderWidth:1}]}> 
<Picker
  selectedValue={agentId}
  onValueChange={(itemValue) => handleDropDown(itemValue)} // Handle selection change
  style={{
    width: 180,
    marginHorizontal: 5,
     fontFamily:"Montserrat_500Medium"
  }}
>
  {dropdownProps.map((item) => (
    <Picker.Item key={item.value} label={item.label} value={item.value}   style={{fontFamily:"Montserrat_500Medium"}}/>
  ))}
</Picker>
</View>
    </View>
  
    <ScrollView contentContainerStyle={styles.agentList} showsVerticalScrollIndicator={false} >
      {filteredData.map((agent) => (
        <TouchableOpacity
          key={agent._id}
          style={styles.agentCard}
          onPress={() => navigation.navigate("agentInfo", { agentId: agent._id })}>
          <Image
            source={{ uri: agent.profilePicture }}
            style={styles.profileImage}
          />
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName,styles.text]}>
              {agent.firstName} {agent.lastName}
            </Text>
            <Text style={[styles.agentPhone,styles.text]}>{formatPhoneNumber(agent.phoneNumber)}</Text>
            <Text style={[styles.agentEmail,styles.text]}>{agent.email}</Text>
            <Text style={styles.text}>{agent.district}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
  
 );
};

// Styling for the screen
const styles = StyleSheet.create({
//  container: {
//  flex: 1,
//   backgroundColor: "#f8f8f8",
//  },
//  header: {
//  fontSize: 24,
//  fontWeight: "bold",
//  marginBottom: 20,
//  color: "#333",
//  },
//  loaderContainer: {
//  flex: 1,
//  justifyContent: "center",
//  alignItems: "center",
//  },
//  agentList: {
//     marginTop:20,
//  paddingBottom: 20,
//   marginHorizontal:10
//  },
//  agentCard: {
//  flexDirection: "row",
//  backgroundColor: "#fff",
//  padding: 15,
//  marginBottom: 10,
//  borderRadius: 10,
//  shadowColor: "#000",
//  shadowOpacity: 0.1,
//  shadowOffset: { width: 0, height: 3 },
//  shadowRadius: 5,
//  elevation: 3,
//  },
//  profileImage: {
//  width: 50,
//  height: 50,
//  borderRadius: 25,
//  marginRight: 15,
//  },
//  agentInfo: {
//  justifyContent: "center",
//  },
//  agentName: {
//  fontSize: 18,
//  fontWeight: "bold",
//  color: "#333",
//  },
//  agentPhone: {
//  fontSize: 14,
//  color: "#555",
//  marginTop: 5,
//  },
//  agentEmail: {
//  fontSize: 14,
//  color: "#555",
//  marginTop: 5,
//  },


container: {
    flex: 1,
    padding: 10,
  },
  agentList: {
    flexGrow: 1,
    paddingBottom: 20,
    marginHorizontal:10,
    elevation:3,
    shadowColor:"#000",
     shadowOpacity:0.2,
    shadowRadius:10
  },
  agentCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor:"#000",
    padding: 15,
    shadowOpacity:0.2,
    shadowRadius:10,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily:"Montserrat_700Bold"

  },
  text:{
    fontFamily:"Montserrat_700Bold"

  },
  agentPhone: {
    color: 'gray',
    marginVertical: 5,
  },
  agentEmail: {
    color: 'gray',
  },
  dropDownContainer: {
    zIndex: 20, // Ensures the dropdown is on top of other elements
    position: 'absolute',
    top: 50,  // Adjust this if needed to position the dropdown correctly
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: '#4184AB',
    padding: 10,
    elevation: 2,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 200,
    backgroundColor: "white",
  },
  dropDownPicker: {
    width: 180,
    marginHorizontal: 5,
    position: "absolute",
    zIndex: 10, // Makes sure the dropdown stays above other components
  },
});