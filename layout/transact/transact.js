import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { styles } from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Log } from "./log";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../components/layout/loader";
import { Tranmodal } from "../../components/tranmodal/tran";

const airtel = require("../../assets/images/airtel.png");
const ninemobile = require("../../assets/images/ninemobile.png");
const mtn = require("../../assets/images/mtn.png");
const glo = require("../../assets/images/glo.png");
const deal = require("../../assets/images/wallet.jpeg");
export const Transact = ({ route }) => {
  const navigation = useNavigation();
  const [tranlist, setTranlist] = useState([]);
  const [token, setToken] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [isTran, setisTran] = useState(false);
  const [load, setisload] = useState({});
  useEffect(() => {
    const first = async () => {
      const name = await AsyncStorage.getItem("username");
      setFirstname(name);
    };
    first;
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      try {
        const formData = new URLSearchParams();
        const idandad = route.params.datar;

        await Log(idandad)
          .then((response) => {
            const data = response.data;
            console.log(data);
            setTranlist(data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("cant get transaction");
      } finally {
        setisLoading(false);
      }
    };

    const unsubscribe = navigation.addListener("focus", fetchData);
    return unsubscribe;
  }, []);

  const openTran = async (load) => {
    setisload(load);
    setisTran((prev) => !prev);
  };
  const closeTran = () => {
    setisTran((prev) => !prev);
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView style={styles.cert}>
       
            {tranlist.map((item, index) => {
              const date = new Date(item.date);

              // Format the date to a specific format (e.g., YYYY-MM-DD HH:MM:SS)
              const formattedDate = date
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.recent}
                  onPress={() => openTran(item)}
                >
                  <Image
                    source={
                      item.network === "airtel"
                        ? airtel
                        : item.network === "mtn"
                        ? mtn
                        : item.network === "glo"
                        ? glo
                        : item.network === "9mobile"
                        ? ninemobile
                        : deal
                    }
                    style={styles.imge}
                  />
                  <View style={styles.info}>
                    <View style={styles.infotext}>
                      <Text style={styles.quitext}>{`${item.buynumber}`}</Text>
                    </View>
                    <View style={styles.infotex}>
                      <Text style={styles.quickys}>&#8358; {item.price}</Text>
                    </View>
                    <View style={styles.infotexts}>
                      <Text style={styles.smatext}>{formattedDate}</Text>
                      <Text style={styles.quicky}> {item.status}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
              /*
if (item.sub_type === 'deposit') {
    return (  
        <TouchableOpacity style={styles.recent} onPress={() => openTran(item)}>
            <Image
                source={
                    item.service.network === 'airtel'
                        ? airtel
                        : item.service.network === 'mtn'
                            ? mtn
                            : item.service.network === 'glo'
                                ? glo
                                : item.network === '9mobile'
                                    ? ninemobile
                                    : deal
                }
                style={styles.imge}
            />
            <View style={styles.info}>
                <View style={styles.infotext}>
                    <Text style={styles.quitext}>{`${item.service?.method}`}</Text>
                </View>
                <View style={styles.infotex}>
                    <Text style={styles.quickys}>&#8358; {item.amount}</Text>
                </View>
                <View style={styles.infotexts}>
                    <Text style={styles.smatext}>{formattedDate}</Text>
                    <Text style={styles.quicky}> {item.status}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}
return (  
    <TouchableOpacity style={styles.recent} onPress={() => openTran(item)}>
        <Image
            source={
                item.service.network === 'airtel'
                    ? airtel
                    : item.service.network === 'mtn'
                        ? mtn
                        : item.service.network === 'glo'
                            ? glo
                            : item.network === '9mobile'
                                ? ninemobile
                                : deal
            }
            style={styles.imge}
        />
        <View style={styles.info}>
            <View style={styles.infotext}>
                <Text style={styles.quitext}>{`${item.service.plan} -${item.service.recipient}`}</Text>
            </View>
            <View style={styles.infotex}>
                <Text style={styles.quickys}>&#8358; {item.amount}</Text>
            </View>
            <View style={styles.infotexts}>
                <Text style={styles.smatext}>{formattedDate}</Text>
                <Text style={styles.quicky}> {item.status}</Text>
            </View>
        </View>

    </TouchableOpacity>
)
*/
            })}

          <Loader visible={isLoading} />
          <Tranmodal
            isShow={isTran}
            load={load}
            name={firstname}
            Closemodal={() => closeTran()}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
