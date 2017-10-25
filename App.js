/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Text, View, ActivityIndicator} from 'react-native';

import Styles from './style';
import AuthService from './services/authService';

import Login from './login';
import AppContianer from './appContainer';

var _authenticator = new AuthService();

export default class App extends Component<{}> {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      checkingAuth: true,
    };

    this.onLogin = this.onLogin.bind(this);
  }
   
  onLogin() {
    this.setState({isLoggedIn: true});
  };

  componentDidMount(){
    _authenticator.getAuthInfo((err,authInfo)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo !=null
      });
    });
  }
  render() {
    if(this.state.checkingAuth){
      return (
        <View style={Styles.container}>
          <ActivityIndicator style={Styles.loader} animating={true} size='large' />
          <Text style={Styles.heading}>Auth</Text>
        </View>
      );
    }

    if (this.state.isLoggedIn) {
      return(
        <AppContianer />
      );
    } else {
      return (
          <Login onLogin={this.onLogin.bind(this)}/>
      );
    }

  }
}
