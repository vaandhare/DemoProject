import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleToast from 'react-native-simple-toast';

const LoginPage = ({navigation}) => {
  const loginValues = {
    email: 'vaibhav@gmail.com',
    password: '123456',
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateUser = async () => {
    if (email === loginValues.email && password === loginValues.password) {
      try {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('session', 'true');

        SimpleToast.show('Login Successful');
        navigation.navigate('home');
      } catch (e) {
        SimpleToast.show('Login failed');
      }
    } else {
      SimpleToast.show('Authentication failed!');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputs}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.textInputs}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.8}
        onPress={validateUser}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputs: {
    height: 50,
    width: '80%',
    borderRadius: 5,
    color: '#000',
    borderWidth: 1,
    borderColor: '#000',
    padding: 15,
    margin: 8,
    fontSize: 16,
  },
  loginButton: {
    width: '80%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#000',
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
  },
});
