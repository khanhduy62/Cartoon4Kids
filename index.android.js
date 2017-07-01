import React, { Component } from 'react';
import styles from  './style';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from 'react-navigation';
import HomeScreen from './app/screens/Home/Home';
import CategoryScreen from './app/screens/Category/Category';
import FavouriteScreen from './app/screens/Favourite/Favourite';
import ViewMoreScreen from './app/screens/ViewMore/ViewMore';
import SearchScreen from './app/screens/Search/Search';
import CustomScreen from './CustomScreen';
import {
  AppRegistry,
  Text,
  View,
  StatusBar,
  Navigator
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
console.disableYellowBox = true;

const SimpleApp = StackNavigator({
    Tabs: { screen: CategoryScreen,
  //       {
  //       screen: TabNavigator({
  //           CategoryTab: {
  //               screen: CategoryScreen
  //           },
  //           HomeTab: {
  //               screen: HomeScreen
  //           },
  //           FavouriteTab: {
  //               screen: FavouriteScreen
  //           }
  //       }, {
  //           tabBarOptions: {
  //               showLabel: false,
  //               showIcon: true,
  //               style: {
  //                   backgroundColor: '#FF6EEC',
  //               },
  //               indicatorStyle: {
  //                   backgroundColor: '#ffffff'
  //               }
  //               // activeBackgroundColor: '#880E4F'
  //           },
  //           lazy: true
  //       }),
        navigationOptions: ({ navigation }) => ({
          headerTitle: 'Cartoon4Kid',
          headerLeft:
              <Button transparent >
              <Icon name = 'menu' style={{color:'white'}}/ >
              </Button>,
          headerStyle: {
              backgroundColor: '#FF6EEC',
              elevation: 0
          },
          headerTintColor: '#ffffff'
    })
  }
    ,
    ViewMore: {
       screen: ViewMoreScreen,
       navigationOptions: {
         headerStyle: {
           backgroundColor: '#FF6EEC'
         },
         headerTintColor: '#ffffff'
      },
     },
    Detail: {
      screen: CustomScreen ,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#FF6EEC'
        },
        headerTintColor: '#ffffff'
     },
   },
   Search: {
     screen: SearchScreen,
     navigationOptions: {
       headerStyle: {
         backgroundColor: '#EC407A'
       },
       headerTintColor: '#ffffff'
    },
   }
});
AppRegistry.registerComponent('C4k', () => SimpleApp);
