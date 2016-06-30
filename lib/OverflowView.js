'use strict';

import React, {Component} from 'react';
import ReactNative,{
  View,
  StyleSheet
} from 'react-native';
const CustomStyleSheet = require('./CustomStyleSheet');

export default class TestView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      overflowTop,
      overflowBottom,
      overflowLeft,
      overflowRight,
      style,
      children,
      fixCircleBorderColor
      } = this.props

    let fixCircleClippingView

    const _style = StyleSheet.flatten(style)
    if (_style.borderRadius) {
      const circleSize = _style.borderRadius
      const fixCircleClippingViewStyle = {
        position: 'absolute',
        top: -circleSize / 2,
        bottom: -circleSize / 2,
        right: -circleSize / 2,
        left: -circleSize / 2,
        borderRadius: circleSize / 2 * 3,
        borderColor: fixCircleBorderColor,
        borderWidth: circleSize / 2,
      }
      fixCircleClippingView = <View style={fixCircleClippingViewStyle}/>
    }

    return (
      <View
        {...this.props}
      >
        {children}
        {fixCircleClippingView}
      </View>
    )
  }
}

TestView.defaultProps = {
  overflowTop: 0,
  overflowBottom: 0,
  overflowLeft: 0,
  overflowRight: 0,
  fixCircleBorderColor: 'black'
}

TestView.propType = {
  overflowTop: React.PropTypes.number,
  overflowBottom: React.PropTypes.number,
  overflowLeft: React.PropTypes.number,
  overflowRight: React.PropTypes.number,
  fixCircleBorderColor: React.PropTypes.string
};

var styles = CustomStyleSheet.create({});
