import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#ecf0f1',
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#48bbec'
  },
  gridContainer: {
    //marginTop: 30,
    justifyContent:'flex-start',
  },
  gridRow:{
    flex:1,
    flexDirection:'row',
    padding:20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1,
  },
  navBar: {
    height: 60,
    //paddingTop: 65,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    alignSelf: 'stretch',
    // borderWidth: 1,
    // borderColor: '#48bbec'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  logo: {
    width: 70,
    height: 60,
    //paddingTop: 65,
    marginTop: 20,
    alignSelf: 'center'
  },
  icon: {
    resizeMode: 'contain',
    width: 40,
    height: 30,
  },
  input: {
    height: 50,
    alignSelf: 'stretch',
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 0,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  error: {
    color: '#c0392b',
    justifyContent: 'center',
    paddingTop: 10
  }
});