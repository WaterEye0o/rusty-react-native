'use strict';

import React, { Component } from 'react'; import {
  Navigator,
  BackAndroid,
  Platform
} from 'react-native';


export default class CustomNavigator extends React.Component {
  _handlers= []

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton.bind(this));
  }

  getChildContext() {
    return {
      addBackButtonListener: this.addBackButtonListener,
      removeBackButtonListener: this.removeBackButtonListener,
    };
  }

  addBackButtonListener(listener) {
    this._handlers.push(listener);
  }

  removeBackButtonListener(listener) {
    this._handlers = this._handlers.filter((handler) => handler !== listener);
  }

  _handleBackButton() {
    for (let i = this._handlers.length - 1; i >= 0; i--) {
      if (this._handlers[i]()) {
        return true;
      }
    }

    const {navigator} = this.refs;
    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true;
    }

    return false;
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        initialRoute={this.props.initialRoute}
        configureScene={this.props.configureScene}
        renderScene={this.props.renderScene}
        navigationBar={this.props.navigationBar}
      />
    )
  }
}

CustomNavigator.childContextTypes = {
  addBackButtonListener: React.PropTypes.func,
  removeBackButtonListener: React.PropTypes.func,
};

CustomNavigator.propType = {
  initialRoute: React.PropTypes.Object,
  configureScene: React.PropTypes.Object,
  renderScene: React.PropTypes.Object,
  navigationBar: React.PropTypes.Object
};

