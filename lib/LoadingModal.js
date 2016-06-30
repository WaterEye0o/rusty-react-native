'use strict';

import React, { Component } from 'react'; import {
  View,
  Modal,
  ActivityIndicator,
  Platform,
  Text
} from 'react-native';
const CustomStyleSheet = require('./CustomStyleSheet');

export default class LoadingModal extends React.Component {

  _renderProgress() {

      return (
        <View style={styles.progress}>
          <ActivityIndicator
            color="white"
            size='large'
          />
          <Text style={styles.loadingText}>正在加载中...</Text>
        </View>
      )
  }

  render() {

    return (
      <Modal
        animationType='none'
        transparent={true}
        visible={this.props.visible}
        onRequestClose={()=>{}}
      >
        <View style={styles.main}>
          {this._renderProgress()}
        </View>
      </Modal>
    )
  }
}

LoadingModal.defaultProps = {
  visible:false
};

var styles = CustomStyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  progress: {
    ios:{
      backgroundColor: 'rgba(0,0,0,0.4)',
      width: 100,
      height: 100,
      borderRadius: 5,
      justifyContent: 'center'
    },
    android:{
      backgroundColor:'white',
      width:200,
      height:70,
      flexDirection:'row'
    },
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    position: 'absolute',
    bottom: 5,
    left: 10
  }
});
