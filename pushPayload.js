import React, { Component } from 'react';
import {

} from 'react-native';

class PushPayload extends Component {

    constructor(props){
        super(props);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };

    }


    render() {
        return (
            <View style={{
                flex:1,
                paddingTop: 80,
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <Text>Hi THere!</Text>
            </View>
        );
    }
}

export default PushPayload;