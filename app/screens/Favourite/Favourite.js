import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, ListItemd, Card, CardItem, Thumbnail} from 'native-base';
import { StackNavigator } from 'react-navigation';
import CustomScreen from '../../../CustomScreen';
import styles from  './styles';
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

import Icon from 'react-native-vector-icons/FontAwesome';
import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import Rating from './Rating.js';
export default class Favourite extends Component {

  constructor(props) {
    super(props);
    console.log("contructor is called");
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let feeds =[];
    this.state = {
      isLoading : true,
      dataSource: ds.cloneWithRows(feeds),
      canLoadMoreContent : true,
      feeds : feeds,
      feedPage : 0,
      visible: false
    }

  };

  componentWillMount() {
    console.log("component will mount ...");

  }

  componentDidMount() {
    console.log("component did mount ...");
    this.loadFeedsFirstTime();
  }

  componentWillUnmount() {
    console.log("component un mount ...");
  }

  loadFeedsFirstTime() {
    const API_URL = 'http://ozui.co/feed/find';
    var data = {
      method : 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Origin': '',
         'Host': 'ozui.co'
       },
       body: JSON.stringify({
         "where":{"status":0,"type":1},"limit":15,"sort":"points DESC"
       })
    };

    fetch(API_URL,data)
    .then((response) => response.json())
    .then((responseData) => {
        let feeds = responseData.filter((feed) => {
            return feed;
         })
         console.log("first time data :",feeds);
         this.setState({
           isLoading : false,
           dataSource: this.state.dataSource.cloneWithRows(feeds),
           feeds : feeds,
           feedPage : 1
         });
    })
    .done();

  }

  loadMoreContentAsync () {
    console.log("load more ...");
     const API_URL = 'http://ozui.co/feed/find';
     let data = {
       method : 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': '',
          'Host': 'ozui.co'
        },
        body: JSON.stringify({
          "where":{"type":1},"limit":15,"skip":this.state.feedPage*15,"sort":"points DESC"
        })
     };

     fetch(API_URL,data)
     .then((response) => response.json())
     .then((responseData) => {
       console.log("get feeds load more ...")
         let newfeeds = responseData.filter((feed) => {
             return feed;
          })
          let totalFeed = this.state.feeds.concat(newfeeds);
          /*this.setState({
            isLoading : false,
            dataSource: this.state.dataSource.cloneWithRows(totalFeed),
            feeds : totalFeed,
            feedPage : this.state.feedPage + 1
          });*/
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(totalFeed),
            feeds : totalFeed,
          });
     })
     .done();

  }

  renderRow(feed, sectionID: number, rowID: number, highlightRow : (sectionID: number, rowID: number) => void) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight onPress={() => {
          highlightRow(sectionID, rowID);
          navigate ('Detail', { name: feed })
        }}>
        <View>
          <View style={styles.row}>
                  <Image style={styles.thumb} source={{uri: feed.thumb}} />
                  <View style={{ right:10 }}>
                      <Image source={require("../../images/Image-Icon 4.png")}  style={{left:20, right:20}} />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.description}>{feed.title}</Text>
                    <Text note style={{color:'#ee23c5'}}>Phim thuyết minh</Text>
                         <Rating/>
                    <Button danger top={10}>
                          <Text style={{color:'#fff'}}><Icon name="check"/> Đã đăng ký</Text>
                    </Button>
                  </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        style={styles.sperator}
      />
    );
  };

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large'></ActivityIndicator>
        <Text>Loading...</Text>
      </View>
    )
  };

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/favourite.png')}
        style={[styles.tabIcon, {tintColor: tintColor}]}
      />
    )
  }

  render() {
    if(this.state.isLoading) {
      return this.renderLoadingView();
    }
    return (
      <Container>
        <Content>
        <ListView
           renderScrollComactponent={props => <InfiniteScrollView {...props} />}
           dataSource={this.state.dataSource}
           renderRow={(this.renderRow.bind(this))}
           canLoadMore={this.state.canLoadMoreContent}
           onLoadMoreAsync={this.loadMoreContentAsync.bind(this)}
         />
        </Content>
      </Container>
    );

  }
}
