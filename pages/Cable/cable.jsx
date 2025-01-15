import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Log, Validate,Select } from "./log.jsx";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./style";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
const deal = require("../../assets/images/verify.png");
const nodeal = require("../../assets/images/cancel.png");
import SpinningImage from "../../spins";
import Loader from "../../components/layout/loader";
import Pinmodal from "../../components/pinmodal/pinmodal";

export const Cable = ({ route }) => {
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState("gotv");
  const [secondlet, setSecondlet] = useState({});
  const [texts, setText] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [number, setNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [pics, setPics] = useState("");
  const [isPin, setIspin] = useState(false);
  const [mytoken, setMytoken] = useState("");
  const navigation = useNavigation();
  const [inputs, setInputs] = useState(["", "", "", ""]);
  const [inputsFilled, setInputsDilled] = useState(false);
  const inputsRefs = useRef([]);
  const [products, setProducts] = useState([]);
  const [charge, setCharge] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [cardnumber, setCardnumber] = useState("");

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
  const changeData = async () => {
    setIsloading(true);
    if (selected === "gotv" || selected === "dstv") {
      console.log("gotv or dstv");
      setCharge("\u20A6 99 Charge");
    } else if (selected === "startimes") {
      console.log("startimes");
      setCharge("\u20A6 0 Charge");
    }

    try {
      console.log("got here");
      const cableplans = await Validate(selected);
      setIsloading(false);
      const ncable = cableplans.data;
      setProducts(ncable);
      setSecondlet(ncable[0])
    } catch (error) {
      setIsloading(false);
    }
  };


  const validate = async () => {
    setIsloading(true);
    try {
      const result = await Validate(cardnumber, selected);
      const errorlog = result.data.error;
      if (errorlog) {
        console.log(result.data.error);
        setModalContent(result.data.error);
        setPics("");
        setModalVisible(true);
        setIsloading(false);
      }
    } catch (error) {
      setIsloading(false);
      alert('Error validating IUC Number,Press ok to continue ')
    }
  };
  useEffect(() => {
    changeData();
    console.log("got here now now");
  }, [selected]);

  useEffect(() => {
    if (number.length === 10) {
      validate();
    }
  }, [number]);

  useEffect(() => {
    setMytoken(route.params.datar);
    console.log(route.params.datar);
  }, []);

  const handleSubmit = async () => {
    console.log(secondlet)
    setIsloading(true);
    try {
      const response = await Log(
        cardnumber,
        selected,
        secondlet.variation_code,
        secondlet.variation_amount,
        phonenumber
      );

     
      console.log("stop playing", response.data);
      const reppin = response.data;
      if (reppin.success) {
        setModalContent(reppin.message);
        setPics(deal);
        setModalVisible(true);
      } else if (!reppin.success) {
        setPics(nodeal);
        setModalContent(reppin.message);

        setModalVisible(true);
      } else {
        setModalContent("Error:Check Inputted details");
        setPics(nodeal);
        setModalVisible(true);
      }
    } catch (error) {
      console.error(error);
      setModalContent(error?.data);
      setPics(nodeal);
      setModalVisible(true);
    }
    finally {
      setIsloading(false);
    }
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const closePin = () => {
    setIspin(false);
  };
  const incorrectpin = async () => {
    setPics(nodeal);
    setModalContent('Incorrect Pin');
    setModalVisible(true);
}
  const alan = () => {
    setIspin(true);
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.boxx}>
          <View style={styles.bcont}>
            <Text style={styles.boldtext}>Cable Service</Text>
          </View>
          <View style={styles.boxcont}>
            <Picker
              selectedValue={selected}
              itemStyle={styles.itemstyle}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="GOTV" value="gotv" />
              <Picker.Item label="DSTV" value="dstv" />
              <Picker.Item label="STARTIME" value="startimes" />
            </Picker>
          </View>
          <View style={styles.bcont}>
            <Text style={styles.boldtext}>
              Smartcard / Decoder / IUC number
            </Text>
          </View>
          <TextInput
            style={styles.boxcont}
            value={cardnumber}
            onSubmit={(text) => ""}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={(text) => setCardnumber(text)}
            placeholder="IUC number"
          />
          <View style={styles.bcont}>
            <Text style={styles.boldtext}>Cable Subsciption Plan</Text>
          </View>
          <View style={styles.boxcont}>
            <Picker
              selectedValue={secondlet}
              itemStyle={styles.itemstyle}
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => setSecondlet(itemValue)}
              style={styles.picker}
            >
              {products.map((product, index) => (
                <Picker.Item
                  key={index}
                  label={`${product.name}`}
                  value={product}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.bcont}>
            <Text style={styles.boldtext}>Enter Phone number</Text>
          </View>

          <TextInput
            style={styles.boxcont}
            value={phonenumber}
            onSubmit={(text) => ""}
            keyboardType="numeric"
            maxLength={13}
            onChangeText={(text) => setPhonenumber(text)}
            placeholder="phone number"
          />
          <Text style={styles.boxc}>{charge}</Text>

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
        <Loader visible={isLoading} />
        <Pinmodal visible={isPin} onSuccess={() => handleSubmit()} onFail={() => incorrectpin()} onClose={() => closePin()} />
      </ScrollView>
    </>
  );
};
