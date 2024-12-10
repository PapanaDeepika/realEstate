import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  TextInput,
  View,
  Modal,
  Animated,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { IconButton } from "react-native-paper";
// import { SearchBar } from 'react-native-elements';
import { IconButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

const LayoutScreen = () => {
  const [layouts, setLayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [slideAnim] = useState(new Animated.Value(-300));

  const [openModal, setOpenModal] = useState(false);
  // const[openDropDown,setDropDownOpen]=useEffect(false);
  const [filteredLayouts, setFilteredLayouts] = useState([]);
  const [selectedSize, setSelectedSize] = useState({ min: "", max: "" });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownOpen1,setDropDownOpen1]=useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const transparent = "rgb(0,0,0,0.2)";
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigation=useNavigation();

  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          console.log("No token found");
          return;
        }

        const response = await fetch(
          "http://172.17.15.53:3000/layout/getalllayouts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setLayouts(data);
        setFilteredLayouts(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch layouts:", error);
        setLoading(false);
      }
    };

    fetchLayouts();
  }, []);

  const toggleFilter = () => {
    if (filterVisible) {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setFilterVisible(false));
    } else {
      setFilterVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const applyFilter = () => {
    const filtered = layouts.filter((item) => {
      const sizeMatches =
        selectedSize.min !== "" && selectedSize.max !== ""
          ? item.layoutDetails.plotSize >= parseInt(selectedSize.min) &&
            item.layoutDetails.plotSize <= parseInt(selectedSize.max)
          : true; // If no size filter, consider it as a match

      const minPriceMatches = minPrice
        ? item.layoutDetails.plotPrice >= parseInt(minPrice)
        : true;
      const maxPriceMatches = maxPrice
        ? item.layoutDetails.plotPrice <= parseInt(maxPrice)
        : true;
         const locationMatches= selectedLocation?item.layoutDetails.address.district  === selectedLocation:true;
      return sizeMatches && minPriceMatches && maxPriceMatches && locationMatches;
    });

    setFilteredLayouts(filtered);
    toggleFilter();
  };
  // function renderModal(){
  //     return(

  //         <Modal

  //         visible={openModal}
  //         animationType="slide"
  //         // setOpenmodal()

  //         >
  //             <View>
  //                 <Text>choose the filter </Text>
  //                 <IconButton icon="filter" style={styles.filterIcon} size={24} />

  //             </View>
  //             <View>
  //                 <Text></Text>
  //             </View>
  //         </Modal>
  //     )

  // }
  const renderLayoutCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardClick(item)}>
      <Image source={{ uri: item.uploadPics[0] }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>
          {item.layoutDetails.layoutTitle || "No Title"}
        </Text>
        <Text style={styles.size}>
          Size: {item.layoutDetails.plotSize} sq. meters
        </Text>
        <Text style={styles.totalPlots}>
          Total Plots: {item.layoutDetails.plotCount}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const handleCardClick = (item) => {
    const district1=item.layoutDetails.address.district;
    navigation.navigate('LayoutDetail',
      
      {
        property_id:item._id,
      district:district1});
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <IconButton icon="filter" style={styles.filterIcon} size={24} />
          {/* <Ionicons name="filter-outline" style={styles.filterIcon} size={24} color="#fff" /> */}
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredLayouts}
        renderItem={renderLayoutCard}
        keyExtractor={(item) => item._id}
        // contentContainerStyle={styles.list}
        // numColumns={1} // Single card per row
        // showsVerticalScrollIndicator={false}
      />
      {/* <TouchableOpacity>
                <View>
                    <View>
                        <Text>
                            open modal
                        </Text>
                    </View>
                </View>
            </TouchableOpacity> */}
      {/* {renderModal()} */}
      {/* <Modal
        visible={openModal}
        animationType="slide"
        onRequestClose={() => setOpenModal(false)}
        transparent={true}
      >
        

        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Options</Text>

          
          <DropDownPicker
            open={dropDownOpen}
            value={selectedSize}
            items={[
              { label: "0-1000 acres", value: { min: 0, max: 1000 } },
              { label: "0-2000 acres", value: { min: 0, max: 2000 } },
              { label: "0-4000 acres", value: { min: 0, max: 4000 } },
              { label: "0-6000 acres", value: { min: 0, max: 6000 } },
              { label: "0-8000 acres", value: { min: 0, max: 8000 } },
              { label: "0-10000 acres", value: { min: 0, max: 10000 } },

           
            ]}
            setOpen={setDropDownOpen}
            setValue={setSelectedSize}
            onChangeValue={(value) => setSelectedSize(value)}
          />
        
          
            <View style={styles.forpriceview}>
              <TextInput
              value={minPrice}
              onChangeText={setMinPrice}
              placeholder="minimum price"
              keyboardType="numeric"
              style={styles.forpriceinput}/>
              <TextInput
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder="maximum price"
              keyboardType="numeric"
              style={styles.forpriceinput}/>
            </View>




          <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setOpenModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal> */}
      <Modal
        visible={openModal}
        animationType="slide"
        onRequestClose={() => setOpenModal(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Options</Text>

          {/* Custom Slider */}
          {/* <SafeAreaView>
        <CustomSlider min={0} max={Infinity} />
      </SafeAreaView> */}

          {/* Dropdown Picker */}
          <DropDownPicker
            open={dropDownOpen}
            value={selectedSize}
            items={[
              { label: "0-1000 acres", value: { min: 0, max: 1000 } },
              { label: "0-2000 acres", value: { min: 0, max: 2000 } },
              { label: "0-4000 acres", value: { min: 0, max: 4000 } },
              { label: "0-6000 acres", value: { min: 0, max: 6000 } },
              { label: "0-8000 acres", value: { min: 0, max: 8000 } },
              { label: "0-10000 acres", value: { min: 0, max: 10000 } },
            ]}
            setOpen={setDropDownOpen}
            setValue={setSelectedSize}
            onChangeValue={(value) => setSelectedSize(value)}
          />

          {/* Price Inputs */}
          <View style={styles.forpriceview}>
            <TextInput
              value={minPrice}
              onChangeText={setMinPrice}
              placeholder="Minimum Price"
              keyboardType="numeric"
              style={styles.forpriceinput}
            />
            <TextInput
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder="Maximum Price"
              keyboardType="numeric"
              style={styles.forpriceinput}
            />
          </View>
          <DropDownPicker
            open={dropDownOpen1}
            value={selectedLocation}
            items={[
              { label: "Visakhapatnam", value: "Visakhapatnam" },
              { label: "Vizianagaram", value: "Vizianagaram" },
              { label: "Srikakulam", value: "Srikakulam" },
            ]}
            setOpen={setDropDownOpen1}
            setValue={setSelectedLocation}
            onChangeValue={(newValue) => setSelectedLocation(newValue)}
          />

          {/* Buttons */}
          <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setOpenModal(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center vertically
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },

  // Updated searchInput style for a more polished appearance
  searchInput: {
    flex: 1, // Take up remaining space
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#333",
  },

  // Style for the filter icon to fit well with the input
  filterIcon: {
    marginLeft: 10,
    // backgroundColor: "#A3C1DA",
    backgroundColor: "#A3C1DA",
    borderRadius: 10,
    padding: 5,
    alignSelf: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    padding: 15,
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  size: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  totalPlots: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  modalContainer: {
    // padding: 10,
    // justifyContent: "center",
    // height: 305,
    // backgroundColor: "skyblue",
    // marginTop: 540,
    // borderRadius: 20,

    padding: 20,
    justifyContent: "center",
    backgroundColor: "skyblue",
    borderRadius: 20,
    margin: 20,
    marginTop: 580,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  applyButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  applyButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  forpriceview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "100%",
  },
  forpriceinput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    width: "48%", // Adjust width to fit side by side
  },
});

export default LayoutScreen;
