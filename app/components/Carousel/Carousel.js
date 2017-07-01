import React,{Component} from 'react';
import {ListView,View,Image, TouchableOpacity,Text} from 'react-native';
import {Thumbnail} from 'native-base';
import styles from './style';
import Dimensions from 'Dimensions';

export default class Carousel extends Component{

  constructor(props){
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      contentOffset: 0,
      previousOffset : 0,
      left: false,
      right: this.props.videos.length < 3 ? false: true,
      dataSource: ds.cloneWithRows(this.props.videos),
      propsChange: false,
    };
    this.window =  Dimensions.get('window');
    this.ITEMS_PER_PAGE = 3;
    this.ONE_THIRD_OF_SCREEN_WIDTH = this.window.width/3;
    this.MAX_OFFSET_SCROLL_VIEW = this.props.videos.length*this.ONE_THIRD_OF_SCREEN_WIDTH -
    3*this.ONE_THIRD_OF_SCREEN_WIDTH;
  }



  componentWillReceiveProps(){
    this.setState({
      propsChange : true
    })
  }

  componentDidUpdate(){
    if(this.state.propsChange == true){
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.videos),
        left: false,
        right: this.props.videos.length < 3 ? false: true,
        propsChange: false
      });
      this.MAX_OFFSET_SCROLL_VIEW = this.props.videos.length*this.ONE_THIRD_OF_SCREEN_WIDTH -
      3*this.ONE_THIRD_OF_SCREEN_WIDTH;
    }
    this.updateArrow();
  }

  updateArrow(){
    if(this.state.previousOffset != this.state.contentOffset){
      this.setState({
        previousOffset: this.state.contentOffset,
        left: this.state.contentOffset <= 0 ? false: true,
        right: this.state.contentOffset >= this.MAX_OFFSET_SCROLL_VIEW ? false : true
      })
    }
  }

  scrollLeft(){
    var newOffset = this.calculateOffset(this.state.contentOffset - this.ONE_THIRD_OF_SCREEN_WIDTH);
      if(newOffset >= 0){
          this.setState({
          contentOffset: newOffset,
        });
          this.refs.listView.scrollTo({x: newOffset, y: 0});
      }
  };

  calculateOffset(offset){
    if(offset % this.ONE_THIRD_OF_SCREEN_WIDTH != 0){
        offset -= offset % this.ONE_THIRD_OF_SCREEN_WIDTH;
    }
    return offset;
  }

  scrollRight(){
      var newOffset = this.calculateOffset(this.state.contentOffset + this.ONE_THIRD_OF_SCREEN_WIDTH);
    if(newOffset <= this.MAX_OFFSET_SCROLL_VIEW){
        this.setState({
        contentOffset: newOffset,
      });
      this.refs.listView.scrollTo({x: newOffset, y: 0});
    }
};

  goToDetailVideoComponent(video){
      this.props.onClick(video);
  };

  renderSmallVideo(video){
    let data = (
        <View style={styles.itemOfCarousel}>
        <TouchableOpacity onPress={() => this.goToDetailVideoComponent(video)}>
          <Image style={styles.imageOfCarouselItem} source={{uri: video.thumb}}/>
        </TouchableOpacity>
        <View style={styles.infoCarouselItem}>
              <Thumbnail small source={require('../../images/Image-Icon 4.png')} bottom={2} right={5}/>
              <View>
                <Text numberOfLines={1} style={styles.titleVideoOfCarouselItem}>{video.title}</Text>
                <Text numberOfLines={1} style={styles.videoChannelOfCarouselItem}>{video.sport}</Text>
              </View>
        </View>
          </View>
    );
    return data;
  };

  renderLeftArrow(){
    if(this.state.left === true){
      return(
      <TouchableOpacity key={'dfd'}  style={styles.arrowLeft} onPress={() => this.scrollLeft()} >
        <Image source={require("../../images/left.png")}
            style={styles.arrowLeft}/>
      </TouchableOpacity>
    );
  }
  };

  renderRightArrow(){
    let result = (<View/>);
    if(this.state.right === true){
      return (
        <TouchableOpacity style={styles.arrowRight} onPress={() => this.scrollRight()}>
        <Image source={require("../../images/right.png")}
          style={styles.arrowRight}/>
      </TouchableOpacity>
    );
  }

  };

  onScroll(offset){
    this.setState({
      contentOffset: offset
    })
  }

  render(){
    return(
      <View style={styles.carousel}>
        <View style={styles.listCarousel}>
          <ListView horizontal={true} showsHorizontalScrollIndicator={false}
            ref="listView"
            onScroll={(event) => this.onScroll(event.nativeEvent.contentOffset.x)}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderSmallVideo(rowData)}/>
        </View>
        {this.renderLeftArrow()}
        {this.renderRightArrow()}
      </View>
    )
  };

}
