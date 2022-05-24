import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';
import notifee, {AndroidStyle} from '@notifee/react-native';

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

  async function onDisplayNotification() {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default',
    });

    await notifee.displayNotification({
      title: 'Notification',
      body: 'Hey, Vaibhav! This is test notification',
      android: {
        channelId,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
        actions: [
          {
            title: 'Snooze',
            icon: 'https://my-cdn.com/icons/snooze.png',
            pressAction: {
              id: 'snooze',
            },
          },
        ],
      },
      ios: {
        attachments: [
          {
            url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          },
        ],
      },
    });
  }

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
      <TouchableOpacity
        style={styles.webViewBtn}
        onPress={() => onDisplayNotification()}>
        <Text style={styles.webViewTxt}>Notifee</Text>
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
