import React, {Component} from 'react';
import {View, Text,Image} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {Button} from 'native-base';
import MyPageViewer from '../../../components/pageViewer/MyPageViewer';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  online() {
    this.props.navigation.navigate('HomeScreen');
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex:1, alignItems: 'center',marginTop:30}}>
          <Text style={{fontSize: 20, fontFamily: 'IRANSansMobile_Bold',color:'#E91E63'}}>
            فست
          </Text>
          <Text style={{fontSize: 15, fontFamily: 'IRANSansMobile_Bold',color:'#E91E63'}}>
            فود !
          </Text>
        </View>
        <MyPageViewer/>
        <View
          style={{
              flex:1,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Button
            style={{width: 150, justifyContent: 'center',borderRadius:20,marginBottom:10,backgroundColor:'#E91E63'}}
            onPress={this.online.bind(this)}>
            <Text style={{fontFamily: 'IRANSansMobile_Light',color:'white'}}>
              سفارش آنلاین
            </Text>
          </Button>
          <Button transparent style={{width: 150, justifyContent: 'center',borderRadius:20}} onPress={()=>{
            this.props.navigation.navigate('LoginScreen')
          }} >
            <Text style={{fontFamily: 'IRANSansMobile_Light',color:'black'}}>
              ورود / عضویت
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Splash;
