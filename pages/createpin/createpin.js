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
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Entypo,
  AntDesign,
  Ionicons,
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { styles } from "./style";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Log } from "./log";

export const Createpin = ({ route }) => {
  const [Email, setEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [sure, setSure] = useState(false);
  const [otp, setOtp] = useState("");
  const [thepin, setThepin] = useState("");
  const [token, setToken] = useState("");
  const [content, setContent] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [inputsFilled, setInputsDilled] = useState(false);
  const inputsRef = [useRef(), useRef(), useRef(), useRef()];
  const inputsRefs = useRef([]);
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState("I'd do it later");

  useEffect(() => {
    if (route.params?.datar) {
      setToken(route.params.datar);
      AsyncStorage.setItem("token", route.params.datar);
      console.log("check this out", route.params.datar);
    } else {
      alert("restart the app");
    }
  }, []);

  const Refreshed = async () => {
    alert("A transaction pin is necessary to use The App");
  };
  const handleKeyPress = (key) => {
    const updatedInput = [...inputs];
    const emptyinputindex = updatedInput.findIndex((digit) => digit === "");

    if (emptyinputindex !== -1) {
      updatedInput[emptyinputindex] = key;
      setInputs(updatedInput);
      if (emptyinputindex === 3) {
        modalpo(key);
      }
    }
  };
  const handleDeletePress = () => {
    const updatedInput = [...inputs].reverse();
    const emptyinputindex = updatedInput.findIndex((digit) => digit !== "");

    if (emptyinputindex !== -1) {
      updatedInput[emptyinputindex] = "";
      setInputs(updatedInput.reverse());
    }
    /*
        if(emptyinputindex < 3) {
            inputsRefs[emptyinputindex - 1 ]
        }
        */
  };
  const modalpo = (key) => {
    const pincod = inputs.join("");
    const mafor = pincod + key;
    const pincode = parseInt(mafor, 10);
    console.log(pincode);
    setSure(true);
    setContent(pincode);
    setThepin(pincode);
  };
  const setpinFunc = async (onpin) => {
    setIsloading(true);
    console.log(onpin, "see the pin o");
    try {
      const response = await Log(onpin.toString(), token);
      console.log(response, token);
      if (response.data) {
        setIsloading(false);
        alert("Your Transaction pin is successfully set");
        navigation.navigate("Home", { datar: token });
      } else {
        setIsloading(false);
        alert(
          "We are currently unable to continue with setting your pin, Please try again"
        );
      }
    } catch (error) {
      setIsloading(false);
      console.log(error.response);
      alert("Error setting your transaction pin");
    }
  };

  const handleSubmit = async () => {
    const pincod = thepin;
    console.log("This is the pin", pincod);
    setSure(false);
    setpinFunc(thepin);
  };
  const handleRetrieve = async () => {
    const formData = new URLSearchParams();
    formData.append("phonenumber", phonenumber.trim());
    formData.append("password", password.trim());
    console.log(formData);
    setIsloading(true);
    try {
      const response = await axios.post(
        "https://heydata-bntj.onrender.com/getotp",
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const mydata = response.data;
      console.log("na my data be this", mydata);
      if (mydata.message === "success") {
        setIncorrect(true);
        setOtp(mydata.data);
        console.log("i want to check if number exist", password);
        setIsloading(false);
      } else {
        setIsloading(false);
        setIncorrect(true);
        alert("error getting otp, please contact customer care");
      }
    } catch (error) {
      console.log(error);
      console.log("cant log in, dont know why");
      setIsloading(false);
      setIncorrect(true);
      setContent("Error setting password");
    } finally {
      setIsloading(false); // Stop loading when the request is completed
    }
  };
  const closeModal = () => {
    setSure(false);
  };
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View className="flex-i w-screen h-screen">
          <View style={styles.pinmod}>
            <Text style={styles.textmod}>
              Create Four Digits Transaction Pin
            </Text>
            <View style={styles.pinmodal}>
              {inputs.map((value, index) => (
                <TextInput
                  key={index}
                  //  ref={inputsRef[index]}
                  style={styles.inputmod}
                  onSubmitEditing={() => handleSubmit()}
                  placeholder="*"
                  keyboardType="numeric"
                  secureTextEntry={true}
                  value={value}
                  onChangeText={(text) => handleInputChange(index, text)}
                  maxLength={1}
                  editable={false}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.pressmall}
              onPress={() => Refreshed()}
            >
              <Text style={{ color: "green", fontWeight: "700" }}>
                {refresh}
              </Text>
            </TouchableOpacity>
            <View style={styles.numberbox}>
              <TouchableOpacity
                style={styles.numpress}
                onPress={() => handleKeyPress("1")}
              >
                <Text style={{ fontWeight: 700, fontSize: 23 }}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numpress}
                onPress={() => handleKeyPress("2")}
              >
                <Text style={{ fontWeight: 700, fontSize: 23 }}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numpress}
                onPress={() => handleKeyPress("3")}
              >
                <Text style={{ fontWeight: 700, fontSize: 23 }}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numpress}
                onPress={() => handleKeyPress("4")}
              >
                <Text style={{ fontWeight: 700, fontSize: 23 }}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numpress}
                onPress={() => handleKeyPress("5")}
              >
                <Text style={{ fontWeight: 700, fontSize: 23 }}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numpress}
                onPress={() => handleKeyPress("6")}
              >
                <Text style={{ fontWeight: 700, fontSize: 23 }}>6</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numpress}
                onPress={() => handleKeyPress("7")}
              >
                <Text style={{ fontWeight: 700, fontSize: 23 }}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numpress}
                onPress={() => handleKeyPress("8")}
              >
                <Text style={{ fontWeight: 700, fontSize: 23 }}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numpress}
                onPress={() => handleKeyPress("9")}
              >
                <Text style={{ fontWeight: 700, fontSize: 23 }}>9</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numpres}>
                <Text style={{ fontWeight: 700, fontSize: 23 }}></Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numpress}
                onPress={() => handleKeyPress("0")}
              >
                <Text style={{ fontWeight: 700, fontSize: 23 }}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.numpres}
                onPress={handleDeletePress}
              >
                <Feather name="delete" size={23} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <Modal visible={sure} transparent={true} onRequestClose={closeModal}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.vowbox}>
                <Text style={styles.idan}>Set {content} As your Pin?</Text>
                <TouchableOpacity style={styles.idanm} onPress={handleSubmit}>
                  <Text
                    style={{ color: "white", fontWeight: "800", fontSize: 19 }}
                  >
                    Yes,Sure
                  </Text>
                </TouchableOpacity>
                <Text
                  onPress={closeModal}
                  style={{ color: "black", fontWeight: "400", fontSize: 17 }}
                >
                  No abeg
                </Text>
              </View>
            </View>
          </Modal>
          <Modal visible={isLoading} transparent={true}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.boxcenter}>
                <ActivityIndicator size={30} color="black" />
                <Text style={styles.pleasewait}> Signing in ...</Text>
              </View>
            </View>
          </Modal>
          <StatusBar style="dark" />
        </View>
      </ScrollView>
    </>
  );
};
