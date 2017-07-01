import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './style'

export default class LoadingComponent extends Component{
    constructor(props){
      super(props);
    }

    render(){
      return (
        <View style={styles.loading}>
          <ActivityIndicator size='large' color='#FF6EEC'/>
        </View>
      );
    }

}
