import React, { Component } from 'react';
import {
    View,
    Text,

} from 'react-native';

import Styles from './style';
class AppContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectedTab:'feed',
        };
    }
    render() {
        return(
            <View style={Styles.container}>
              <Text style={Styles.heading}>LoggedIn Dashboard</ Text>
            </View>
          );
    }
}

export default AppContainer;