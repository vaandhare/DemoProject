import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';

const HomePage = ({navigation}) => {
  const [input, setInput] = useState('');

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        setInput(value.split('@')[0]);
      }
    } catch (e) {
      SimpleToast.show('Failed to fetch the input from storage');
    }
  };

  const nav = useNavigation();

  useEffect(() => {
    readData();
    nav.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.setItem('session', 'false');
            await AsyncStorage.clear();
            navigation.navigate('login');
          }}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, {input}!</Text>
      <TouchableOpacity
        style={styles.webViewBtn}
        onPress={() => navigation.navigate('webview')}>
        <Text style={styles.webViewTxt}>Web View</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.webViewBtn}
        onPress={() => navigation.navigate('listview')}>
        <Text style={styles.webViewTxt}>List View</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
  logout: {
    color: '#000',
    fontSize: 16,
  },
  webViewBtn: {
    width: '50%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#000',
  },
  webViewTxt: {
    color: '#fff',
    fontSize: 18,
  },
});
