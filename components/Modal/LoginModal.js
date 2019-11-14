import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Modal from 'react-native-modalbox';
import {Button} from 'native-base';
import Register from '../../routes/pages/auth/register/Register';

class MyLoginMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  open() {
    this.refs.login.open();
  }
  async openRegisterModal() {
    await this.refs.login.close();
    await this.refs.registerModal.open();
  }
  render() {
    return (
      <Modal
        ref={'login'}
        position={'center'}
        backdrop={true}
        style={{width: '60%', height: '30%', borderRadius: 30}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
          }}>
          <Text style={{fontFamily: 'IRANSansMobile_Bold'}}>
            کاربر با این شماره موبایل یافت نشد !
          </Text>
          <Button
            onPress={this.openRegisterModal.bind(this)}
            transparent
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'red', fontFamily: 'IRANSansMobile_Light'}}>
              ثبت نام
            </Text>
          </Button>
        </View>
        <Register ref={'registerModal'} />
      </Modal>
    );
  }
}
export default MyLoginMenu;
