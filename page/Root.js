import React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Avatar from '../components/Avatar';
import Search from '../components/Search';

import Home from './Home';
import Discover from './Discover';
import Messages from './Messages';
import User from './User';
import Courses from './Courses';

import Question from './Question';
import Teacher from './Teacher';
import UserEdit from './User-Edit';
import Chats from './Chats';
import EventCreate from './Event-Create';

import Post from './User/Post';
import Favorites from './User/Favorites';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

class TestScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('DetailsScreen')}
        />
      </View>
    );
  }
}

const CourseStack = createNativeStackNavigator();
function CourseStackScreen() {
  return (
    <CourseStack.Navigator>
      <CourseStack.Screen
        name="Courses"
        component={Courses}
        options={({ navigation, route }) => ({
          headerLeft: (props) => <Avatar {...props} />,
          title: null,
          headerRight: (props) => <Search {...props} />,
        })}
      />
    </CourseStack.Navigator>
  );
}

const DiscoverStack = createNativeStackNavigator();
function DiscoverStackScreen() {
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen
        name="Discover"
        component={Discover}
        options={({ navigation, route }) => ({
          headerLeft: (props) => <Avatar {...props} />,
          title: null,
          headerRight: (props) => <Search {...props} />,
        })}
      />
    </DiscoverStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={({ navigation, route }) => ({
          headerLeft: (props) => <Avatar {...props} />,
          title: null,
          headerRight: (props) => <Search {...props} />,
        })}
      />
    </HomeStack.Navigator>
  );
}

const MessageStack = createNativeStackNavigator();
function MessageStackScreen() {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen name="Messages" component={Messages} />
    </MessageStack.Navigator>
  );
}

const UserStack = createNativeStackNavigator();
function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="Me" component={User} />
    </UserStack.Navigator>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="albums" color={color} size={26} />;
          }

          if (route.name === 'Courses') {
            return <Ionicons name="easel" color={color} size={26} />;
          }

          if (route.name === 'Discover') {
            return <Ionicons name="aperture" color={color} size={26} />;
          }

          if (route.name === 'Messages') {
            return <Ionicons name="chatbubbles" color={color} size={26} />;
          }

          if (route.name === 'Me') {
            return <Ionicons name="person" color={color} size={26} />;
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'black',
        headerShown: false,
      })}>
      <Tab.Screen name="Me" component={UserStackScreen} />
      <Tab.Screen name="Courses" component={CourseStackScreen} />
      <Tab.Screen name="Messages" component={MessageStackScreen} />
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Discover" component={DiscoverStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={AppTabs}
          options={({ navigation, route }) => ({
            header: (props) => null,
          })}
        />
        <Stack.Screen
          name="Chat"
          component={Chats}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => navigation.navigate('New Event')}>
                <Text>New Event</Text>
              </TouchableHighlight>
            ),
          })}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => navigation.navigate('Search')}>
                <Ionicons name="search" size={20} />
              </TouchableHighlight>
            ),
          })}
        />
        <Stack.Screen
          name="Favorites"
          component={Favorites}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => navigation.navigate('Search')}>
                <Ionicons name="search" size={20} />
              </TouchableHighlight>
            ),
          })}
        />
        <Stack.Screen name="New Event" component={EventCreate} />
        <Stack.Screen name="User Status Edit" component={UserEdit} />
        <Stack.Screen name="Teacher" component={Teacher} />
        <Stack.Screen name="Question" component={Question} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
