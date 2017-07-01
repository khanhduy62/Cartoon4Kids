'use strict';

import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet
} from 'react-native';
const window = Dimensions.get('window');
const PADDING = calculate(2);
const ONE_THIRD_OF_SCREEN_WIDTH = window.width/3;
const PINK = '#FF6EEC';
const BLACK = '#000000';
const GREY = '#000';

function calculate(percentage){
  return percentage*window.width/100;
}

function calculateHeight(percentage){
  return percentage*window.height/100;
}

export default StyleSheet.create({

  card: {
    marginBottom: 2,
    marginTop: 2
  },
  touchableOpactity :{
    flex: 1
  },

  thumbnailVideo: {
    flex: 1,
    flexDirection : 'row',
    height: calculate(50),
    width: window.width - 20,
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    resizeMode: 'stretch',
    borderRadius:2
  },

  title:{
    fontSize: 22,
    color: BLACK,
    marginBottom: 0,
    padding:0,
    fontWeight: 'bold'
  },

  thumbnailChannel :{
    borderWidth: 0.5,
    borderColor: GREY
  },

  link: {
    flex: 1,

  },

  buttonArrow:{
    marginLeft: 5,
    marginRight: 5,
  },

  separator: {
       height: 1,
       backgroundColor: 'grey',
       marginLeft: 10,
       marginRight: 10
     },

  infoVideo:{
    marginTop: 5,
    marginLeft: 10
  },

  titleVideo:{
    color: BLACK,
    marginLeft: 5,
    paddingTop: 2,
    fontSize: 13,
    fontWeight: 'bold',
  },

  videoChannel:{
    marginLeft: 5,
    color: PINK,
    fontSize: 13,
    fontWeight: 'bold',
  },



  backgroundVideo: {
   position: 'absolute',
   top: 0,
   left: 0,
   bottom: 0,
   right: 0,
 },
 thumbnailAvartar:{

 },
  viewMoreView:{
    flexDirection: 'row',
     justifyContent:'flex-end',
     paddingTop: PADDING,
     marginBottom: PADDING,
  },
  viewMoreText:{
    fontWeight: 'bold',
    paddingRight: PADDING
  },
  tabIcon: {
    width: 28,
    height: 28
  }
});
