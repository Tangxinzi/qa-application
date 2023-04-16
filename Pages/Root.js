import React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  FlatList,
  Platform,
  TouchableHighlight,
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
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
import Me from './Tabs/Me';
import Courses from './Tabs/Courses';

// Pages
import Login from './Screen/Login';
import Register from './Screen/Register';
import UserEdit from './Screen/User-Edit';
import Search from './Search';
import Question from './Question';
import QuestionAsk from './Screen/QuestionAsk';
import Teacher from './Teacher';
import Chats from './Chats';
import Upcoin from './Upcoin';
import EventCreate from './Event-Create';
import DiscoverContent from './DiscoverContent';

// Pages - User
import Recent from './Screen/User/Recent';
import QuestionList from './Screen/User/QuestionList';
import Notes from './Screen/User/Notes';
import Comment from './Screen/User/Comment';
import NoteShare from './Screen/User/NoteShare';
import Favorites from './Screen/User/Favorites';
import Userinfo from './Screen/User/Userinfo';

// Components

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
          title: null,
          headerStyle,
          headerRight: (props) => (
            <View style={styles.row}>
              <TouchableHighlight
                style={styles.button}
                underlayColor="transparent"
                onPress={() => navigation.navigate('Search')}>
                <Ionicons name="search" size={26} />
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                underlayColor="transparent"
                onPress={() => navigation.navigate('Upcoin')}>
                <Ionicons name="server-outline" size={25} />
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
          title: null,
          headerRight: (props) => (
            <View style={styles.row}>
              <TouchableHighlight
                style={styles.button}
                underlayColor="transparent"
                onPress={() => navigation.navigate('Search')}>
                <Ionicons name="search" size={26} />
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                underlayColor="transparent"
                onPress={() => navigation.navigate('Upcoin')}>
                <Ionicons name="server-outline" size={25} />
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
            title: null,
            headerStyle,
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
                  onPress={() => this.props.navigation.navigate('Upcoin')}>
                  <Ionicons name="server-outline" size={25} />
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
class MessageStackScreen extends React.Component {
  render() {
    return (
      <MessageStack.Navigator>
        <MessageStack.Screen
          name="Messages"
          component={Messages}
          options={({ navigation, route }) => ({
            headerLeft: (props) => (
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                style={{
                  fontSize: 17,
                  fontWeight: '600',
                  color: 'rgba(0, 0, 0, .9)',
                  textAlign: 'center',
                  marginHorizontal: 0,
                }}>
                Messages
              </Text>
            ),
            title: null,
          })}
        />
      </MessageStack.Navigator>
    );
  }
}

const MeStack = createNativeStackNavigator();
function MeStackScreen() {
  return (
    <MeStack.Navigator>
      <MeStack.Screen
        name="Me"
        component={Me}
        options={({ navigation, route }) => ({
          headerLeft: (props) => (
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={{
                fontSize: 17,
                fontWeight: '600',
                color: 'rgba(0, 0, 0, .9)',
                textAlign: 'center',
                marginHorizontal: 0,
              }}>
              Me
            </Text>
          ),
          title: null,
        })}
      />
    </MeStack.Navigator>
  );
}

const headerStyle = (() => {
  if (Platform.OS === 'ios') {
    return {
      borderWidth: 0,
      elevation: 0,
      borderBottomColor: 'red',
      shadowOffset: {
        width: 0, //阴影X轴位移
        height: 5, //阴影Y轴位移
      },
      shadowColor: 'green', //阴影颜色
      shadowRadius: 0, //阴影模糊半径
      shadowOpacity: 0.2, // 阴影不透明度
    };
  } else {
    return {
      borderBottomWidth: 0,
      elevation: 0,
    };
  }
})();

function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="albums" color={color} size={26} />;
          }

          if (route.name === 'Courses') {
            return <Ionicons name="easel" color={color} size={26} />;
          }

          if (route.name === 'Discover') {
            // return <Ionicons name="aperture" color={color} size={26} />;
            // <Text style={{fontSize: 12, textAlign: 'center', color: '#FFF'}}>Discover</Text>
            return (
              <View
                style={{
                  backgroundColor: '#FFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 46,
                  width: 46,
                  borderRadius: 46,
                  position: 'relative',
                  top: -8,
                  shadowOffset: {
                    width: 1,
                    height: 0,
                  },
                  shadowColor: '#000',
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                }}>
                <Ionicons name="aperture" color={color} size={30} />
              </View>
            );
          }

          if (route.name === 'Messages') {
            return <Ionicons name="chatbubbles" color={color} size={26} />;
          }

          if (route.name === 'Me') {
            return <Ionicons name="person" color={color} size={26} />;
          }
        },
        tabBarStyle: {
          backgroundColor: 'white',
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 3,
        },
        tabBarBackground: () => <></>,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: 'black',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        // options={({ navigation, route }) => ({
        //   header: (props) => null,
        // })}
      />
      <Tab.Screen
        name="Courses"
        component={CourseStackScreen}
        options={({ navigation, route }) => ({
          header: (props) => null,
        })}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverStackScreen}
        options={({ navigation, route }) => ({
          header: (props) => null,
        })}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStackScreen}
        options={({ navigation, route }) => ({
          header: (props) => null,
        })}
      />
      <Tab.Screen
        name="Me"
        component={MeStackScreen}
        options={({ navigation, route }) => ({
          header: (props) => null,
        })}
      />
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
          <Stack.Screen
            name="Question List"
            component={QuestionList}
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
            name="Login"
            component={Login}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => navigation.navigate('Register')}>
                  <Text>Register</Text>
                </TouchableHighlight>
              ),
            })}
          />
          <Stack.Screen
            name="Upcoin"
            component={Upcoin}
            options={({ navigation, route }) => ({
              headerStyle: {
                // backgroundColor: '#f4511e',
                borderBottomWidth: 0,
              },
              // headerTintColor: '#fff',
              headerTitleStyle: {},
            })}
          />
          <Stack.Screen name="Userinfo" component={Userinfo} />
          <Stack.Screen name="User Status Edit" component={UserEdit} />
          <Stack.Screen name="Question Content" component={Question} />
          <Stack.Screen name="Discover Content" component={DiscoverContent} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="Recent Views" component={Recent} />
          <Stack.Screen name="Note Share" component={NoteShare} />
          <Stack.Screen name="New Event" component={EventCreate} />
          <Stack.Screen name="Teacher" component={Teacher} />
          <Stack.Screen name="Ask Question" component={QuestionAsk} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
