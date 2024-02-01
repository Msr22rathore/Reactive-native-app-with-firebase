import React, { useState } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

const EmailPasAuth = (props) => {
  const [email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6; // You can adjust the length as per your requirements
  };

  const isValidPhoneNumber = (Phone) => {
    return /^\d{10}$/.test(Phone); // Validates if the phone number consists of 10 digits only
  };

  

  
  const createUser = async () => {



    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isValidPassword(password)) {
      alert('Password must be at least 6 characters long');
      return;
    }

    if (!isValidPhoneNumber(Phone)) {
      alert('Please enter a valid phone number (10 digits)');
      return;
    }

    try {
      const response = await auth().createUserWithEmailAndPassword(email, password);
      const user = response.user;
      const userData = {
        userId: user.uid,
        Name: Name,
        username: email,
        url: url,
        Phone: Phone,
        password: password
      };

      await firestore().collection("cred").doc(user.uid).set(userData);

      alert('User account created & signed in!');
      console.log('User added to Firestore');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'purple', fontSize: 64, fontWeight: 'bold', marginTop: 80 }}>Tiffin</Text>
          <Text style={{ color: '#ADD8E6', fontSize: 25, marginBottom: 20, fontWeight: 'bold' }}>Enter User Details </Text>
        </View>
        <TextInput
          placeholder="Enter Full name"
          value={Name}
          onChangeText={(txt) => setName(txt)}
          style={{
            width: '90%',
            height: 55,
            borderWidth: 0.5,
            marginTop: 30,
            borderRadius: 20,
            paddingLeft: 20,
          }}
        />
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={(txt) => setEmail(txt)}
          style={{
            width: '90%',
            height: 55,
            borderWidth: 0.5,
            marginTop: 30,
            borderRadius: 20,
            paddingLeft: 20,
          }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Enter Password"
            value={password}
            onChangeText={(txt) => setPassword(txt)}
            secureTextEntry={!showPassword}
            style={{
              width: '90%',
              height: 55,
              borderWidth: 0.5,
              marginTop: 30,
              borderRadius: 20,
              paddingLeft: 20,
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} style={{ marginLeft: -30, marginTop: 30 }} />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Enter Phone name"
          value={Phone}
          onChangeText={(txt) => setPhone(txt)}
          style={{
            width: '90%',
            height: 55,
            borderWidth: 0.5,
            marginTop: 30,
            borderRadius: 20,
            paddingLeft: 20,
          }}
        />

        <TextInput
          placeholder="Enter Url"
          value={url}
          onChangeText={(txt) => setUrl(txt)}
          style={{
            width: '90%',
            height: 55,
            borderWidth: 0.5,
            marginTop: 30,
            borderRadius: 20,
            paddingLeft: 20,
          }}
        />

        <TouchableOpacity
          style={{
            width: '90%',
            height: 55,
            borderRadius: 20,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}
          onPress={() => {
            createUser();
          }}>
          <Text style={{ color: '#fff' }}>Sign up</Text>
        </TouchableOpacity>

        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Already have an account ? {' '}</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmailPasAuth;