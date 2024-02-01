import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ReactNativeFirebase } from '@react-native-firebase/app';

const EmailPassAuth = (props) => {
  const [email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState(''); 
  const [password, setPassword] = useState('');
  const [url, setUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const createUser = async () => {
    try {
      const response = await auth()
        .createUserWithEmailAndPassword(email, password,Name,Phone,url); // Remove 'url' parameter
      const user = response.user;
      const userData = {
        userId:user.uid,
        Name:Name,
        username: email,
        url: url,
        Phone:Phone,
        password: password
      };

      await firestore().collection("cred").doc(user.uid).set(userData); // Use 'firestore' instead of 'Firestore'

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

  const editUserData = async (newData) => {
    try {
      const user = auth().currentUser;
  
      if (!user) {
        console.error('No authenticated user found.');
        return;
      }
  
      const userId = user.uid;
  
      const updateData = {
        Name: Name,
        Phone: Phone,
        url: url,
      };
  
      // Use the update method to update the existing document with new data
      await firestore().collection('cred').doc(userId).update(updateData);
    
        // If successful, navigate to the home screen
   

      // Fetch and update the user data again to reflect the changes
   
  
      console.log('User data updated successfully!');
      alert("User data updated successfully!");
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  
  return (
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
         editUserData ();
        }}>
        <Text style={{ color: '#fff' }}>Update</Text>
      </TouchableOpacity>

      
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Already have an account ? {' '}</Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
          <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailPassAuth;