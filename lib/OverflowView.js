'use strict';

import React from'react';
import {
  View,
  StyleSheet
}from 'react-native'

export default class OverflowView extends React.Component {

  render() {
    const {
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
        borderWidth: circleSize / 2
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
