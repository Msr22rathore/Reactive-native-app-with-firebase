// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecongPage';
import ThirdPage from './pages/ThirdPage';
import EmailPassAuth from './pages/EmailPassAuth';
import Login from  './pages/Login' 
import EditPage from './pages/EditPage';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
const Stack = createNativeStackNavigator();





const FirstScreenStack = () => {
  return (
      <Stack.Navigator
        initialRouteName="FirstPage"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen
          name="FirstPage"
          component={FirstPage}
        />
      </Stack.Navigator>
  );
}

const SecondScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="SecondPage"
        component={SecondPage}/>
      <Stack.Screen
        name="ThirdPage"
        component={ThirdPage}/>
    </Stack.Navigator>
  );
}
const Drawer = createDrawerNavigator();
function DrawerNavigator(){
  return(


    
<Stack.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#c6cbef', //Set Drawer background
            width: 250, //Set Drawer width
          },
          headerStyle: {
            backgroundColor: 'purple', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          }
        }}>
          
        <Stack.Screen
          name="FirstPage"
          options={{
            drawerLabel: 'First page Option',
            title: 'Users Details',
         
            
          }}
          component={FirstScreenStack} />
        <Stack.Screen
          name="SecondPage"
          options={{
            drawerLabel: 'Second page Option',
            title: 'Second Stack'
          }}
          component={SecondScreenStack} />
        
           
      </Stack.Navigator>
  )
}

function App() {

  
  return (

    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="EmailPassAuth" component={EmailPassAuth} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen name="EditPage" component={EditPage} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
export default App;
