





import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { styles } from '../time';

export const Data = () => {
  const [accbalance, setAccbalance] = useState('0');
  const [selected, setSelected] = useState('01');
  const [secondlet, setSecondlet] = useState(null);
  const [second, setSecond] = useState('read');
  const [products, setProducts] = useState([]);
  const [texts, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleChange = (text) => {
    setText(text);
  };

  useEffect(() => {
    axios
      .post('http://192.168.1.135:3000/getall')
      .then((response) => {
        const mydata = response.data;

        if (mydata !== undefined) {
          setAccbalance(mydata.accountbalance);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let network = '';

      if (selected === '01') {
        network = 'MTN';
      } else if (selected === '02') {
        network = 'Glo';
      } else if (selected === '03') {
        network = 'm_9mobile';
      } else if (selected === '04') {
        network = 'Airtel';
      }

      try {
        const response = await axios.post(
          'http://192.168.1.135:3000/suppy',
          { selected: network },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selected]);

  const handleSubmit = () => {
    if (secondlet) {
      const { PRODUCT_AMOUNT, PRODUCT_ID } = secondlet;
      const formData = new FormData();
      formData.append('netcode', selected);
      formData.append('dataplan', PRODUCT_ID);
      formData.append('dataamount', PRODUCT_AMOUNT);
      formData.append('number', texts);

      axios
        .post('http://192.168.1.135:3000/buydata', formData)
        .then((response) => {
          console.log(response.data);
          const reppin = response.data;
          if (reppin === 'successful') {
            setModalContent('ORDER SUCCESSFUL');
            setModalVisible(true);
          } else if (reppin === 'failed') {
            setModalContent('ORDER FAILED!');
            setModalVisible(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.boxx}>
        <View style={styles.boxcorner}>
          <Text style={styles.stopl}>Balance -- {accbalance}</Text>
        </View>
        <View style={styles.boxcont}>
          <Picker
            selectedValue={selected}
            itemStyle={styles.itemstyle}
            mode="dropdown"
            onValueChange={(itemValue) => setSelected(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="MTN" value="01" />
            <Picker.Item label="AIRTEL" value="04" />
            <Picker.Item label="9MOBILE" value="03" />
            <Picker.Item label="GLO" value="02" />
          </Picker>
        </View>
        <View style={styles.boxcont}>
          <Picker
            selectedValue={second}
            itemStyle={styles.itemstyle}
            mode="dropdown"
            onValueChange={(itemValue) => setSecond(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="SME" value="sme" />
          </Picker>
        </View>

        <View style={styles.boxcont}>
          <Picker
            selectedValue={secondlet}
            itemStyle={styles.itemstyle}
            mode="dropdown"
            onValueChange={(itemValue) => setSecondlet(itemValue)}
            style={styles.picker}
          >
            {products.map((product) => (
              <Picker.Item
                key={product.PRODUCT_ID}
                label={`${product.PRODUCT_NAME} - NGN ${product.PRODUCT_AMOUNT}`}
                value={product}
              />
            ))}
          </Picker>
        </View>

        <TextInput
          style={styles.boxconta}
          value={texts}
          onChangeText={handleChange}
          placeholder="Enter Phone number"
        />
        <View style={styles.idancover}>
          <Pressable style={styles.idan} onPress={handleSubmit}>
            <Text style={styles.buttonin}>Purchase</Text>
          </Pressable>
        </View>
      </View>
      <Modal visible={modalVisible} onRequestClose={closeModal} animationType="slide">
        <View style={styles.modalcontain}>
          <View style={styles.modalcontent}>
            <Text style={styles.modaltext}>{modalContent}</Text>
            <Pressable style={styles.idan} onPress={closeModal}>
              <Text style={styles.buttonin}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};


