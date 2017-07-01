'use strict';

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
    resizeMode: 'cover',
    flex: 1,
    width: 290,
    height: 140
  },

  content: {
    flex: 1,
    padding: 10,
    bottom: 15,
    left: 5
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
    fontSize: 16
  },
  button: {
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    color: '#fff'
  },
  tabIcon: {
    width: 28,
    height: 28,
  }
});
