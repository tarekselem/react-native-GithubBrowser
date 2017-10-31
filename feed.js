import React, {Component} from 'react';
import {
    View,
    Text,
    ListView,
    ActivityIndicator,
    Image,
    TouchableHighlight,
} from 'react-native';
import Moment from 'moment';
import Styles from './style';
import AuthService from './services/authService';

import PushPayload from './pushPayload';



var _authenticator = new AuthService();

class Feed extends Component {
    constructor(props) {
        super(props);

        this.pressRow = this.pressRow.bind(this);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true
        };
    }

    fetchFeed() {
        _authenticator.getAuthInfo((err, authInfo) => {
            var url = 'https://api.github.com/users/' + authInfo.user.login + '/received_events';

            fetch(url, {headers: authInfo.header}).then((response) => response.json()).then((responseData) => {
                var feedItems = responseData;
                //.filter((ev)=> ev.type == 'WatchEvent');
                this.setState({
                    dataSource: this
                        .state
                        .dataSource
                        .cloneWithRows(feedItems),
                    showProgress: false
                });
            });
        });
    }

    maintainActionString(action) {
        var maintainedStr = action.replace('Event', '');
        return (maintainedStr.match('e$') == 'e')
            ? maintainedStr + 'd '
            : maintainedStr + 'ed ';
    }

    pressRow(rowData){
        debugger;
       this.props.navigator.push({
           title:'Push Event',
           component: PushPayload,
           passProps:{
               pushEvent: rowData
           }
       });
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight onPress={()=> this.pressRow(rowData)} underlayColor='#ddd'>
                <View style={Styles.gridRow}>
                    <Image
                        source={{
                        uri: rowData.actor.avatar_url
                    }}
                        style={{
                        height: 36,
                        width: 36,
                        borderRadius: 18
                    }}/>

                    <View style={{
                        paddingLeft: 20
                    }}>
                        <Text
                            style={{
                            backgroundColor: '#fff'
                        }}>{Moment(rowData.created_at).fromNow()}</Text>
                        <Text
                            style={{
                            backgroundColor: '#fff'
                        }}>
                            <Text
                                style={{
                                fontWeight: 'bold'
                            }}>{rowData.actor.login}{'\n'}
                            </Text>
                              { this.maintainActionString(rowData.type) } 
                             Repository:
                        </Text>
                        <Text
                            style={{
                            fontWeight: 'bold'
                        }}>
                            {rowData.repo.name}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    componentDidMount() {
        this.fetchFeed();
    }

    render() {
        if (this.state.showProgress) {
            return (
                <View >
                    <ActivityIndicator style={Styles.loader} size='large' animating={true}/>
                </View>
            );
        } else {
            return (
                
                <View style={Styles.gridContainer}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this
                        .renderRow
                        .bind(this)}/>
                </View>
            );
        }
    }
}

export default Feed;