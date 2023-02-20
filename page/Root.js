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
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tabs
import Home from './Tabs/Home';
import Discover from './Tabs/Discover';
import Messages from './Tabs/Messages';
import User from './Tabs/User';
import Courses from './Tabs/Courses';

// Pages
import Recent from './User/Recent';
import Login from './Login';
import Search from './Search';
import Question from './Question';
import Teacher from './Teacher';
import UserEdit from './User-Edit';
import Chats from './Chats';
import LearnCoin from './LearnCoin';
import EventCreate from './Event-Create';

// Pages - User
import Post from './User/Post';
import Notes from './User/Notes';
import NoteShare from './User/NoteShare';
import Favorites from './User/Favorites';

// Components
import Avatar from '../components/Avatar';

class TestScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('DetailsScreen')}
        />
      </View>
    );
  }
}

const styles = {
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 15,
  },
};

const CourseStack = createNativeStackNavigator();
function CourseStackScreen() {
  return (
    <CourseStack.Navigator>
      <CourseStack.Screen
        name="Courses"
        component={Courses}
        options={({ navigation, route }) => ({
          headerLeft: (props) => (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => navigation.navigate('Login')}>
              <Avatar />
            </TouchableHighlight>
          ),
          title: null,
          headerRight: (props) => (
            <View style={styles.row}>
              <TouchableHighlight
                style={styles.button}
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('Search')}>
                <Ionicons name="search" size={26} />
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('Learn Coin')}>
                <Ionicons name="ribbon-outline" size={25} />
              </TouchableHighlight>
            </View>
          ),
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
          headerLeft: (props) => (
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => navigation.navigate('Login')}>
              <Avatar />
            </TouchableHighlight>
          ),
          title: null,
          headerRight: (props) => (
            <View style={styles.row}>
              <TouchableHighlight
                style={styles.button}
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('Search')}>
                <Ionicons name="search" size={26} />
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                underlayColor="transparent"
                onPress={() => this.props.navigation.navigate('Learn Coin')}>
                <Ionicons name="ribbon-outline" size={25} />
              </TouchableHighlight>
            </View>
          ),
        })}
      />
    </DiscoverStack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();
class HomeStackScreen extends React.Component {
  render() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={({ navigation, route }) => ({
            headerLeft: (props) => (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => navigation.navigate('Login')}>
                <Avatar />
              </TouchableHighlight>
            ),
            title: null,
            headerRight: (props) => (
              <View style={styles.row}>
                <TouchableHighlight
                  style={styles.button}
                  underlayColor="transparent"
                  onPress={() => this.props.navigation.navigate('Search')}>
                  <Ionicons name="search" size={26} />
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  underlayColor="transparent"
                  onPress={() => this.props.navigation.navigate('Learn Coin')}>
                  <Ionicons name="ribbon-outline" size={25} />
                </TouchableHighlight>
              </View>
            ),
          })}
        />
      </HomeStack.Navigator>
    );
  }
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
      initialRouteName="Courses"
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
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Courses" component={CourseStackScreen} />
      <Tab.Screen name="Discover" component={DiscoverStackScreen} />
      <Tab.Screen name="Messages" component={MessageStackScreen} />
      <Tab.Screen name="Me" component={UserStackScreen} />
    </Tab.Navigator>
  );
}

export default class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="App"
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
          <Stack.Screen
            name="Notes"
            component={Notes}
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
          
          <Stack.Screen name="Recent Views" component={Recent} />
          <Stack.Screen name="Note Share" component={NoteShare} />
          <Stack.Screen name="Learn Coin" component={LearnCoin} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="New Event" component={EventCreate} />
          <Stack.Screen name="User Status Edit" component={UserEdit} />
          <Stack.Screen name="Teacher" component={Teacher} />
          <Stack.Screen name="Question" component={Question} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
