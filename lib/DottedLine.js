'use strict';

import React, { Component } from 'react'; import {
  StyleSheet,
  View,
  Text
} from 'react-native';

const DOTTED_WIDTH_DEFAULT = 9 / 2
const DOTTED_HEIGHT_DEFAULT = 1
const DOTTED_SPACING_DEFAULT = 5 / 2
const CustomStyleSheet = require('./CustomStyleSheet')

export default class DottedLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainHeight: 0,
      mainWidth: 0,
      dottedHeight: props.dottedHeight ? props.dottedHeight : DOTTED_HEIGHT_DEFAULT,
      dottedWidth: props.dottedWidth ? props.dottedWidth : DOTTED_WIDTH_DEFAULT,
      dottedSpacing: props.dottedSpacing ? props.dottedSpacing : DOTTED_SPACING_DEFAULT,
      isHorizontal: props.isHorizontal,
      dottedColor: props.dottedColor ? props.dottedColor : '#ffffff'
    };
  }

  _dottedViewRender(i) {
    let {isHorizontal,dottedSpacing,dottedHeight,dottedWidth, dottedColor} = this.state

    let dottedViewStyle;
    if (isHorizontal) {
      dottedViewStyle = {
        height: dottedHeight,
        width: dottedWidth,
        marginBottom: dottedSpacing
      }
    } else {
      dottedViewStyle = {
        height: dottedHeight,
        width: dottedWidth,
        marginRight: dottedSpacing
      }
    }

    return <View key={i} style={[dottedViewStyle,{backgroundColor:dottedColor}]}/>
  }

  getDotCount() {
    let {isHorizontal,dottedSpacing,dottedHeight,dottedWidth } = this.state
    if (isHorizontal) {
      return this.state.mainHeight / (dottedHeight + dottedSpacing)
    } else {
      return this.state.mainWidth / (dottedWidth + dottedSpacing)
    }
  }

  _onMainLayout(e) {
    let layout = e.nativeEvent.layout
    this.setState({
      mainHeight: layout.height,
      mainWidth: layout.width
    })
  }

  render() {
    let dots = []
    let dotsCount = this.getDotCount()
    for (let i = 0; i < dotsCount; i++) {
      dots.push(this._dottedViewRender(i))
    }
    return (
      <View
        style={[styles.dottedLine,this.props.style]}
        onLayout={this._onMainLayout.bind(this)}
      >
        {dots}
      </View>
    )
  }
}

DottedLine.propType = {
  dottedColor: React.PropTypes.string,
  dottedHeight: React.PropTypes.number,
  dottedWidth: React.PropTypes.number,
  //虚线每个小横线之间的距离
  dottedSpacing: React.PropTypes.number,
  isHorizontal: React.PropTypes.bool
};

var styles = CustomStyleSheet.create({
  dottedLine: {
    height: 6 / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
});
