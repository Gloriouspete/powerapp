import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  Modal,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Log, Validate } from "./log.jsx";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./style";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
const deal = require("../../assets/images/verify.png");
const nodeal = require("../../assets/images/cancel.png");

export const Electric = ({ route }) => {
  const [meter, setMeter] = useState("prepaid");
  const [amount, setAmount] = useState("");
  const [selectedProvider, setselectedProvider] = useState("1");
  const [phonenumber, setPhonenumber] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [number, setNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [pics, setPics] = useState("");
  const [isPin, setIspin] = useState(false);
  const [mynumber, setMynumber] = useState("");
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [product, setProducts] = useState([]);
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [meternumber, setMeterNumber] = useState("");
  const [inputsFilled, setInputsDilled] = useState(false);
  const inputsRefs = useRef([]);

  const handleInputChange = (index, text) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newInputs = [...inputs];
      newInputs[index] = text;
      setInputs(newInputs); // Corrected line

      if (text.length === 1 && index < 3) {
        {
          /*}  text !== '' && inputs[index + 1].focus(); */
        }
        inputsRefs.current[index + 1].focus();
      }
    }
  };
  const fetchData = async () => {
    try {
      const response = await Validate();
      setIsloading(false);
      const mydata = response.data;
      console.log("this is the data");
      setProducts(mydata);
    } catch (error) {
      console.error(error);
      setIsloading(false);
    }
  };

  const handleChange = (wells) => {
    setNumber(wells);
  };
  const handleAmount = (lmao) => {
    setAmount(lmao);
  };

  const handleSubmit = async () => {
    setIsloading(true);
    try {
      const response = await Log(
        meternumber,
        selectedProvider,
        meter,
        phonenumber,
        amount
      );
      const mydata = response.data;
      if(mydata.success){
        setModalContent(mydata.message)
        setPics(deal);
        setModalVisible(true);
      }
      else{
        setModalContent(mydata.message)
        setPics(nodeal);
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
      setModalContent(error?.data?.message || "Currently unable to complete this transaction")
      setPics(nodeal);
      setModalVisible(true);
    } finally {
      setIsloading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const alan = () => {
    setIspin(true);
  };

  useEffect(() => {
    setToken(route.params.datar);
    fetchData();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.boxx}>
          <View style={styles.bcont}>
            <Text style={styles.boldtext}>
              Electricity Distribution Company
            </Text>
          </View>
          <View style={styles.boxcont}>
            <Picker
              selectedValue={selectedProvider}
              itemStyle={styles.itemstyle}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) =>
                setselectedProvider(itemValue)
              }
              style={styles.picker}
            >
              {
                product.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.slug} />
                ))
              }
              
            </Picker>
          </View>
          <View style={styles.bcont}>
            <Text style={styles.boldtext}>Meter Type</Text>
          </View>
          <View style={styles.boxcont}>
            <Picker
              selectedValue={meter}
              itemStyle={styles.itemstyle}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => setMeter(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Prepaid" value="prepaid" />
              <Picker.Item label="Postpaid" value="postpaid" />
            </Picker>
          </View>
          <View style={styles.bcont}>
            <Text style={styles.boldtext}>Meter Number</Text>
          </View>
          <TextInput
            style={styles.boxcont}
            value={meternumber}
            onSubmit={(text) => ""}
            keyboardType="numeric"
            onChangeText={(text) => setMeterNumber(text)}
            placeholder=""
          />
          <Text className="font-intermedium my-2">Crosscheck meter number to be certain</Text>
          <View style={styles.bcont}>
            <Text style={styles.boldtext}>Amount</Text>
          </View>

          <TextInput
            style={styles.boxcont}
            value={amount}
            onSubmit={(text) => ""}
            keyboardType="numeric"
            onChangeText={(text) => handleAmount(text)}
            placeholder="Amount"
          />
          <View style={styles.bcont}>
            <Text style={styles.boldtext}>Customer Phone</Text>
          </View>

          <TextInput
            style={styles.boxcont}
            value={phonenumber}
            onSubmit={(text) => ""}
            keyboardType="numeric"
            onChangeText={(text) => setPhonenumber(text)}
            placeholder=""
          />

          <View style={styles.idancover}>
            <Pressable style={styles.idan} onPress={alan}>
              <Text style={styles.buttonin}>Proceed</Text>
            </Pressable>
          </View>
        </View>
        <Modal
          visible={modalVisible}
          onRequestClose={closeModal}
          animationType="slide"
        >
          <View style={styles.modalcontain}>
            <View style={styles.modalcontent}>
              <Image source={pics} style={styles.imgsrc}></Image>
              <Text style={styles.modaltext}>{modalContent}</Text>
              <Pressable style={styles.idan} onPress={closeModal}>
                <Text style={styles.buttonin}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal visible={isLoading} transparent={true}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size={50} color="red" />
          </View>
        </Modal>
        <Modal visible={isPin} transparent={true}>
          <View style={styles.pinback}>
            <View style={styles.pinmod}>
              <View style={styles.small}>
                <Pressable
                  style={styles.pressmall}
                  onPress={() => setIspin(false)}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={17}
                    color="black"
                  />
                </Pressable>
              </View>
              <Text style={styles.textmod}>ENTER PAYMENT PIN</Text>
              <View style={styles.pinmodal}>
                {inputs.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputsRefs.current[index] = ref)}
                    style={styles.inputmod}
                    onSubmitEditing={() => handleSubmit()}
                    placeholder={`${index + 1}`}
                    keyboardType="numeric"
                    secureTextEntry={true}
                    value={value}
                    onChangeText={(text) => handleInputChange(index, text)}
                    maxLength={1}
                  />
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};
