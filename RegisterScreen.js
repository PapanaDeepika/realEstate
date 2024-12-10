
// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';

// const RegisterScreen = () => {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [country, setCountry] = useState('');
//     const [state, setState] = useState('');
//     const [district, setDistrict] = useState('');
//     const [pincode, setPincode] = useState('');
//     const [city, setCity] = useState('');
//     const [mandal, setMandal] = useState('');
//     const [role, setRole] = useState('');



//     const handleRegister = async () => {
//         if (password === confirmPassword) {
//             const roleNumber = role === "agent" ? 1 : role === "seller" ? 2 : 3;

//             try {
//                 const response = await axios.post('http://172.17.15.53:3000/create', {
//                     firstName,
//                     lastName,
//                     email,
//                     phoneNumber: phone,
//                     password,
//                     country,
//                     state,
//                     district,
//                     pinCode: pincode,
//                     city,
//                     mandal,
//                     role: roleNumber,
//                 });
//                 console.log('Registered successfully:', response.data);
//             } catch (error) {
//                 if (error.response) {
//                     console.error('Error registering user:', error.response.data);
//                     console.error('Error status:', error.response.status);
//                 } else {
//                     console.error('Error registering user:', error.message);
//                 }
//             }
//         } else {
//             console.log('Passwords do not match!');
//         }
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>

//             <Text style={styles.header}>Register</Text>

//             <TextInput
//                 placeholder="First Name"
//                 value={firstName}
//                 onChangeText={setFirstName}
//                 style={styles.input}
//             />


//             <TextInput
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChangeText={setLastName}
//                 style={styles.input}
//             />


//             <TextInput
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 style={styles.input}
//             />


//             <TextInput
//                 placeholder="Phone Number"
//                 value={phone}
//                 onChangeText={setPhone}
//                 style={styles.input}
//             />


//             <TextInput
//                 placeholder="Password"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//                 style={styles.input}
//             />


//             <TextInput
//                 placeholder="Confirm Password"
//                 secureTextEntry
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 style={styles.input}
//             />

//             <TextInput
//                 placeholder="Country"
//                 value={country}
//                 onChangeText={setCountry}
//                 style={styles.input}
//             />

//             <TextInput
//                 placeholder="State"
//                 value={state}
//                 onChangeText={setState}
//                 style={styles.input}
//             />
            
//             <TextInput
//                 placeholder="District"
//                 value={district}
//                 onChangeText={setDistrict}
//                 style={styles.input}
//             />
//             <TextInput
//                 placeholder="Pin Code"
//                 value={pincode}
//                 onChangeText={setPincode}
//                 style={styles.input}
//             />
//             <TextInput
//                 placeholder="City"
//                 value={city}
//                 onChangeText={setCity}
//                 style={styles.input}
//             />
//             <TextInput
//                 placeholder="Mandal"

//                 value={mandal}

//                 onChangeText={setMandal}

//                 style={styles.input}
//             />
//             <Text style={styles.label}>Select Role:</Text>
//             <Picker
//                 selectedValue={role}
//                 onValueChange={(itemValue) => setRole(itemValue)}
//                 style={styles.picker}
//             >
//                 <Picker.Item label="Select a role" value="" />
//                 <Picker.Item label="Agent" value="agent" />
//                 <Picker.Item label="Seller" value="seller" />
//                 <Picker.Item label="Buyer" value="buyer" />

//             </Picker>
//             <Button title="Register" onPress={handleRegister} color="#007BFF" />
//         </ScrollView>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: 20,
//         backgroundColor: '#f7f9fc',
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     input: {
//         height: 50,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 8,
//         paddingHorizontal: 10,
//         marginBottom: 15,
//         backgroundColor: '#fff',
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 10,
//         fontWeight: 'bold',
//     },
//     picker: {
//         height: 50,
//         marginBottom: 15,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 8,
//         backgroundColor: '#fff',
//     },
// });
// export default RegisterScreen;


import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [mandal, setMandal] = useState('');
  const [role, setRole] = useState('');
  const navigation=useNavigation();

  const handleRegister = async () => {
    if (password === confirmPassword) {
      // const roleNumber = role === "agent" ? 1 : role === "seller" ? 2 : 3;
      const roleNumber =
  role === "admin"
    ? 0
    : role === "csr"
    ? 5
    : role === "agent"
    ? 1
    : role === "seller"
    ? 2
    : 3; // Default role number (optional)


      try {
        const response = await axios.post('http://172.17.15.53:3000/create', {
          firstName,
          lastName,
          email,
          phoneNumber: phone,
          password,
          country,
          state,
          district,
          pinCode: pincode,
          city,
          mandal,
          role: roleNumber,
        });
        console.log('Registered successfully:', response.data);
      } catch (error) {
        if (error.response) {
          console.error('Error registering user:', error.response.data);
          console.error('Error status:', error.response.status);
        } else {
          console.error('Error registering user:', error.message);
        }
      }
      } else {
      console.log('Passwords do not match!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Register</Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.label}>Select Role:</Text>
      <Picker
        selectedValue={role}
        onValueChange={(itemValue) => setRole(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select a role" value="" />
        <Picker.Item label="Agent" value="agent" />
        <Picker.Item label="Seller" value="seller" />
        <Picker.Item label="Buyer" value="buyer" />
        <Picker.Item label="csr" value="csr"/>
        <Picker.Item label="admin" value="admin"/>

      </Picker>

      <TextInput
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
        style={styles.input}
      />

      <TextInput
        placeholder="State"
        value={state}
        onChangeText={setState}
        style={styles.input}
      />

      <TextInput
        placeholder="District"
        value={district}
        onChangeText={setDistrict}
        style={styles.input}
      />

      <TextInput
        placeholder="Pincode"
        value={pincode}
        onChangeText={setPincode}
        style={styles.input}
      />

      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <TextInput
        placeholder="Mandal"
        value={mandal}
        onChangeText={setMandal}
        style={styles.input}
      />

      <Button title="Register" style={styles.loginbtn}onPress={handleRegister} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginbtn:{

    backgroundColor: '#05223F',

  },
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds shadow on Android
    margin: 20,
  },
  header: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#05223f',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    height: 45,
    borderColor: '#007BFF',
    borderWidth: 1.5,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Adds shadow on Android
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#495057',
    fontWeight: '600',
  },
});

export default RegisterScreen;







