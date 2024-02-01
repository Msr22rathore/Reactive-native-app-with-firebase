import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
const EmailPassAuth = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 6; // You can adjust the length as per your requirements
  };
  const userSignin = () => {

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!isValidPassword(password)) {
      alert('Password must be at least 6 characters long');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // If successful, navigate to the home screen
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        // If unsuccessful, show an error message
        Alert.alert('Error', 'Invalid email or password. Please try again.');
        console.error(error);
      });
  };

  const resetPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset link has been sent successfully");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'purple', fontSize: 64, fontWeight: 'bold', marginTop: 80 }}>Login</Text>
      </View>
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
      
      <View style={{}}>
    
      </View>
      <TouchableOpacity style={{
        margin: 10,
        alignItems: 'center',
      }}
        onPress={() => resetPassword()}>
        <Text style='grey'>
          Forgot password?
        </Text>
      </TouchableOpacity>
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
        onPress={() => userSignin()}>
        <Text style={{ color: '#fff' }}>Login</Text>
        
      </TouchableOpacity>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Make  an account ? {' '}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EmailPassAuth')}>
          <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16 }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
};

export default EmailPassAuth;