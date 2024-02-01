import React, { useState, useEffect } from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch login details when the component mounts
    const currentUser = auth().currentUser;
    setUser(currentUser);
  }, []);
  return (
    <View>
      <Text>Welcome to your profile!</Text>
      {user && (
        <View>
           <Text>Eamil: {auth().currentUser.email}</Text>
             <Text>UID: {auth().currentUser.uid} </Text>
             <Text>UID: {auth().currentUser.uid} </Text>
         
          {/* Display other user details if needed */}
        </View>
      )}
    </View>
  );
};

export default ProfileScreen