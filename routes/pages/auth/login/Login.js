import React, {Component} from 'react';
import {View, Text} from 'react-native';
import MyHeader from '../../../../components/Header/MyHeader';
import {Item, Input, Icon, Button} from 'native-base';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <MyHeader
        left={<Icon name={'arrow-back'} style={{color:'white'}} onPress={()=>{
          this.props.navigation.pop()
        }} />} 
         />
        <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
          <Text style={{fontFamily:'IRANSansMobile_Light',fontSize:18}} >شماره موبایل خود را وارد کنید</Text>
          <Item>
            <Icon name={'call'} />
            <Input keyboardType={'number-pad'} style={{fontFamily:'IRANSansMobile'}} placeholder={'شماره موبایل'} />
          </Item>
          <View style={{justifyContent:'center'}}>
            <Button transparent onPress={()=>{
              this.props.navigation.navigate('RegisterScreen')
            }} >
              <Text style={{color:'red',fontFamily:'IRANSansMobile_Bold'}} >ثبت نام نکرده ام</Text>
            </Button>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Button style={{justifyContent: 'center', alignItems: 'center',backgroundColor:'#E91E63'}}>
            <Text style={{fontFamily:'IRANSansMobile',color:'white'}} >تایید شماره موبایل</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Login;
