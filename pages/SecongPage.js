// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import * as React from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView
} from 'react-native';


const SecondPage = ({ navigation }) => {

  const [userData, setUserData] = useState(null);
  const [currentUser,setUser] =useState(null);
  useEffect(() => {
    retrieveAndPrintData();
  }, []);

  const editUserData = async (newUserData) => {
    try {
      const userId = user.uid;
      const docRef = firestore().collection('cred').doc(userId);

      // Use the update method to update the existing document with new data
      await docRef.update(newUserData);

      // Fetch and update the user data again to reflect the changes
      retrieveAndPrintData();
      console.log('User data updated successfully!');
    } catch (error) {
      console.error('Error updating data in Firestore:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>
           Menus of variety of thalis.
          </Text>
          <Button
            title="Go to First Page"
            onPress={
              () => navigation.navigate('FirstPage')
            }
          />
          <Button
            title="Go to Third Page"
            onPress={
              () => navigation.navigate('ThirdPage')
            }
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          React Navigate Drawer
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default SecondPage;