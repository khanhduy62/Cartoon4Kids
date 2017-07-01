import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer,
  FooterTab, Button, Left, Right, Body, Icon,
  Card, CardItem, Thumbnail} from 'native-base';
import { StackNavigator } from 'react-navigation';
import CustomScreen from '../../../CustomScreen';
import styles from  './styles';
import SplashScreen from "react-native-smart-splash-screen"
import {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,TouchableOpacity,
  DrawerLayoutAndroid
} from 'react-native';
import Carousel from '../../components/Carousel/Carousel';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent'

import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import TimerMixin from 'react-timer-mixin';

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.MAX_VIDEO_PER_PAGE = 10;
       this.state = {
         latestVideo : [],
         mostViewedVideo: [],
         dataSourceMostVideos: [],
         dataSourceLatestVideos: [],
         updated: false
       };

  };


    componentDidMount() {
      console.log("Did mount");
      this.fetchLatestVideos();
      this.fetchMostVideos();
    }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/category.png')}
        style={[styles.tabIcon, {tintColor: tintColor}]}
      />
    )
  };

  goToDetailVideoComponent(video){
      this.props.navigation.navigate("Detail",{name: video});
  }

  componentDidUpdate(){
  }

  goToChannel(video){

  }

  renderListVideos(title,video, videos, handleOnPress){
    return (
      <View>
        <Card style={ {
          marginBottom: 2,
          marginTop: 2
        }}>
          <CardItem style={{paddingBottom: 0}}>
            <Left>
              <Text style={styles.title}>{title}</Text>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <TouchableOpacity onPress={() => this.goToDetailVideoComponent(video)} style={styles.touchableOpactity}>
            <Image style={styles.thumbnailVideo} source={{uri: video.thumb}}/>
            </TouchableOpacity>
          </CardItem>
          <CardItem style={{
            paddingTop: 0,
            marginLeft: 10,
          }}>
            <Left >
              <Thumbnail source={require('../../images/Image-Logo.png')}/>
              <Body>
                  <TouchableOpacity onPress={() => this.goToDetailVideoComponent(video)}>
                  <Text numberOfLines={1} style={styles.titleVideo}>{video != null ? video.title: ''}</Text>
                  </TouchableOpacity>
                  <Text numberOfLines={1} style={styles.videoChannel}>{video.sport}</Text>
                </Body>
            </Left>
          </CardItem>
        </Card>

        <Card>
          <View style={styles.viewMoreView}>
          <TouchableOpacity onPress={handleOnPress}>
            <Text style={styles.viewMoreText}>{'View More >>'}</Text>
            </TouchableOpacity>
          </View>
          <Carousel videos={videos} onClick={ this.goToDetailVideoComponent.bind(this)}/>
        </Card>
      </View>
    )

  }

   fetchMostVideos(){
    var requestBody = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "where" :{ "status": 0} ,
        "limit": this.MAX_VIDEO_PER_PAGE,
        "sort": "points DESC"
      })
    };
    var URL = 'http://ozui.co/feed/find';
    try{
        fetch(URL, requestBody)
        .then((response) => response.json())
        .then((responseData) =>{
          this.setState({
            mostViewedVideo: responseData[0],
            dataSourceMostVideos: responseData.slice(0),
            updated: true
          });
        })
        .done();
    }catch(error){
      console.log('error' + error);
    };
  }

   fetchLatestVideos(){
    var requestBody = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "limit": this.MAX_VIDEO_PER_PAGE,
        "sort": "createdAt DESC"
      })
    };
    var URL = 'http://ozui.co/feed/find';
    try{
        fetch(URL, requestBody)
        .then((response) => response.json())
        .then((responseData) =>{
          this.setState({
            latestVideo: responseData[0],
            dataSourceLatestVideos: responseData.slice(0),
          });
        })
        .done();
    }catch(error){
      console.log('error' + error);
    };
  }

  fetchMoreLatestVideos(){
      this.props.navigation.navigate("ViewMore",{loadLatest: true, titleNav: "Latest videos"});
  }

  fetchMoreMostViewedVideos(){
      this.props.navigation.navigate('ViewMore', {loadMostViewed: true, titleNav: "Most Viewed videos"});
  }

  render() {
    if(this.state.updated === false){
      return (
        <LoadingComponent></LoadingComponent>
      )
    }
    return(
      <Container>
        <Content>
        {this.renderListVideos('Latest Videos',this.state.latestVideo, this.state.dataSourceLatestVideos, this.fetchMoreLatestVideos.bind(this))}
        {this.renderListVideos('Most Videos',this.state.mostViewedVideo, this.state.dataSourceMostVideos, this.fetchMoreMostViewedVideos.bind(this))}
        </Content>
      </Container>

    )

  }

}
