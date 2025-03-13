import React, { useEffect, useState } from "react";
import { Alert, Button, Text, ToastAndroid, TouchableOpacity } from "react-native";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Using Material Icons for eye icon
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { combineTransition } from "react-native-reanimated";
import { faL } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import i18n from "../i18n";

function ChangePassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

  const [language,setLanguage]=useState(i18n.locale)

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVerify, setPasswordVerify] = useState(false);

  const [passwordVerify1, setPasswordVerify1] = useState(false);

  const [passwordVerify2, setPasswordVerify2] = useState(false);

  const handlePasswordChange = (text) => {
    setPassword(text);
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,10}$/;

    setPasswordVerify(passwordPattern.test(text));
  };

  const handlePasswordChange1 = (text) => {
    setNewPassword(text);
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,10}$/;

    setPasswordVerify1(passwordPattern.test(text));
  };
  const handlePasswordChange2 = (text) => {
    setConfirmPassword(text);
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,10}$/;

    setPasswordVerify2(passwordPattern.test(text));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordVisibility1 = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const togglePasswordVisibility2 = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  useEffect(() => {
    fetchData();
    loadLanguage();
  }, []);


  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem('language');
    if (savedLanguage) {
      i18n.locale = savedLanguage;
      setLanguage(savedLanguage)
    }
  };

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("userToken");

    const decoded = jwtDecode(token);

    const email = decoded.user.email;
    setEmail(email);
  };

  const verify = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords should match");
      return false;
    } else {
      return true;
    }
  };

  const handleChangePassward = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
console.log("abcd....")
      if (verify) {
        const data = {
          email: email,
          password: newPassword,
        };

        await axios(`https://real-estate-back-end-y58p-git-main-pindu123s-projects.vercel.app/resetPassword`, {
          method: "put",
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => {
            ToastAndroid.showWithGravityAndOffset(
                  'Password Changed Successfully',
                  ToastAndroid.BOTTOM,
                  ToastAndroid.LONG,
                  25,
                  50
                );

                setPassword("")
                setNewPassword("")
                setConfirmPassword("")
            console.log("response", resp.data);
          })
          .catch((error) => {
            ToastAndroid.showWithGravityAndOffset(
              'Password Updation Failed',
              ToastAndroid.BOTTOM,
              ToastAndroid.LONG,
              25,
              50
            );
            console.log("error", error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={i18n.t("Current Password")}
          style={styles.input}
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={(value) => handlePasswordChange(value)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}
        >
          <MaterialIcons
            name={isPasswordVisible ? "visibility-off" : "visibility"} // Show closed eye if password is visible, open eye otherwise
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {!passwordVerify && password.length > 0 && (
        <Text style={styles.errorText}>
          Password must include letters, numbers, and symbols
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={i18n.t("New Password")}
          style={styles.input}
          secureTextEntry={!isNewPasswordVisible}
          value={newPassword}
          onChangeText={(value) => handlePasswordChange1(value)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility1}
        >
          <MaterialIcons
            name={isNewPasswordVisible ? "visibility-off" : "visibility"} // Show closed eye if password is visible, open eye otherwise
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {!passwordVerify1 && newPassword.length > 0 && (
        <Text style={styles.errorText}>
          Password must include letters, numbers, and symbols
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={i18n.t("Confirm Password")}
          style={styles.input}
          value={confirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
          onChangeText={(value) => handlePasswordChange2(value)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility2}
        >
          <MaterialIcons
            name={isConfirmPasswordVisible ? "visibility-off" : "visibility"} // Show closed eye if password is visible, open eye otherwise
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {!passwordVerify2 && confirmPassword.length > 0 && (
        <Text style={styles.errorText}>
          Password must include letters, numbers, and symbols
        </Text>
      )}
      <View>
        <TouchableOpacity onPress={() => handleChangePassward}>
          <Button title={i18n.t("Save")} onPress={()=>handleChangePassward()}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ChangePassword;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    // borderBottomColor: '#007BFF',
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#495057",
  },
  eyeIcon: {
    position: "absolute",
    right: 5,
    top: 15, // Position the eye icon inside the input box
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginVertical: 5,
  },
});
