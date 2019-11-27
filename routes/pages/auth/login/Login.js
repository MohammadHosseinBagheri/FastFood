import React, {Component} from 'react';
import {View, Text,Image} from 'react-native';
import MyHeader from '../../../../components/Header/MyHeader';
import {Item, Input, Icon, Button} from 'native-base';
import LoginModal from '../../../../components/Modal/LoginModal';
import Register from '../register/Register';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }
  changePhone(text) {
    this.setState({
      phone: text,
    });
  }
  openModal() {
    this.refs.login.open();
  }
  openRegisterModal() {
    this.refs.registerModal.open();
  }
  async fetchUser() {
    console.log(this.state.phone);
    const response = await fetch('http://10.0.2.2:3000/users/login', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: this.state.phone,
      }),
    });
    const responseJson = await response.json();
    const status = await responseJson.status;
    console.log(responseJson);
    console.log(status);
    if ((await status) == 404) {
      this.openModal();
      return;
    } else {
      console.log('ok');
    }
  }
  async fetchResManager() {
    const response = await fetch('http://10.0.2.2:3000/restaurants/login', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.phone,
      }),
    });
    const responseJson = await response.json();
    await console.log(responseJson);
    const status = await responseJson.status;
    //console.log(status);
    if (status == 200) {
      this.props.navigation.replace(
        'RestaurantsManagementScreen',
        (data = {
          data: responseJson,
        }),
      );
      return;
    }
  }
  login() {
    if (this.state.phone.slice(0, 3) == 'res') {
      this.fetchResManager();
      console.log('ok');
      return;
    } else {
      this.fetchUser();
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <MyHeader
          left={
            <Icon
              name={'arrow-back'}
              style={{color: 'white'}}
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
          }
          body={
            <Text style={{fontFamily: 'IRANSansMobile_Bold', fontSize: 18,color:'white'}}>
              صفحه ورود
            </Text>
          }
        />
        <View style={{flex: 1, alignItems: 'center', margin: 20}}>
          <Image resizeMode={'stretch'} source={require('../../../../assets/img/user.png')} style={{width:100,height:100,marginTop:-40,marginBottom:20}} />
          <Text style={{fontFamily: 'IRANSansMobile_Light', fontSize: 18}}>
            شماره موبایل خود را وارد کنید
          </Text>
          <Item style={{margin:20}}>
            <Icon name={'call'} />
            <Input
              style={{fontFamily: 'IRANSansMobile'}}
              placeholder={'شماره موبایل'}
              onChangeText={this.changePhone.bind(this)}
            />
          </Item>
          <View style={{justifyContent: 'center'}}>
            <Button transparent onPress={this.openRegisterModal.bind(this)}>
              <Text style={{color: 'red', fontFamily: 'IRANSansMobile_Bold'}}>
                ثبت نام نکرده ام
              </Text>
            </Button>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Button
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E91E63',
            }}
            //onPress={this.fetchUser.bind(this)}
            onPress={this.login.bind(this)}>
            <Text style={{fontFamily: 'IRANSansMobile', color: 'white'}}>
              تایید شماره موبایل
            </Text>
          </Button>
        </View>
        <LoginModal ref={'login'} navigation={this.props.navigation} />
        <Register ref={'registerModal'} />
      </View>
    );
  }
}

export default Login;
