import 'react-native-gesture-handler';
import * as React from 'react';
import { AppRegistry } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import {createAppContainer} from 'react-navigation'
import SplashScreen from 'react-native-splash-screen'

//mymy
import LoginScreen from './screens/mymy/LoginScreen';
import RegisterScreen from './screens/mymy/RegisterScreen';
import AddPhotoScreen from './screens/mymy/addPhotoScreen';
import AddFullNameScreen from './screens/mymy/addFullNameScreen';
import AddBirthDayScreen from './screens/mymy/addBirthdayScreen';
import AddGenderScreen from './screens/mymy/addGenderScreen';
import AddCityScreen from './screens/mymy/addCityScreen';
import HomeScreen from './screens/mymy/HomeScreen';
import ProfileScreen from './screens/mymy/ProfileScreen';
import MessageScreen from './screens/mymy/MessageScreen';
import EditProfileScreen from './screens/mymy/EditProfileScreen';
import GeneralScreen from './screens/mymy/GeneralScreen';
import ChangePasswordScreen from './screens/mymy/ChangePasswordScreen';
import BlockListScreen from './screens/mymy/BlockListScreen';
import DeleteAccountScreen from './screens/mymy/DeleteAccountScreen';
import CityScreen from './screens/mymy/CityScreen';
import FiltersScreen from './screens/mymy/filtersScreen';
import SearchScreen from './screens/mymy/SearchScreen';
import PhotoViewScreen from './screens/mymy/photoViewScreen';
import FriendProfileScreen from './screens/mymy/FriendProfileScreen';
import ChatScreen from './screens/mymy/ChatScreen';

import { useEffect } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

const store = configureStore()

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  Reigster: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  AddPhoto: {
    screen: AddPhotoScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  AddFullName: {
    screen: AddFullNameScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  AddBirthday: {
    screen: AddBirthDayScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  AddGender: {
    screen: AddGenderScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  AddCity: {
    screen: AddCityScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  General: {
    screen: GeneralScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  BlockList: {
    screen: BlockListScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  DeleteAccount: {
    screen: DeleteAccountScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  Message: {
    screen: MessageScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }
    }
  },
  City: {
    screen: CityScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      } 
    }
  },
  Filters: {
    screen: FiltersScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      } 
    }
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      } 
    }
  },
  PhotoView: {
    screen: PhotoViewScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      } 
    }
  },
  FriendProfile: {
    screen: FriendProfileScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      } 
    }
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      headerShown:false,
      headerStyle:{
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      } 
    }
  }
  
});

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store = { store }>
      <AppContainer />
    </Provider>
  );
};

AppRegistry.registerComponent("SynergyApp", () => App);