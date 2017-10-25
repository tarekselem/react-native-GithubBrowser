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

        var ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([
                'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
              ]),
        }
    }

    fetchFeed(){
        _authenticator.getAuthInfo((err,authInfo)=>{
            var url = 'https://api.github.com/users/'
            + authInfo.user.login
            + '/received_events';

            fetch(url,{
                headers: authInfo.header
            })
            .then((response)=> response.json());
        });
    };

    renderRow(rowData){
        debugger
        return <Text style={{color: '#333', backgroundColor: '#fff', alignSelf: 'center'}}> 
            {rowData} 
        </Text>
    }

    render() {
        return (
            <View style={Styles.containerGrid}>
                <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData)=> <Text>{rowData}</Text>} 
                />
            </View>
        );
    }
}

export default Feed;