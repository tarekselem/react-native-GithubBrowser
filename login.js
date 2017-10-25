import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';

import Styles from './style';
import Buffer from 'buffer';
import AuthService from './services/authService';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProgress: false,
        };
    }

    render() {
        var errorCtrl = <View />;
        if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style={Styles.error}>
            That username and password combination did not work
            </Text>;
        }
        if(this.state.UnknownError){
            errorCtrl = <Text style={Styles.error}>
            We experienced an unexpected issue
            </Text>;
        }

        return (
            <View style={Styles.container}>
                <Image style={Styles.logo} source={require('./img/Octocat.png')}/>
                <Text style={Styles.heading}>
                    Github Browser
                </Text>
                <TextInput
                    style={Styles.input}
                    placeholder='Github username'
                    onChangeText={(text) => this.setState({username: text})}/>
                <TextInput
                    style={Styles.input}
                    placeholder='Github password'
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}/>
                <TouchableHighlight
                    style={Styles.button}
                    onPress={this
                    .onLoginPressed
                    .bind(this)}>
                    <Text style={Styles.buttonText}>
                        Login
                    </Text>
                </TouchableHighlight>

                {errorCtrl}

                <ActivityIndicator
                    style={{
                    marginTop: 20,
                    opacity: this.state.showProgress
                        ? 1.0
                        : 0.0
                }}
                    animating={true}
                    size='large'/>
            </View>
        );
    }

    onLoginPressed() {
        this.setState({showProgress: true});
        
        var auth = new AuthService();
        auth.login({
            username: this.state.username,
            password: this.state.password
        },(result)=>{
            this.setState(Object.assign({
                showProgress: false
            },result));

            if(result.success && this.props.onLogin){
                this.props.onLogin();
            }
        });
    };
}

export default Login;