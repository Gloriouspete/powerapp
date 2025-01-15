import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Entypo,
  AntDesign,
  Ionicons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { styles } from "./style";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

export const Setpass = ({ route }) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [secondpass, Setsecond] = useState("");
  const [fake, setFake] = useState("");
  const [content, setContent] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    const setp = route.params.datar;
    setPhonenumber(setp);
    console.log(setp);
  }, []);

  const handleSubmit = async () => {
    if (secondpass === "" || password === "") {
      setIsloading(false);
      setIncorrect(true);
      setContent("Inputs Are not meant to be empty");
      return;
    }
    if (password !== secondpass) {
      setIsloading(false);
      setIncorrect(true);
      setContent("Both passwords are not the same!");
      return;
    }
    const formData = new URLSearchParams();
    formData.append("password", password);
    setIsloading(true);
    try {
      const response = await axios.post(
        "https://api.powerpaybill.com.ng/ap1/v1/setpass",
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: phonenumber,
          },
        }
      );

      const mydata = response;
      console.log("na my data be this", mydata);
      if (mydata === "approved") {
        setIncorrect(true);
        setContent("Account password Successfully Changed");
        console.log("i want to check if number exist", password);
        setIsloading(false);
      } else {
        setIsloading(false);
        setIncorrect(true);
        setContent(mydata);
      }
    } catch (error) {
      console.log(error.response);
      console.log("cant log in, dont know why");
      setIsloading(false);
      setIncorrect(true);
      setContent("Error setting password");
    } finally {
      setIsloading(false); // Stop loading when the request is completed
    }
  };
  const closeModal = () => {
    setIncorrect(false);
  };
  return (
    <>
      <ScrollView style={styles.cert}>
        <View style={styles.previewbox}>
          <Text style={styles.create}>Change Password</Text>
          <Text style={styles.textsmaller}> </Text>
          <Text style={styles.textsmall}>Enter New Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="****"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Text style={styles.textsmall}>Re-enter Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="****"
            value={secondpass}
            onChangeText={(value) => Setsecond(value)}
          />
          <View style={styles.boxcont}>
            <Pressable
              style={styles.hutton}
              title="Sign Up"
              onPress={() => handleSubmit()}
            >
              <Text style={styles.press}>Done</Text>
            </Pressable>
          </View>
          <Modal visible={isLoading} transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="red" />
            </View>
          </Modal>
          <Modal
            visible={incorrect}
            transparent={true}
            onRequestClose={closeModal}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.vowbox}>
                <Text style={styles.idan}>{content}</Text>
                <Pressable style={styles.idanm} onPress={closeModal}>
                  <FontAwesome name="close" size={26} />
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </>
  );
};
