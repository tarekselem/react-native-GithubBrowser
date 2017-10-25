import Buffer from 'buffer';
import _ from 'lodash';
import {AsyncStorage} from 'react-native';

const authKey = 'auth';
const userKey = 'user';

export class AuthService {

    getAuthInfo(cb){
        AsyncStorage.multiGet([authKey,userKey], (err,val)=>{
            if(err){
                return cb(err);
            }
            if(!val){
                return cb();
            }

            var zippedObj = Object.assign(...val.map(d => ({[d[0]]: d[1]})));

            
            if(!zippedObj[authKey]){
                return cb();
            }

            var authInfo = {
                header:{
                    Authorization: 'Basic '+ zippedObj[authKey]
                },
                user: JSON.parse(zippedObj[userKey])
            };
            return cb(null,authInfo);
        });
    }

    login(creds, cb) {
        var _buffer = new Buffer.Buffer(creds.username + ':' + creds.password);
        var encodedAuth = _buffer.toString('base64');

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            throw {
                badCredentials: response.status == 401,
                UnknownError: response.status != 401
            }

        }).then((response) => {
            return response.json();
        }).then((results) => {
            AsyncStorage.multiSet([
                [
                    authKey, encodedAuth
                ],
                [
                    userKey, JSON.stringify(results)
                ]
            ], (err) => {
                if (err) {
                    throw err;
                }
                return cb({success: true});
            });
        }).catch((err) => {
            return cb(err);
        }). finally(() => {
            return cb({showProgress: false});
        });
    }
}

export default AuthService;