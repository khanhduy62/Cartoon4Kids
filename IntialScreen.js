import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, ListItem } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from 'react-navigation';
import CustomScreen from './CustomScreen';
import styles from  './style';
import {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  DrawerLayoutAndroid
} from 'react-native';

import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import TimerMixin from 'react-timer-mixin';
import SplashScreen from 'react-native-smart-splash-screen';

export default class InitialScreen extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <Container>
      </Container>
    );

  }
}

const Tabs = TabNavigator({
  Home: { screen: HomeScreen },
  Category: { screen: CategoryScreen },
  Favourite: { screen: FavouriteScreen }
})
