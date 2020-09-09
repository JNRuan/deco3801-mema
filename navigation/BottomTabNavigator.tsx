import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import DictionaryScreen from '../screens/DictionaryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MeMaScreen from '../screens/MeMaScreen';
import WOTDScreen from '../screens/WOTDScreen';
import RegisterScreen from '../screens/Register';
import { BottomTabParamList, 
          HomeParamList, 
          ChallengeParamList,
          DictionaryParamList, 
          MeMaParamList,
          ProfileParamList, 
          WOTDParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={32} color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="WOTD"
        component={WOTDNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name="Dictionary"
        component={DictionaryNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="book" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Challenge"
        component={ChallengeNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="gamepad" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="MeMa"
        component={RegisterScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="robot" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'MeMa Home', headerTitleStyle: { alignSelf: 'center' } }}
      />
    </HomeStack.Navigator>
  );
}

const ChallengeStack = createStackNavigator<ChallengeParamList>();

function ChallengeNavigator() {
  return (
    <ChallengeStack.Navigator>
      <ChallengeStack.Screen
        name="ChallengeScreen"
        component={ChallengeScreen}
        options={{ headerTitle: 'Challenge Mode', headerTitleStyle: { alignSelf: 'center' }}}
      />
    </ChallengeStack.Navigator>
  );
}

const DictionaryStack = createStackNavigator<DictionaryParamList>();

function DictionaryNavigator() {
  return (
    <DictionaryStack.Navigator>
      <DictionaryStack.Screen
        name="DictionaryScreen"
        component={DictionaryScreen}
        options={{ headerTitle: 'My Words', headerTitleStyle: { alignSelf: 'center' }}}
      />
    </DictionaryStack.Navigator>
  );
}

const MeMaStack = createStackNavigator<MeMaParamList>();

function MeMaNavigator() {
  return (
    <MeMaStack.Navigator>
      <MeMaStack.Screen
        name="MeMaScreen"
        component={MeMaScreen}
        options={{ headerTitle: 'Talk to MeMa', headerTitleStyle: { alignSelf: 'center' }}}
      />
    </MeMaStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: 'Profile', headerTitleStyle: { alignSelf: 'center' } }}
      />
    </ProfileStack.Navigator>
  );
}

const WOTDStack = createStackNavigator<WOTDParamList>();

function WOTDNavigator() {
  return (
    <WOTDStack.Navigator>
      <WOTDStack.Screen
        name="WOTDScreen"
        component={WOTDScreen}
        options={{ headerTitle: 'Word of the Day', headerTitleStyle: { alignSelf: 'center' } }}
      />
    </WOTDStack.Navigator>
  );
}
