import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    NavigatorIOS,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Feed from './feed';
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
            <TabNavigator tabBarStyle={Styles.navBar}>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'feed'}
              title="Feed"
              renderIcon={() => <Image style={Styles.icon} source={require('./img/github-home.png')} />}
              //badgeText="9"
              onPress={() => this.setState({ selectedTab: 'feed' })}>
                <View>
                    <NavigatorIOS
                    style={{flex:1}}
                    initialRoute={{
                        component:Feed,
                        title: 'Feed'
                    }}
                    />
                </View>
            </TabNavigator.Item>
            <TabNavigator.Item
              selected={this.state.selectedTab === 'search'}
              title="Search"
              renderIcon={() => <Image style={Styles.icon} source={require('./img/github-search.png')} />}
              //renderBadge={() => <View />}
              onPress={() => this.setState({ selectedTab: 'search' })}>
              <View>
                  <Text>Tab2</Text>
              </View>
            </TabNavigator.Item>
          </TabNavigator>
          );
    }
}

export default AppContainer;