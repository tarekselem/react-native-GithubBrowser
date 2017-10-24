import Buffer from 'buffer';
import _ from 'lodash';
import {AsyncStorage} from 'react-native';

const authKey = 'auth';
const userKey = 'user';

export class AuthService {

    // objectify(array) {
    //     return array.reduce(function(p, c) {
    //          p[c[0]] = c[1];
    //          return p;
    //     }, {});
    // }

    getAuthInfo(cb){
        debugger;
        AsyncStorage.multiGet([authKey,userKey], (err,val)=>{
            if(err){
                return cb(err);
            }
            if(!val){
                return cb();
            }

            //var zippedObj = objectify(val);
            var zippedObj = _.zipObject(val);
            
            console.log('Authincator: '+zippedObj)
            
            if(!zippedObj[authKey]){
                return cb();
            }

            var authInfo = {
                header:{
                    Authorization: 'Basic '+ zippedObj[authKey]
                },
                //user: JSON.parse(val[1][1])
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

            // this.getAuthInfo((err,authInfo)=>{
            //     console.log('auth from login : '+authInfo)
            //   });

            return cb({showProgress: false});
        });
    }
}

export default AuthService;