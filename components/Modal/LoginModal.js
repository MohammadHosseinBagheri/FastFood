import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Modal from 'react-native-modalbox';
import {Button} from 'native-base';

class MyLoginMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  open(){
      this.refs.login.open();
  }
  render() {
    return (
      <Modal ref={'login'} position={'center'} backdrop={true} style={{width:'60%',height:'30%',borderRadius:30}}>
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center',borderRadius:30}}>
          <Text style={{fontFamily:'IRANSansMobile_Bold'}} >کاربر با این شماره موبایل یافت نشد !</Text>
          <Button
          onPress={()=>{this.props.navigation.navigate('RegisterScreen')}}
            transparent
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'red', fontFamily: 'IRANSansMobile_Light'}}>
              ثبت نام
            </Text>
          </Button>
        </View>
      </Modal>
    );
  }
}
export default MyLoginMenu
