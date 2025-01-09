import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View, TouchableOpacity, SafeAreaView, StyleSheet} from 'react-native'
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const HeaderLeft = () => {
    const navigation = useNavigation();
    return (
      <Icon 
        name="menu" 
        size={30} 
        color="#000" 
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ marginLeft: 10 }}
      />
    );
  };


  const CustomHeaderLeft = () => {
    const navigation = useNavigation();
    return (
      <Icon 
        name={navigation.canGoBack() ? "arrow-left" : "menu"} 
        size={30} 
        color="#000" 
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.dispatch(DrawerActions.openDrawer());
          }
        }}
        style={{ marginLeft: 10 }}
      />
    );
  };

function AgentProfile({navigation}) {
    // useEffect(() => {
    //     navigation.setOptions({
    //         headerShown:true,
    //         headerLeft: () => <CustomHeaderLeft />,
    //     })
    //     // navigation.setOptions({
    //     //     headerShown:true,
         
    //     //   headerRight: () => (
    //     //     <TouchableOpacity onPress={() => { 
    //     //       navigation.navigate('editProfile'); 
    //     //     }}>
    //     //       <Icon 
    //     //         name="account-edit" // Icon for user-edit
    //     //         size={30}
    //     //         color="black" // Set the icon color
    //     //         style={{ marginRight: 15 }} // Add some margin for spacing
    //     //       />
    //     //     </TouchableOpacity>
    //     //   ),
          
    //     // });
    //   }, []);


  return (
<SafeAreaView style={styles.container}>
    <View style={styles.userInfoSection}>
        <View style={{flexDirection:'row', marginTop:15}}>
            <Avatar.Image 
            source=
            {{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJr-fGkiy1DE5A0JNOkcmCNGcXuQXdzENZA&s",}}
            size={80} />

<View style={{marginLeft:20}}>
    <Title style={[styles.title, {
        marginTop:15,
        marginBottom:5
    }]}>Raghu Varan</Title>
    <Caption style={styles.caption}>@raghu_varan</Caption>
</View>
</View>
    </View>

<View style={styles.userInfoSection}>
    <View style={styles.row}>
        <Icon name="map-marker-radius" color="#000" size={20}></Icon>
        <Text style={{color:"#000", marginLeft:20, fontSize:20}}>Guntur, Andhra Pradesh</Text>
    </View>
    <View style={styles.row}>
        <Icon name="phone" color="#000" size={20}></Icon>
        <Text style={{color:"#000", marginLeft:20}}>78788878787</Text>
    </View>
    <View style={styles.row}>
        <Icon name="email" color="#000" size={20}></Icon>
        <Text style={{color:"#000", marginLeft:20}}>raghuvaran@gmail.com</Text>
    </View>

</View>

<View style={styles.infoBoxWrapper}>
    <View style={[styles.infoBox,{
        borderRightColor:"#000",
        borderRightWidth:1
    }]}>
        <Title>30</Title>
        <Caption>Total Properties</Caption>
    </View>
    <View style={styles.infoBox}>
        <Title>10</Title>
        <Caption>Properties Sold</Caption>
    </View>
</View>

<View style={styles.menuWrapper}>
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#000" size={25} />
            <Text style={styles.menuItemText}>Favourities</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#000" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#000" size={25} />
            <Text style={styles.menuItemText}>Favourities</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#000" size={25} />
            <Text style={styles.menuItemText}>Favourities</Text>
        </View>
    </TouchableOpacity>

</View>

</SafeAreaView>
  )
}

export default AgentProfile

const styles = StyleSheet.create({
    container:{
        flex:1,
   
    },
    userInfoSection:{
        paddingHorizontal:30,
        marginBottom:25
    },
    title:{
        fontSize:24,
        fontWeight:"bold"

        
    },
    caption:{
        fontSize:14,
        lineHeight:14,
        fontWeight:"500",
        color:"black"
    },
    row:{
        flexDirection:'row',
        marginBottom:10
    },
    infoBoxWrapper:{
borderBottomColor:'#000',
borderBottomWidth:1,
borderTopColor:'#000',
borderTopWidth:1,
flexDirection:'row',
height:100
    },
    infoBox:{
        width:"50%",
        alignItems:"center",
        justifyContent:"center"
    },
    menuWrapper:{
        marginTop:10
    },
    menuItem:{
        flexDirection:'row',
        paddingVertical:15,
        paddingHorizontal:30
    },
    menuItemText:{
        color:'#000',
        marginLeft:20,
        fontWeight:"600",
        fontSize:16,
        lineHeight:26
    }
})