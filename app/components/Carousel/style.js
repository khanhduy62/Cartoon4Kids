'use strict'
import Dimensions from 'Dimensions';
import {StyleSheet} from 'react-native';
const window = Dimensions.get('window');
const padding = calculate(2);
const ONE_THIRD_OF_SCREEN_WIDTH = window.width/3;
const PINK = '#EC407A';
const BLACK = '#000000';
function calculate(percentage){
  return percentage*window.width/100;
}
export default StyleSheet.create({

  carousel : {
    flexDirection: 'row',
    paddingRight: 0,
    paddingLeft: 0,
    marginBottom: 10,
    position: 'relative',

  },

  itemOfCarousel : {
      width: ONE_THIRD_OF_SCREEN_WIDTH,
      marginLeft: 2,
      marginRight: 2,
  },

  imageOfCarouselItem :{
    flex:1,
    resizeMode: 'cover',
    height: ONE_THIRD_OF_SCREEN_WIDTH,
    width: ONE_THIRD_OF_SCREEN_WIDTH,
    borderRadius: 2

  },

    infoCarouselItem : {
      justifyContent: 'flex-start',
      flexDirection:'row',
      margin:5
    },

  titleVideoOfCarouselItem :{
    color: BLACK,
    marginLeft: 1,
    marginTop: 1,
    paddingRight: 35,
    fontSize: 9
  },

  videoChannelOfCarouselItem :{
    marginLeft: 1,
    color: PINK,
    fontSize: 7
  },
  arrowLeft:{
    top :0,
    left: 0,
    position: 'absolute',
    height: ONE_THIRD_OF_SCREEN_WIDTH,
    width: ONE_THIRD_OF_SCREEN_WIDTH/5,
  },
  arrowRight:{
    top :0,
    right: 0,
    position: 'absolute',
    height: ONE_THIRD_OF_SCREEN_WIDTH,
    width: ONE_THIRD_OF_SCREEN_WIDTH/5
  },
  listCarousel:{
    flex: 1
  }
})
