import React, {Component} from 'react';
import {View, Text,Alert} from 'react-native';
import Modal from 'react-native-modalbox';
import {Item, Input, Icon, Button} from 'native-base';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      phone: '',
      password: '',
      error: false,
      objectId:"",
      messageError:""
    };
  }
  open() {
    this.refs.registerModal.open();
  }
  onChangeName(text) {
    this.setState({
      name: text,
      error: false,
    });
  }
  onChangeLastName(text) {
    this.setState({
      lastName: text,
      error: false,
    });
  }
  onChangePassword(text) {
    this.setState({
      password: text,
      error: false,
    });
  }
  onChangePhone(text) {
    this.setState({
      phone: text,
      error: false,
    });
  }
  async fetchDatatoServer() {
    const response = await fetch('http://10.0.2.2:3000/users/register', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: this.state.name,
        lastName: this.state.lastName,
        phone: this.state.phone,
        password: this.state.password,
      }),
    });
    const responsejson = await response.json();
    await this.setState({
      status:responsejson.status
    })
    await console.log(responsejson)
    if(this.state.status==200){
      await this.setState({
        objectId:responsejson.user._id
      });
      console.log(this.state)
      this.refs.registerModal.close()
      return
    }
    if(this.state.status==500||this.state.status==202){
      this.setState({
        messageError:responsejson.error
      })
      Alert.alert(
        "مشکل پیش اومد  :(",
        this.state.messageError,[
          {text:"باشه" ,}
        ]
      )
    }
  }
  onRegister() {
    if (
      this.state.name == '' ||
      this.state.lastName == '' ||
      this.state.phone == '' ||
      this.state.password == ''
    ) {
      this.setState({
        error: true,
      });
      return;
    } else {
      //console.log(this.state)
      this.fetchDatatoServer();
    }
  }
  render() {
    return (
      <Modal
        ref={'registerModal'}
        position={'center'}
        backdrop={true}
        style={{width: '80%', height: '60%', borderRadius: 30}}>
        <View
          style={{
            flex: 1,
            borderRadius: 30,
            margin: 20,
            justifyContent: 'center',
          }}>
          <View>
            <Item>
              <Input
                placeholder={'نام'}
                style={{fontFamily: 'IRANSansMobile_Light'}}
                onChangeText={this.onChangeName.bind(this)}
              />
              <Icon name={'person'} style={{color:'#E91E63'}} />
            </Item>
          </View>
          <View>
            <Item>
              <Input
                placeholder={'نام خانوادگی'}
                style={{fontFamily: 'IRANSansMobile_Light'}}
                onChangeText={this.onChangeLastName.bind(this)}
              />
              <Icon name={'person'} style={{color:'#E91E63'}} />
            </Item>
          </View>
          <View>
            <Item>
              <Input
                keyboardType={'number-pad'}
                placeholder={'شماره موبایل'}
                style={{fontFamily: 'IRANSansMobile_Light'}}
                onChangeText={this.onChangePhone.bind(this)}
              />
              <Icon name={'call'} style={{color:'#E91E63'}} />
            </Item>
          </View>
          <View>
            <Item>
              <Input
                secureTextEntry={true}
                placeholder={'پسورد'}
                style={{fontFamily: 'IRANSansMobile_Light', textAlign: 'right'}}
                onChangeText={this.onChangePassword.bind(this)}
              />
              <Icon name={'lock'} style={{color:'#E91E63'}} />
            </Item>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E91E63',
                elevation: 10,
                borderRadius: 15,
              }}
              onPress={this.onRegister.bind(this)}>
              <Text style={{fontFamily: 'IRANSansMobile', color: 'white'}}>
                ثبت نام
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Register;
