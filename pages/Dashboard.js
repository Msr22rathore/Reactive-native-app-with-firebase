// Import necessary components and libraries
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import FirstPage from './FirstPage';

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Credentials Screen Component


// Dashboard Component
const Dashboard = ({ navigation }) => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      {/* Dashboard Screen */}
      <Drawer.Screen
        name="Dashboard"
        component={() => (
          <View style={{ flex: 1 }}>
            {/* Dashboard Header */}
            <View style={{ backgroundColor: 'purple', padding: 10, alignItems: 'center' }}>
              <Text style={{ fontSize: 24, color: '#fff' }}>Dashboard</Text>
            </View>

            {/* Menu for Credentials */}
            <View style={{ flexDirection: 'row', marginTop: 300, alignItems: 'center', justifyContent: 'center' }}>
              {/* Menu for Credentials */}
              <TouchableOpacity onPress={() => navigation.navigate('DrawerNavigator')}>
                <View style={{ alignItems: 'center', marginRight: 20 }}>
                  <Icon name="user" size={50} color="#000" style={{ marginBottom: 10 }} />
                  <Text>Credentials</Text>
                </View>
              </TouchableOpacity>

              {/* Menu for Events */}
              <TouchableOpacity onPress={() => console.log('Navigate to Events')}>
                <View style={{ alignItems: 'center', marginRight: 20 }}>
                  <Icon name="calendar" size={50} color="#000" style={{ marginBottom: 10 }} />
                  <Text>Events</Text>
                </View>
              </TouchableOpacity>

              {/* Menu for Calculator */}
              <TouchableOpacity onPress={() => navigation.navigate('Calculator')}>
                <View style={{ alignItems: 'center' }}>
                  <Icon name="calculator" size={50} color="#000" style={{ marginBottom: 10 }} />
                  <Text>Calculator</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Additional page */}
            {/* <DifferentPage /> */}
          </View>
        )}
      />

      {/* Credentials Screen */}
      <Drawer.Screen
        name="Account"
        component={FirstPage}
        options={{
          drawerIcon: () => (
            <Icon name="user" size={50} color="#000" style={{ marginBottom: 10 }} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Dashboard;