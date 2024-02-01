// Import necessary components and libraries
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

const FirstPage = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [currentUser, setUser] = useState(null);

  useEffect(() => {
    retrieveAndPrintData();
  }, []);

  const retrieveAndPrintData = async () => {
    try {
      const user = auth().currentUser;
      setUser(user);

      if (user) {
        const userId = user.uid;
        const docRef = firestore().collection('cred').doc(userId);
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
          const userData = docSnapshot.data();
          setUserData(userData);
        } else {
          console.log('No such document!');
        }
      }
    } catch (error) {
      console.error('Error retrieving data from Firestore:', error);
    }
  };

  const sortUserData = () => {
    // Implementation of sorting logic
  };
  const deleteUserData = async () => {
    try {
      const currentUser = auth().currentUser;

      if (currentUser) {
        const userId = currentUser.uid;
        const docRef = firestore().collection('cred').doc(userId);

        await docRef.delete();
        setUserData(null);
        console.log('User data deleted successfully!');
      } else {
        console.log('No authenticated user found.');
      }
    } catch (error) {
      console.error('Error deleting data from Firestore:', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>Users Details Are</Text>

          {userData && (
            <View style={styles.userDataContainer}>
              <Text style={styles.userData}>Email: {userData.username}</Text>
              <Text style={styles.userData}>Password: {userData.password}</Text>
              <Text style={styles.userData}>URL: {userData.url}</Text>
              <Text style={styles.userData}>Name: {userData.Name}</Text>
              <Text style={styles.userData}>Phone: {userData.Phone}</Text>
            </View>
          )}

          {/* TouchableOpacity components with icons for 'Edit' and 'Delete' */}
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => navigation.navigate('EditPage')}>
            <Icon  name="edit" size={30} color="#4CAF50" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => deleteUserData()}>
            <Icon name="edit" size={30} color="#FF6347" />
          </TouchableOpacity>

          <View style={styles.logoutButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.logoutButton}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => sortUserData()}
              style={styles.sortButton}>
              <Text style={styles.buttonText}>SORT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (existing styles)

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  sortButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FirstPage;