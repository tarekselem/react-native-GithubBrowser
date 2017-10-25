import React, { Component } from 'react';
import {
    View,
    Text,
    ListView
} from 'react-native';

import Styles from './style';
import AuthService from './services/authService';

var _authenticator = new AuthService();

class Feed extends Component {
    constructor(props){
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
              'John', 'Joel'
            ])
          };
    }

    fetchFeed(){
        _authenticator.getAuthInfo((err,authInfo)=>{
            var url = 'https://api.github.com/users/'
            + authInfo.user.login
            + '/received_events';

            fetch(url,{
                headers: authInfo.header
            })
            .then((response)=> response.json())
            .then((responseData)=>{
                var feedItems = responseData.filter((ev)=> ev.type == 'WatchEvent');
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(feedItems)
                });
            });
        });
    };

    renderRow(rowData){
        return <View><Text style={Styles.gridRow}>{rowData}</Text></View>
    }

    componentDidMount(){
        this.fetchFeed();
    }

    render() {
        return (
            <View style={Styles.gridContainer}>
                <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                />
            </View>
        );
    }
}

export default Feed;