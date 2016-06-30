'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated
} from 'react-native';
const CustomStyleSheet = require('./CustomStyleSheet');

export default class BrowseBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: new Animated.Value(0),
      isAnimated: false,
      isUp: true
    };
  }

  up() {
    if (!this.state.isUp || this.state.isAnimated) return
    this.setState({isUp: false, isAnimated: true})
    Animated.timing(
      this.state.bottom,
      {
        toValue: -98 / 2,
        duration: 200
      }
    ).start(()=> {
      this.setState({isAnimated: false})
    });
  }

  down() {
    if (this.state.isUp || this.state.isAnimated) return;
    this.setState({isUp: true, isAnimated: true});
    Animated.timing(
      this.state.bottom,
      {
        toValue: 0,
        duration: 200
      }
    ).start(()=> {
      this.setState({isAnimated: false})
    });
  }

  render() {
    return (
      <Animated.View style={[styles.footer,{bottom:this.state.bottom},this.props.style]}>

        {this.props.children}

      </Animated.View>
    )
  }
}

var styles = CustomStyleSheet.create({
  footer: {
    flex: 1,
    backgroundColor: "#ffc600",
    height: 98 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
});
