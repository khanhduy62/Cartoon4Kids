import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },

  thumb: {
    width: 64,
    height: 64
  },

  text: {
    flex: 1,
    padding: 10
  },

  sperator: {
    height: 1,
    flex: 1,
    backgroundColor: '#CCCCCC',
  },

  title: {
    fontSize: 10,
    fontWeight: 'bold'
  },

  description: {
    fontFamily: 'Cochin',
    fontSize: 8
  },
  button: {
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  tabIcon: {
      width: 28,
      height: 28,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5
  },
  banner: {
    resizeMode: 'cover',
    flex: 1,
    height: 150
  },
  titleVideo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  },
  sub: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EC407A'
  },
  smallBanner: {

    flex: 1,
    height: 80,
    width : 70
  },
  smallTitleVideo: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000000'
  },
  smallSub: {
    fontSize: 5,
    fontWeight: 'bold',
    color: '#EC407A'
  },
  touchOpacity:{
    flex: 1
  },
  number: {
    fontSize: 13,
    marginLeft: 3
  },
  likeShare:{
    flex: 1,
    flexDirection: 'row'
  }

});
