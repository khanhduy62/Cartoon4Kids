import React, { Component } from 'react';
import styles from  './app/config/styles';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,ListView,ScrollView,WebView,
  AppState
} from 'react-native';
import { List,Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, ListItem, Card, CardItem, Thumbnail} from 'native-base';

const Dimensions = require('Dimensions');
import YouTube from 'react-native-youtube';
export default class CustomScreen extends Component {

   WIDTH(){
    return Dimensions.get('window').width;
  }
  constructor(props) {
        super(props);
        this.state = {
          isReady: false,
          status: null,
          quality: null,
          error: null,
          isPlaying: false,
          relatedVideos: [],
          appState: AppState.currentState,
          disableWebView: false
        }
    }

    static navigationOptions = {
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('./app/images/home.png')}
          style={[styles.global.tabIcon, {tintColor: tintColor}]}
        />
      )
    }

  _saveDataLocal = async (feed) => {
    console.log('Function add to my favourite list ...');
    var myFavourite = await AsyncStorage.getItem("favouriteList");
    if(myFavourite === null) {
      await AsyncStorage.setItem("favouriteList", JSON.stringify(feed));
      var afterAdded = await AsyncStorage.getItem("favouriteList");
      console.log("Add first feed to my favourite: ", afterAdded);
    } else {
      await AsyncStorage.mergeItem("favouriteList", JSON.stringify(feed));
      var afterAdded = await AsyncStorage.getItem("favouriteList");
      console.log("Add one more feed to my favourite: ", afterAdded);
    }
  }

  // static navigationOptions = {
  // // Nav options can be defined as a function of the navigation prop:
  // title: ({ state }) => `View Detail ${state.params.name.title}`,
  // };

  componentDidMount(){
    console.log('did mount state', this.state.appState);
    AppState.addEventListener('change', this._handleAppStateChange);
    this.getRelatedVideo(false);
  }

  componentWillUnmount() {
    console.log('will mount state', this.state.appState);
     AppState.removeEventListener('change', this._handleAppStateChange);
   }

  _handleAppStateChange = (nextAppState) => {
    console.log('aaaaaaa', nextAppState);
   if (nextAppState === 'background') {
     this.setState({disableWebView: true});
   } else if (nextAppState === 'active') {
     this.setState({disableWebView: false});
   }
  //  this.setState({appState: nextAppState});
 }

  getRelatedVideo(getNewerVideo){

    var requestBodyOfRelatedVideos;
    if(getNewerVideo){
      requestBodyOfRelatedVideos = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'ozui.co'
      },
      body: JSON.stringify({
        'where':{
          'tags': this.props.navigation.state.params.video.tags,
            'createdAt': {
            '>=' : this.props.navigation.state.params.video.createdAt
          },
          'id':{
            '!' : this.props.navigation.state.params.video.id
          }
        },
        "limit": 10,
        "skip": 0,
        "sort": "createdAt DESC"
      })
    };
  }else{
    requestBodyOfRelatedVideos = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
      'Host': 'ozui.co'
    },
    body: JSON.stringify({
      'where':{
        'tags': this.props.navigation.state.params.video.tags,
          'createdAt': {
            '<=' : this.props.navigation.state.params.video.createdAt
        },
        'id':{
          '!' : this.props.navigation.state.params.video.id
        }
      },
      "limit": 10,
      "skip": 0,
      "sort": "createdAt DESC"
    })
    };

  }
    try{
      fetch(URL, requestBodyOfRelatedVideos)
        .then((response) => response.json())
        .then((responseData)=>{
          if(responseData.length < 5){
              this.getRelatedVideo(!getNewerVideo);
              return;
          }
          this.setState({
            relatedVideos: responseData
          })
        }).done();
    }catch(error){
      console.log(error);
    }
  }

  gotoDetail(video){
    this.props.navigation.state.params.video = video;
    console.log(this.props.navigation.state.params);
    this.getRelatedVideo(false);
    this.refs.scrollView.scrollTo({y: 0})
  }

  renderRelatedVideo(video){
    return(
      <Card>
        <CardItem>
          <TouchableOpacity key={video.id} style={styles.touchOpacity} onPress={() => this.gotoDetail(video)}>
          <Left>
              <Image source={{uri: video.thumb}} style={styles.smallBanner}/>
          </Left>
          </TouchableOpacity>
          <Body style={{padding: 10}}>
              <TouchableOpacity onPress={() => this.gotoDetail(video)}>
              <Text numberOfLines={2} style={styles.smallTitleVideo}>{video.title}</Text>
              </TouchableOpacity>
              <View style={styles.likeShare}>
                <Icon name="thumbs-up" style={{fontSize: 15,color:'#EC407A'}}/>
                  <Text style={styles.number}>{video.likes}</Text>
              </View>
          </Body>
        </CardItem>
      </Card>
    );
  }
  _renderWebView () {
    const { params } = this.props.navigation.state;
    var URL = 'http://ozui.co:8000/c4k/';
    return (
      <WebView
      mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          source={{uri: URL+params.movieName+"/"+params.video.id+".mp4"}}
          />
    )
  };

  render() {
     const { params } = this.props.navigation.state;
    console.log("isPlaying: "+this.state.isPlaying);
    console.log("sourceID: "+ params.video.url);
    console.log('disable web view: ' + this.state.disableWebView);
    let relatedViews = this.state.relatedVideos.map((video)=>
      {
        return this.renderRelatedVideo(video);
      }
    );
    return (
      <View style={{flex:1, height: 350, width: this.WIDTH()}}>
        {(!this.state.disableWebView) && this._renderWebView()}
        <ScrollView ref='scrollView'>
          <Card>
           <CardItem>
             <Left>
               <Thumbnail source={require('./app/images/Image-Logo.png')}/>
               <Body>
                   <Text numberOfLines={1} style={styles.titleVideo}>{params.video.name}</Text>
                   <Text numberOfLines={2}>{params.video.description}</Text>
               </Body>
             </Left>
           </CardItem>
           <CardItem style={{justifyContent: 'space-between'}}>
             <Button transparent>
               <Icon  name="thumbs-up" style={{color:'#EC407A'}}/>
               <Text>{params.video.likes}</Text>
             </Button>
             <Button  transparent>
               <Icon  name="chatbubbles" style={{color:'#EC407A'}}/>
               <Text>{params.video.comments}</Text>
             </Button>
             <Button  transparent>
               <Icon  name="share" style={{color:'#EC407A'}}/>
               <Text>Chia sẻ</Text>
             </Button>

           </CardItem>
          </Card>
            {relatedViews}
        </ScrollView>
      </View>
     );
   }
 }
