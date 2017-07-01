import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, ListItemd, Card, CardItem, Thumbnail} from 'native-base';
import styles from  './styles';
import {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  DrawerLayoutAndroid,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import SplashScreen from "react-native-smart-splash-screen";
import TimerMixin from 'react-timer-mixin';

const {
  width: widthScreen
} = Dimensions.get('window');

export default class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cartoons: [
        {
          photo: "http://s2.upanh123.com/2017/05/04/Chipdale-Thumba9e96.jpg",
          label: "Chipdale",
          hashtag: "#chipandale",
          icon: "http://s2.upanh123.com/2017/05/04/Logo-Chipdale9dd3a.png",
          type: "Phim thuyết minh",
          actual_width: 1280,
          actual_height: 720,
          id: 1
        },
        {
          photo: "http://s2.upanh123.com/2017/05/04/Tom_Jerry-Thumbb4a5f.jpg",
          label: "Tomjerry",
          hashtag: "#tomandyerry",
          icon: "http://s2.upanh123.com/2017/05/04/Logo-TomJerry3fdd5.png",
          type: "Phim thuyết minh",
          actual_width: 1280,
          actual_height: 800,
          id: 2
        },
        {
          photo: "http://s2.upanh123.com/2017/05/04/Shinchan-Thumb15332.jpg",
          label: "Shin",
          hashtag: "#shin",
          icon: "http://s2.upanh123.com/2017/05/04/Logo-Shinbab19.png",
          type: "Phim thuyết minh",
          actual_width: 1920,
          actual_height: 1080,
          id: 3
        },
        {
          photo: "http://s2.upanh123.com/2017/05/04/Oggy-Thumb7d19f.jpg",
          label: "Oggy",
          hashtag: "#oggy",
          icon: "http://s2.upanh123.com/2017/05/04/Logo-Oggy9aefe.png",
          type: "Phim thuyết minh",
          actual_width: 1920,
          actual_height: 1080,
          id: 4
        },
        {
          photo: "http://s2.upanh123.com/2017/05/04/Doremon-Thumb5d5ae.jpg",
          label: "Doremon",
          hashtag: "#doremon",
          icon: "http://s2.upanh123.com/2017/05/04/Logo-Doremonc2abe.png",
          type: "Phim câm",
          actual_width: 1920,
          actual_height: 1080,
          id: 5
        },
        {
          photo: "http://s2.upanh123.com/2017/05/04/Nupogodi-Thumb4c57a.jpg",
          label: "Haydoiday",
          hashtag: "#haydoiday",
          icon: "http://s2.upanh123.com/2017/05/04/Logo-Nupogodi43e38.png",
          type: "Phim thuyết minh",
          actual_width: 1920,
          actual_height: 1080,
          id: 6
        },
        {
              photo: "http://s2.upanh123.com/2017/05/04/Xitrum-Thumb309cb.jpg",
              label: "Xitrum",
              hashtag: "#xitrum",
              icon: "http://s2.upanh123.com/2017/05/04/Logo-Xitrume99ee.th.png",
              type: "Phim thuyết minh",
              actual_width: 1920,
              actual_height: 1080,
              id: 7
        },
        {
            photo: "http://s2.upanh123.com/2017/05/27/bena-thumbd7c62.jpg",
            label: "Bena",
            hashtag: "#bena",
            icon: "http://s2.upanh123.com/2017/05/27/bena-iconfe036.th.jpg",
            type: "Phim thuyết minh",
            actual_width: 1920,
            actual_height: 1080,
            id: 7
        }
      ],
      oddCol: [],
      evenCol: []

    }
  };

  componentWillMount() {
    console.log("component will mount ...");
    this.seperateCol();
  }

  componentDidMount() {
    // this.getHeightOfImage();
    console.log("component did mount ...");
    TimerMixin.setTimeout(()=>{
      this.closeSplashScreen();
    },1500);
  }

  closeSplashScreen(){
      SplashScreen.close({
        animationType: SplashScreen.animationType.UIAnimationScale,
        duration: 500
      });
  }

  componentWillUnmount() {
    console.log("component un mount ...");
  }

  _renderColumn(cartoonList, sectionID: number, rowID: number, highlightRow : (sectionID: number, rowID: number) => void) {
    return cartoonList.map((item, index) => {
      return (
        <TouchableOpacity key={item.id} onPress={() => {
            this.props.navigation.navigate('ViewMore',
            {
              name: item.hashtag,
              loadMovieList: true,
              titleNav: item.label
            })
          }}>
          <View style={styles.container}>
            <View style={{margin: 2}}>
              <Image square source={{uri: item.photo}}
              style={[styles.photo, {
                width: widthScreen/2 - 16,
                height: (widthScreen/2 - 16) * item.actual_height / item.actual_width
              }]}/>
            </View>
            <View style={styles.caption}>
              <Thumbnail style={{margin: 3}} small source={{uri: item.icon}}/>
              <View>
                <Text style={styles.title}>{item.label}</Text>
                <Text style={styles.type}>{item.type}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  };

  seperateCol() {
    let col1 = [];
    let col2 = [];
    this.state.cartoons.forEach((item, index) => {
      if(index%2 == 0) {
        col1.push(item);
      } else {
        col2.push(item);
      }
    });
    this.setState({ oddCol: col1, evenCol: col2 });
  }

  getHeightOfImage(uri) {
    // let widthImage = widthScreen/2 - 18;
    // let newCatoons = this.state.cartoons.map((item, index) => {
    //   console.log(item.photo);
      Image.getSize(uri, (width, height) => {
        console.log('*****----> '+width, height);
        // item.height = (height*widthImage)/width;
        // item.width = widthImage;
        // return item;
      });
    // })
    // this.setState({cartoons: newCatoons});
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/home.png')}
        style={[styles.tabIcon, {tintColor: tintColor}]}
      />
    )
  };

  render() {
    return (
      <Container>
        <Content>
          <Grid style={{margin: 2}}>
            <Col>{this._renderColumn(this.state.oddCol)}</Col>
            <Col>{this._renderColumn(this.state.evenCol)}</Col>
          </Grid>
        </Content>
      </Container>
    );

  }
}
