import { Dimensions, StyleSheet } from "react-native";


const { width } = Dimensions.get("window");


const styles = StyleSheet.create({
  slide: { flex: 1 },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    color: "#fff",
    textAlign: "center",
  },

  image: {
    width: 420,
    height: 600,
    marginLeft: 0,
    marginBottom: 10,
    padding: 0,
  },
  text1: {
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
    textAlign: "center",
    color: "#d7eefc",
  },

  mainApp: { flex: 1, justifyContent: "center", alignItems: "center" },
 


 
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  // customerName: {
  //   fontSize: 18,
  //   color: "#333333",
  //   fontWeight: "bold",
  //   fontFamily: "Montserrat_700Bold",
  // },

  // customerName: {
  //   fontSize: 18,
  //   color: "#333333",
  //   fontWeight: "bold",
  //   fontFamily: "Montserrat_700Bold",
  // },
  // radioContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  // detailsContainer: {
  //   marginTop: 8,
  // },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  // detailText: {
  //   marginLeft: 10,
  //   fontSize: 14,
  //   fontFamily: "Montserrat_600SemiBold",
  // },
  // buttonsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   paddingBottom: 8,
  //   paddingTop: 8,
  // },
  // button: {
  //   width: 100,
  //   marginHorizontal: 4,
  // },
 
 
  searchIcon: {
    marginLeft: 2,
    marginRight: 5,
    color: "white",
  },
 
 
  overlayButtonContainer: {
    position: "absolute",
    top: 650,
    right: 10,
    zIndex: 1,
  },
 
 
 
  // container: {
  //   flex: 1,
  //   backgroundColor: "#f5f5f5",
  // },
  priceMaxInput: {
    flex: 1,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    height: 40,
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  priceInput: {
    flex: 1,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    height: 40,
    marginRight: 5,
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  }, 
  slider: {
    width: 300,
    height: 40,
  },
   
 
 
  dropdown: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  welcomeContainer: {
    padding: 20,
    fontSize: 25,
    backgroundColor: "#4184AB",
    color: "white",
    fontStyle: "italic",
    fontFamily: "Montserrat_700Bold",
  },
 
 
 
  
 
  // card: {
  //   backgroundColor: "#fff",
  //   marginVertical: 10,
  //   borderRadius: 10,
  //   overflow: "hidden",
  //   shadowColor: "#000",
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 5,
  //   elevation: 3,
  // },

 
  // cardContent: {
  //   padding: 15,
  // },
   
 
 
  propertyDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
 
 
  recommended: {
    paddingHorizontal: 10,
  },
 
 
 
 
  imageText: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",

    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "50%",
    borderBottomRightRadius: 60,
  },
  imageNew: {
    width: "100%",
    height: 200,
  },
  cardNew: {
    marginVertical: 10,

    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  priceStyle: {
    backgroundColor: "rgba(173, 216, 230, 0.7)",
    padding: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    fontFamily: "Montserrat_700Bold",

    width: "40%",
  },
 
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,

    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "80%",
    justifyContent: "center",
  },
  textStyleModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  // button: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonOpen: {
  //   backgroundColor: "#000",
  // },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
  // buttonDirection: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  // header: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   padding: 10,
  //   backgroundColor: "#fff",
  // },
  searchheader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  searchbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  reseticon: {
    marginRight: 8,
  },
  resettext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  resetbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
 
 

  // container: {
  //   flex: 1,
  //   padding: 10,
  // },
  agentList: {
    flexGrow: 1,
    paddingBottom: 20,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  agentCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    padding: 15,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    alignItems: "center",
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
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },

  agentPhone: {
    color: "gray",
    marginVertical: 5,
  },
  agentEmail: {
    color: "gray",
  },
  dropDownContainer: {
    zIndex: 20,
    position: "absolute",
    top: 50,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#4184AB",
    padding: 10,
    elevation: 2,
  },
 
  dropDownPicker: {
    width: 180,
    marginHorizontal: 5,
    position: "absolute",
    zIndex: 10,
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: "#f0f0f0",
  //   paddingBottom: 50,
  // },
  listContainer: {
    padding: 5,
    marginTop: 5,
  },
  // card: {
  //   marginBottom: 10,
  //   marginHorizontal: 15,
  //   elevation: 4,
  //   borderRadius: 12,
  // },
  // cardContent: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },

  // customerName: {
  //   fontSize: 18,
  //   color: "#333333",
  //   fontWeight: "bold",
  //   fontFamily: "Montserrat_700Bold",
  // },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  // detailsContainer: {
  //   marginTop: 8,
  // },
  // detailItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginVertical: 4,
  // },
  // detailText: {
  //   marginLeft: 10,
  //   fontSize: 14,
  //   fontFamily: "Montserrat_700Bold",
  // },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 8,
    paddingTop: 8,
  },
  // button: {
  //   width: 100,
  //   marginHorizontal: 4,
  // },
  
  propertyImage: {
    position: "absolute",
    top: 20,
    right: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
 
  
  searchBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  filterButton: {
    padding: 5,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
 
 
  overlayButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
 

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
  // card: {
  //   backgroundColor: "#fff",
  //   borderRadius: 8,
  //   padding: 15,
  //   marginBottom: 10,
  //   elevation: 3,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2,
  //   marginHorizontal: 10,
  //   fontFamily: "Montserrat_700Bold",
  // },
 
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Montserrat_700Bold",
  },
  infoContainer: {},
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
    fontFamily: "Montserrat_700Bold",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    fontFamily: "Montserrat_700Bold",
  },
  // button: {
  //   flex: 1,
  //   marginHorizontal: 5,
  //   backgroundColor: "#057ef0",
  //   paddingVertical: 10,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   fontFamily: "Montserrat_700Bold",
  // },
  closeButton: {
    backgroundColor: "#ff4747",
    fontFamily: "Montserrat_700Bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  dealClosedText: {
    fontSize: 16,
    color: "#ff0000",
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
 
 
 
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    fontFamily: "Montserrat_700Bold",
  },
  // header: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ddd",
  //   marginBottom: 20,
  //   fontFamily: "Montserrat_700Bold",
  // },
  // headerText: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   fontFamily: "Montserrat_700Bold",
  // },
  // closeMark: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   fontFamily: "Montserrat_700Bold",
  // },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    fontFamily: "Montserrat_700Bold",
  },
  radioText: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },
 
 
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    fontFamily: "Montserrat_700Bold",
  },

  // container: {
  //   flex: 1,
  //   padding: 10,
  //   fontFamily: "Montserrat_700Bold",
  // },

  // card: {
  //   flexDirection: "row",
  //   marginBottom: 15,
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   padding: 10,
  //   borderColor: "#ddd",
  //   alignItems: "center",
  //   fontFamily: "Montserrat_700Bold",
  // },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  // cardContent: {
  //   flex: 1,
  //   fontFamily: "Montserrat_700Bold",
  // },
 
  details: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Montserrat_700Bold",
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: "#f5f5f5",
  //   fontFamily: "Montserrat_700Bold",
  // },
 
   
  
  label1: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  pickerWrapper: {
    height: 40,
    width: 158,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
 
 

  picker: {
    height: 40,
    width: 140,
    fontFamily: "Montserrat_700Bold",
  },
 
 
 
 
  // card: {
  //   backgroundColor: "#fff",
  //   marginVertical: 10,
  //   borderRadius: 10,
  //   overflow: "hidden",
  //   shadowColor: "#000",
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 5,
  //   elevation: 3,
  //   fontFamily: "Montserrat_700Bold",
  // },
 
  
  // cardContent: {
  //   padding: 15,
  //   fontFamily: "Montserrat_700Bold",
  // },
 
  propertyDetailsContainer: {
    marginTop: 10,
    fontFamily: "Montserrat_700Bold",
  },
 
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
    fontFamily: "Montserrat_700Bold",
  },
 
 
  textStyleNew: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Montserrat_700Bold",
  },
  // detailsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginTop: 10,
  //   fontFamily: "Montserrat_700Bold",
  // },
 
  imageText: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "50%",
    borderBottomRightRadius: 60,
    fontFamily: "Montserrat_700Bold",
  },
  imageNew: {
    width: "100%",
    height: 200,
    fontFamily: "Montserrat_700Bold",
  },
  cardNew: {
    marginVertical: 10,

    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: "Montserrat_700Bold",
  },
  priceStyle: {
    backgroundColor: "rgba(173, 216, 230, 0.7)",
    padding: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "40%",
    fontFamily: "Montserrat_700Bold",
  },
 
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
  modalView: {
    margin: 20,

    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      fontFamily: "Montserrat_700Bold",
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "80%",
    justifyContent: "center",
    fontFamily: "Montserrat_700Bold",
  },

 
  overlayButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontFamily: "Montserrat_700Bold",
  },
 
  textStyleModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  // button: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  //   fontFamily: "Montserrat_700Bold",
  // },

  // buttonOpen: {
  //   backgroundColor: "#000",
  //   fontFamily: "Montserrat_700Bold",
  // },
  buttonClose: {
    backgroundColor: "#2196F3",
    fontFamily: "Montserrat_700Bold",
  },
  buttonDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  // header: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   padding: 10,
  //   backgroundColor: "#fff",
  //   fontFamily: "Montserrat_700Bold",
  // },
  searchheader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
    fontFamily: "Montserrat_700Bold",
  },
  searchbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    fontFamily: "Montserrat_700Bold",
  },
  reseticon: {
    marginRight: 8,
    fontFamily: "Montserrat_700Bold",
  },
  resettext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },

  resetbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontFamily: "Montserrat_700Bold",
  },

  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    fontFamily: "Montserrat_700Bold",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    fontFamily: "Montserrat_700Bold",
  },
 
 
 

  card1: {
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily: "Montserrat_700Bold",
  },
  
  // cardContent: {
  //   padding: 15,
  //   fontFamily: "Montserrat_700Bold",
  // },
 
  assignModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    fontFamily: "Montserrat_700Bold",
  },
  assignModalContent: {
    width: "85%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    fontFamily: "Montserrat_700Bold",

    alignItems: "center",
  },
  assignModalText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Montserrat_700Bold",
  },
  closeModalButton: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#007bff",
    borderRadius: 20,
    marginVertical: 10,
    width: 100,
    fontFamily: "Montserrat_700Bold",
  },
  closeModalButtonText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
  },

  closeModalButtonText1: {
    marginTop: 5,
    color: "black",
    fontFamily: "Montserrat_700Bold",
  },

  closeModalButton1: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    width: 150,
    fontFamily: "Montserrat_700Bold",
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: "#f5f5f5",
  //   padding: 10,
  //   fontFamily: "Montserrat_700Bold",
  // },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
  // card: {
  //   backgroundColor: "#fff",
  //   borderRadius: 8,
  //   marginBottom: 10,
  //   overflow: "hidden",
  //   elevation: 3,
  //   fontFamily: "Montserrat_700Bold",
  // },
  // image: {
  //   width: "100%",
  //   height: 200,
  //   fontFamily: "Montserrat_700Bold",
  // },
  details: {
    fontFamily: "Montserrat_700Bold",

    padding: 10,
  },
 
  location: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    fontFamily: "Montserrat_700Bold",
  },
  price: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },

 
 
 
  // customerName: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  //   fontFamily: "Montserrat_700Bold",
  // },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "Montserrat_700Bold",
  },
  infoContainer: {},
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    fontFamily: "Montserrat_700Bold",
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
    fontFamily: "Montserrat_700Bold",
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    fontFamily: "Montserrat_700Bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    fontFamily: "Montserrat_700Bold",
  },
  // button: {
  //   flex: 1,
  //   marginHorizontal: 5,
  //   backgroundColor: "#057ef0",
  //   paddingVertical: 10,
  //   borderRadius: 10,
  //   alignItems: "center",
  //   fontFamily: "Montserrat_700Bold",
  // },
  closeButton: {
    backgroundColor: "#ff4747",
    fontFamily: "Montserrat_700Bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  dealClosedText: {
    fontSize: 16,
    color: "#ff0000",
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
 
  searchContainer: {
    paddingHorizontal: 5,
    backgroundColor: "#4184AB",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    margin: 10,
    fontFamily: "Montserrat_700Bold",
  },
 
   
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    fontFamily: "Montserrat_700Bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
    fontFamily: "Montserrat_700Bold",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  closeMark: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
 
 
 
 
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
    fontFamily: "Montserrat_700Bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    fontFamily: "Montserrat_700Bold",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    fontFamily: "Montserrat_700Bold",
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    fontFamily: "Montserrat_700Bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  // image: {
  //   width: width,
  //   height: 250,
  //   resizeMode: "cover",
  //   fontFamily: "Montserrat_700Bold",
  // },
  detailsContainer: {
    padding: 15,
    fontFamily: "Montserrat_700Bold",
  },
  
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4a90e2",
    marginBottom: 15,
    fontFamily: "Montserrat_700Bold",
  },
  // card: {
  //   backgroundColor: "white",
  //   borderRadius: 8,
  //   padding: 15,
  //   marginBottom: 15,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 3,
  //   fontFamily: "Montserrat_700Bold",
  // },


  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginHorizontal: 10,
    fontFamily: "Montserrat_700Bold",
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    fontFamily: "Montserrat_700Bold",
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
    flex: 1,
    fontFamily: "Montserrat_700Bold",
  },
  locationText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
    fontFamily: "Montserrat_700Bold",
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    fontFamily: "Montserrat_700Bold",
  },

  // container: {
  //   marginHorizontal: 10,
  //   marginBottom: 20,
  //   paddingBottom: 50,
  //   fontFamily: "Montserrat_700Bold",
  // },
  // card: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#fff",
  //   padding: 16,
  //   marginVertical: 8,
  //   borderRadius: 10,
  //   shadowColor: "#8b8b8f",
  //   shadowOpacity: 10,
  //   elevation: 24,
  //   fontFamily: "Montserrat_700Bold",
  // },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    position: "absolute",
    top: 20,
    right: 10,
    fontFamily: "Montserrat_700Bold",
  },
  profileText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_500Medium",
  },
  details: {
    flex: 1,
    fontFamily: "Montserrat_500Medium",
  },
 
  text2: {
    fontSize: 17,
    marginVertical: 5,
    color: "#000",
    fontFamily: "Montserrat_600SemiBold",
  },
 
 
  selectedFilterButton: {
    backgroundColor: "black",
    fontFamily: "Montserrat_700Bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 20,
    fontFamily: "Montserrat_700Bold",
  },
  imageText: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "50%",
    borderBottomRightRadius: 60,
    fontFamily: "Montserrat_700Bold",
  },
  buttonContainer: {
    marginHorizontal: 5,
    fontFamily: "Montserrat_700Bold",
  },
 
  buttonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
  },
  
  propertyList: {
    paddingBottom: 20,
    fontFamily: "Montserrat_700Bold",
  },
  // card: {
  //   backgroundColor: "#fff",
  //   marginBottom: 15,
  //   borderRadius: 5,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 5,
  //   elevation: 3,
  //   fontFamily: "Montserrat_700Bold",
  // },
 
 
  propertyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    fontFamily: "Montserrat_700Bold",
  },
  propertyDetails: {
    fontSize: 16,
    color: "black",
    marginVertical: 10,
    fontFamily: "Montserrat_700Bold",
  },
  selectedChip: {
    backgroundColor: "#00aae7",
    borderColor: "#00aae7",
    fontFamily: "Montserrat_700Bold",
  },
  chipRow: {
    backgroundColor: "#4184AB",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingHorizontal: 10,

    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    fontFamily: "Montserrat_700Bold",
  },
  chipContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    fontFamily: "Montserrat_700Bold",
  },
  chip: {
    borderColor: "#007bff",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 25,
    backgroundColor: "white",
    fontFamily: "Montserrat_700Bold",
  },
  chipText: {
    color: "#007bff",
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
  },
  selectedChipText: {
    color: "white",
    fontFamily: "Montserrat_700Bold",
  },
  propertyListContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
    fontFamily: "Montserrat_700Bold",
  },
  priceBottomStyle: {
    position: "absolute",

    bottom: 0,
    backgroundColor: "#f0f0f0",
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontFamily: "Montserrat_700Bold",
  },


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
 
  formContainer: {
    marginBottom: 20,
  },
  text:
  {
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
 
 
 
 
 

  iconGrid: {
    flexDirection: "row",  
    flexWrap: "wrap",  
    justifyContent: "space-between",  
    paddingHorizontal: 10,  
    marginTop: 20,  
  },
  iconItemContainer: {
    width: "30%",  
    alignItems: "center", 
    marginBottom: 20,  
    backgroundColor: "#c7dfed",
    borderRadius: 10,
    padding: 10,
  },
  iconItem: {
    backgroundColor: "#4184AB",  
 
    borderRadius: 10,  
    padding: 15, 
    justifyContent: "center",
    alignItems: "center",
  },
  iconLabel: {
    marginTop: 10, 
    textAlign: "center",
    fontSize: 14,
     color: "#333", 
    fontFamily: "Montserrat_700Bold",
  },
  agentSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  agentCard: {
    width: 350,
    height: 300,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  agentImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  agentName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  agentRole: {
    fontSize: 14,
    color: "#777",
    fontFamily: "Montserrat_700Bold",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    // backgroundColor:"#ADD8E4",
    borderRadius: 50,
    marginTop: 20,
  },
  iconItem: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007bff",
    // backgroundColor:"black",
    borderRadius: 50,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#f4f4f9",

  //   paddingTop: 100,
  //   // backgroundColor:'#4184AB'
  // },
  topNav: {
    //  backgroundColor: "#007bff",
    backgroundColor: "#4184AB",

    padding: 15,
    //  marginTop:25,
    //  flexDirection: "row",
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // alignItems: "center",
    // alignContent:"center",
    // marginLeft:20
    //  justifyContent: "space-between",
  },
  menuIcon: {
    marginLeft: 10,
  },
  navTitle: {
    color: "#fff",
    fontSize: 24,
    // fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    fontFamily: "Montserrat_700Bold",
  },
  content: {
    flex: 1,
  },
  smallHeadingContainer: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  smallHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    alignContent: "center",
    marginLeft: 160,
    // alignItems:"centre",
    fontFamily: "Montserrat_700Bold",

    fontWeight: "bold",
  },
  viewMoreText: {
    fontSize: 14,
    color: "#007bff",
    marginTop: 13,
    textAlign: "right",
    marginRight: 15,
    fontFamily: "Montserrat_700Bold",
  },
  // card: {
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   margin: 10,
  //   width: 200,
  //   padding: 10,
  //   shadowColor: "#000",
  //   shadowOpacity: 0.2,
  //   shadowRadius: 5,
  //   elevation: 3,
  //   alignItems: "center",
  // },
  cardImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
  cardText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  agentSection: {
    marginTop: 20,
    paddingHorizontal: 15,
    fontFamily: "Montserrat_700Bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Montserrat_700Bold",
  },
  
  agentCard: {
    width: 200,  
    height: 250,  
    padding: 20, 
    backgroundColor: "#fff",
    borderRadius: 10,
    marginRight: 20,  
    marginBottom: 20,  
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Montserrat_700Bold",
  },

  agentName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  agentRole: {
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",

    color: "#777",
  },
 
  bottomNav: {
    flexDirection: "row",
     backgroundColor: "#4184AB",

    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  highlightedButtonContainer: {
    position: "absolute",
    bottom: 20,  
    right: "38%",
    transform: [{ translateX: -10 }],  
  },
  highlightedButton: {
 
    backgroundColor: "black",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,  
  },

  // image: {
  //   width: "100%",
  //   height: 120,
  //   borderRadius: 10,
  // },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Montserrat_700Bold",
  },
  district: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
    fontFamily: "Montserrat_700Bold",
  },

  // container: {
  //   flex: 1,
  //   backgroundColor: "#f5f5f5",
  // },
  
 
  
  
  picker1: {
    width: "100%",
  },
  pickerWrapper1: {
    height: 40,
    width: "100%",
    borderColor: "black",
    borderWidth: 1, 
    borderRadius: 5,  
    justifyContent: "center", 
    alignItems: "center",  
    marginBottom: 10,
  },

 
 
 
 
 
  // card: {
  //   backgroundColor: "#fff",
  //   marginVertical: 10,
  //   borderRadius: 10,
  //   overflow: "hidden",
  //   shadowColor: "#000",
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 5,
  //   elevation: 3,
  // },
  shareIcon: {
    position: "absolute",
    bottom: 10,  
    right: 10,  
    backgroundColor: "rgba(255, 255, 255, 0.8)",  
    borderRadius: 20, 
    padding: 8, 
    zIndex: 1, 
  },
  
  // cardContent: {
  //   padding: 15,
  // },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
 
 
 
  textStyle: {
    paddingVertical: 10,
    paddingLeft: 20,
    fontSize: 25,
    fontFamily: "Montserrat_700Bold",
  },
  detailsStyles: {
    flexDirection: "row",
  },
 
  // detailsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginTop: 10,
  // },
 
  imageText: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    color: "#000",
    fontSize: 12,
     textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "75%",
    borderBottomRightRadius: 60,
    fontFamily: "Montserrat_700Bold",
  },
  imageNew: {
    width: "100%",
    height: 150,
  fontFamily: "Montserrat_700Bold"
  },
  cardNew: {
    marginVertical: 10,
    marginHorizontal: 3,
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  priceStyle: {
    backgroundColor: "rgba(173, 216, 230, 0.7)",
    padding: 10,
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#007acc",
    width: "40%",
    fontFamily: "Montserrat_700Bold",
  },
   
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
  modalView: {
    margin: 20,

    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "80%",
    justifyContent: "center",
  },
  textStyleModal: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",

    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#000",
  },
  // buttonClose: {
  //   backgroundColor: "#2196F3",
  // },
  // buttonDirection: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   marginBottom: 10,
  // },
  // header: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   padding: 10,
  //   backgroundColor: "#fff",
  // },
  searchheader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  searchbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  reseticon: {
    marginRight: 8,
  },
  resettext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  resetbutton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // To make the image round
    marginRight: 15,
  },
 
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
  },
  email: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Montserrat_700Bold",
  },
  contact: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Montserrat_700Bold",
  },

});

export default styles;
