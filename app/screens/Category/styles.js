'use strict';

import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({

  container: {
    margin: 2,
    backgroundColor: '#ffffff',
    borderRadius: 1,
    borderWidth:2,
    borderColor: '#ffffff'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000000'
  },
  type: {
    color: '#FF6EEC',
    fontSize: 10
  },
  icon: {
    alignSelf: 'center',
    height: 40,
    width: 40,
    borderWidth: 1,
    borderRadius: 75
  },
  photo: {
    flex: 1,
    resizeMode: 'stretch',
    margin: 1
  },
  caption: {
    flexDirection: "row",
    flex:1
  },
  tabIcon: {
    width: 28,
    height: 28
  }
});
