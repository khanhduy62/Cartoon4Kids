import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Input, Button, Left, Right, Body, Icon, ListItemd, Card, CardItem, Thumbnail, Item} from 'native-base';
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
  DrawerLayoutAndroid,
  TextInput
} from 'react-native';

import InfiniteScrollView from 'react-native-infinite-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import TimerMixin from 'react-timer-mixin';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

export default class Search extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.MAX_VIDEO_PER_PAGE = 10;
    this.MAX_VIDEO = 50;
    this.state = {
      isLoading : false,
      dataSource: ds.cloneWithRows([]),
      canLoadMoreContent : true,
      videos : [],
      page : 0,
      visible: false,
      noResult: false
    }
    console.log('Navigation ' +JSON.stringify(this.props.navigation));
  };

  componentWillMount() {
    console.log("component will mount ...");
  }

  componentDidMount() {
    console.log("component did mount ...");
      this.props.navigation.setParams({
        handleSearch: this.loadResult.bind(this),
    });
    console.log("fetch finish");
  }

  componentWillUnmount() {
    console.log("component un mount ...");
  }

  loadResult(isLoadmore = true){
    let { params } = this.props.navigation.state;
    if(this.state.videos.length >= this.MAX_VIDEO){
      return;
    }
    console.log("search content", this.props.navigation.state.params.searchContent);
    let requestBodySearch = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Host': 'ozui.co'
      },
      body: JSON.stringify({
      	"query": {
            "bool": {
              "should": [
                 {
                     "match": {
                        "title": params.searchContent
                     }
                 },
                 {
                     "match": {
                        "tags": params.searchContent
                     }
                 }
              ]
            }
         },
        "size": this.MAX_VIDEO_PER_PAGE,
        "from": this.state.page*this.MAX_VIDEO_PER_PAGE,
        "sort": {
          "createdAt": { "order": "DESC" }
        }
      })
    }

    let URL = 'http://ozui.co/search/feed';
    try{
        fetch(URL, requestBodySearch)
        .then((response) => response.json())
        .then((responseData) => {
          console.log('start loading', responseData);
          let searchResult = responseData.hits.hits;
          let totalFeeds = [];
          if(searchResult.length == 0) {
            this.state.noResult = true;
          } else {
            this.state.noResult = false;
          }
          if (!isLoadmore) {
            totalFeeds = searchResult;
          } else {
            totalFeeds = this.state.videos.concat(searchResult);
          }
          this.setState({
            isLoading: false,
            videos: totalFeeds,
            dataSource: this.state.dataSource.cloneWithRows(totalFeeds),
            page: this.state.page + 1
          });
        })
        .done();
    }catch(error){
      console.log('error' + error);
    };
  };

  goToDetailVideo(){
    this.props.navigation.navigate("Detail",{name: video});
  }

  renderRow(video) {
    return (
      <Card style={ {
        marginBottom: 2,
        marginTop: 2
      }}>
        <CardItem cardBody>
          <TouchableOpacity onPress={() => this.goToDetailVideoComponent(video._source)} style={styles.touchableOpactity}>
          <Image style={styles.thumbnailVideo} source={{uri: video._source.thumb}}/>
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
                <Text numberOfLines={1} style={styles.titleVideo}>{video != null ? video._source.title: ''}</Text>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.videoChannel}>{video._source.sport}</Text>
              </Body>
          </Left>
        </CardItem>
      </Card>
    );
  };

  goToDetailVideoComponent(video){
      this.props.navigation.navigate("Detail",{name: video});
  }

  static navigationOptions = ({ navigation }) => ({
    header:
        <View style={styles.searchBar}>
            <Button transparent style={{flex: 1}} onPress={() => navigation.goBack()}>
             <Icon name="arrow-back" style={{color: "#ffffff"}}/>
            </Button>
            <View style={styles.searchGroup}>
                <Icon style={{flex: 1, margin: 2}} name="ios-search" />
                <Input style={{flex:6, height: 40}} placeholder="Search.." onChangeText={(text) => navigation.setParams({ searchContent: text})}/>
            </View>
            <Button transparent onPress={() => {
              if (navigation.state.params.searchContent) {
                navigation.state.params.handleSearch(false);
              }
            }}>
                <Text style={styles.whiteColor}>Search</Text>
            </Button>
        </View>
  });


  render() {
    if(this.state.isLoading){
      return (
          <LoadingComponent></LoadingComponent>
      );
    }
    return (
      <Container style={{flex: 1}}>
        <View>{
          (this.state.noResult) ? (<Text>No result match.</Text>) : null
        }
        </View>
        <ListView
         renderScrollComponent={props => <InfiniteScrollView {...props} />}
         dataSource={this.state.dataSource}
         renderRow={this.renderRow.bind(this)}
         canLoadMore={this.state.canLoadMoreContent}
         onLoadMoreAsync={this.loadResult.bind(this)}
         enableEmptySections={true}
         />

      </Container>
    );

  }
}
