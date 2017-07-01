import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, ListItemd, Card, CardItem, Thumbnail} from 'native-base';
import { StackNavigator } from 'react-navigation';
import CustomScreen from '../../../CustomScreen';
import styles from  './styles';
import {
  View,
  ListView,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  DrawerLayoutAndroid
} from 'react-native';

import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import TimerMixin from 'react-timer-mixin';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import oggy from '../../data/oggy.json';
import chipdale from '../../data/chipdale.json';
import doremon from '../../data/doremon.json';
import haydoiday from '../../data/haydoiday.json';
import shin from '../../data/shin.json';
import tomjerry from '../../data/tomjerry.json';
import xitrum from '../../data/xitrum.json';
import bena from '../../data/bena.json';

export default class ViewMore extends Component {

  constructor(props) {
    super(props);
    console.log("contructor is called");
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.MAX_VIDEO_PER_PAGE = 10;
    this.MAX_VIDEO = 50;
    this.movies = {
      Oggy: oggy,
      Xitrum: xitrum,
      Tomjerry: tomjerry,
      Shin: shin,
      Haydoiday: haydoiday,
      Doremon: doremon,
      Chipdale: chipdale,
        Bena: bena
    };
    this.state = {
      isLoading : true,
      dataSource: ds.cloneWithRows([]),
      canLoadMoreContent : true,
      videos : [],
      page : 0,
      visible: false,
      movieName: ''
    }
    console.log('Navigation ' +JSON.stringify(this.props.navigation));
  };

  componentWillMount() {
    console.log("component will mount ..."+this.props.navigation.state.params.titleNav);
    if (this.props.navigation.state.params.loadMovieList) {
      this.setState({
        movieName: this.props.navigation.state.params.titleNav,
      });
    }
  }

  componentDidMount() {
    console.log("component did hhh mount ...");
    // this.loadVideos();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.movies[this.state.movieName]),
      isLoading: false
    })
    console.log("fetch finish");
  }

  componentWillUnmount() {
    console.log("component un mount ...");
  }

  componentDidUpdate(){

  }

  loadVideos(){
    if(this.state.videos.length >= this.MAX_VIDEO){
      return;
    }
    var requestBodyOfLatest = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "limit": this.MAX_VIDEO_PER_PAGE,
        "sort": "createdAt DESC",
        "skip" : this.state.page*this.MAX_VIDEO_PER_PAGE
      })
    };

    var requestBodyOfMostViewed = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "sort" : "points DESC",
        "limit" : this.MAX_VIDEO_PER_PAGE,
        "skip" : this.state.page*this.MAX_VIDEO_PER_PAGE
      })
    };

    var requestBodyOfMovieList = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'ozui.co'
      },
      body: JSON.stringify({
        "where": {
          "tags" : {
            "contains": this.state.movieName
          }
        },
        "limit": this.MAX_VIDEO_PER_PAGE,
        "skip": this.state.page*this.MAX_VIDEO_PER_PAGE,
        "sort": "createdAt DESC"
      })
    }

    var URL = 'http://ozui.co/feed/find';
    var request;
    console.log(this.props.navigation.state.params);
    if(this.props.navigation.state.params.loadLatest){
      request = requestBodyOfLatest;
    }else if (this.props.navigation.state.params.loadMostViewed){
      request = requestBodyOfMostViewed;
    } else if (this.props.navigation.state.params.loadMovieList) {
      request = requestBodyOfMovieList;
    }
    console.log("page: "+this.state.page);
    console.log(request);
    try{
        fetch(URL, request)
        .then((response) => response.json())
        .then((responseData) =>{
          console.log('start loading', responseData);
          let totalFeeds = this.state.videos.concat(responseData);
            this.setState({
              isLoading: false,
              videos: totalFeeds,
              dataSource: this.state.dataSource.cloneWithRows(totalFeeds),
              page: this.state.page+1
            });
        })
        .done();
    }catch(error){
      console.log('error' + error);
    };
  };

  renderRow(video) {
    console.log('111111', video.thumb);
    return (
      <Card style={ {
        marginBottom: 2,
        marginTop: 2
      }}>
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
                <Text numberOfLines={1} style={styles.titleVideo}>{video != null ? video.name: ''}</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.videoChannel}>{video.sport}</Text>
              </Body>
          </Left>
        </CardItem>
      </Card>
    );
  };

  goToDetailVideoComponent(video){
      this.props.navigation.navigate("Detail",{video: video, movieName: this.state.movieName});
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.titleNav
  });

  render() {
    if(this.state.isLoading){
      return (
          <LoadingComponent></LoadingComponent>
      );
    }
    return (
      <Container style={{flex: 1}}>
        <ListView
         renderScrollComponent={props => <InfiniteScrollView {...props} />}
         dataSource={this.state.dataSource}
         renderRow={this.renderRow.bind(this)}/>

      </Container>
    );

  }
}
