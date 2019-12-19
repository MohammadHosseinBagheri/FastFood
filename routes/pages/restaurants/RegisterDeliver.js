import React, {Component} from 'react';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon, Card, CardItem, Body, Item, Input, Button} from 'native-base';
class RegisterDeliver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      nationalCode: '',
      pelak: '',
      phone: '',
      restaurantId: null,
    };
  }
  onChangename(text) {
    this.setState({
      name: text,
    });
  }
  onChangelastName(text) {
    this.setState({
      lastName: text,
    });
  }
  onChangenationalCode(text) {
    this.setState({
      nationalCode: text,
    });
  }
  onChangepelak(text) {
    this.setState({
      pelak: text,
    });
  }
  onChangephone(text) {
    this.setState({
      phone: text,
    });
  }
  async componentDidMount() {
    const restaurantId = await this.props.navigation.state.params;
    await this.setState({
      restaurantId: restaurantId,
    });
  }
  async fetchDatatoRegisterDeliver() {
    console.log(this.state.nationalCode);
    console.log(
      this.state.restaurantId,
      this.state.lastName,
      this.state.name,
      this.state.pelak,
    );
    const response = await fetch('http://10.0.2.2:3000/users/driver/register', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        lastName: this.state.lastName,
        nationalCode: this.state.nationalCode,
        pelak: this.state.pelak,
        phone: this.state.phone,
        restaurantId: this.state.restaurantId,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    const status = await responseJson.status;
    return status;
  }
  async onLogin() {
    if (
      this.state.lastName == '' ||
      this.state.name == '' ||
      this.state.nationalCode == '' ||
      this.state.pelak == '' ||
      this.state.phone == ''
    ) {
      alert('تمام فیلد ها رو پر کنید');
      return;
    } else {
      const status = await this.fetchDatatoRegisterDeliver();
      console.log(status);
      if (status == 200) {
        alert('پیک با موفقیت ثبت شد');
        this.props.navigation.goBack();
        return;
      } else if (status == 403) {
        alert('این راننده قبلا ثبت نام شده است ');
        return;
      } else {
        alert('ثبت راننده با مشکل رو به رو شد ');
        this.props.navigation.goBack();
        return;
      }
    }
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
        <MyHeader
          left={
            <Icon
              style={{color: 'white'}}
              name={'arrow-round-back'}
              onPress={() => {
                this.props.navigation.pop();
              }}
            />
          }
          body={
            <Text
              style={{
                color: 'white',
                fontFamily: 'IRANSansMobile_Bold',
                fontSize: 18,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              ثبت نام راننده
            </Text>
          }
        />
        <Card style={{borderRadius: 20}}>
          <CardItem style={{borderRadius: 20}} header>
            <Body style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: 'IRANSansMobile_Bold',
                  textAlign: 'center',
                }}>
                لطفا اطلاعات دقیق را وارد کنید
              </Text>
            </Body>
          </CardItem>
          <CardItem>
            <Item>
              <Input
                style={{
                  textAlign: 'center',
                  fontFamily: 'IRANSansMobile_Medium',
                  fontSize: 13,
                }}
                onChangeText={this.onChangename.bind(this)}
                placeholder={' نام راننده'}
              />
              <Icon name={'restaurant'} style={{color: '#E91E63'}} />
            </Item>
          </CardItem>
          <CardItem>
            <Item>
              <Input
                style={{
                  textAlign: 'center',
                  fontFamily: 'IRANSansMobile_Medium',
                  fontSize: 13,
                }}
                placeholder={'نام خانوادگی راننده'}
                onChangeText={this.onChangelastName.bind(this)}
              />
              <Icon name={'pin'} style={{color: '#E91E63'}} />
            </Item>
          </CardItem>
          <CardItem>
            <Item>
              <Input
                style={{
                  textAlign: 'center',
                  fontFamily: 'IRANSansMobile_Medium',
                  fontSize: 13,
                }}
                placeholder={'کد ملی '}
                onChangeText={this.onChangenationalCode.bind(this)}
              />
              <Icon name={'pin'} style={{color: '#E91E63'}} />
            </Item>
          </CardItem>
          <CardItem>
            <Item>
              <Input
                style={{
                  textAlign: 'center',
                  fontFamily: 'IRANSansMobile_Medium',
                  fontSize: 13,
                }}
                placeholder={'پلاک   '}
                onChangeText={this.onChangepelak.bind(this)}
              />
              <Icon name={'call'} style={{color: '#E91E63'}} />
            </Item>
          </CardItem>
          <CardItem>
            <Item>
              <Input
                style={{
                  textAlign: 'center',
                  fontFamily: 'IRANSansMobile_Medium',
                  fontSize: 13,
                }}
                placeholder={'تلفن  '}
                onChangeText={this.onChangephone.bind(this)}
              />
              <Icon name={'person'} style={{color: '#E91E63'}} />
            </Item>
          </CardItem>
        </Card>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            margin: 10,
            marginBottom: 0,
          }}>
          <Button
            style={{
              backgroundColor: '#E91E63',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              justifyContent: 'center',
            }}
            onPress={this.onLogin.bind(this)}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'IRANSansMobile',
                fontSize: 16,
              }}>
              ثبت راننده
            </Text>
            <Icon name={'bicycle'} />
          </Button>
        </View>
      </View>
    );
  }
}

export default RegisterDeliver;
