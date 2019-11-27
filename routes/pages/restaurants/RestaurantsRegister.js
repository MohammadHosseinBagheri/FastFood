import React, {Component} from 'react';
import {View, Text,ImageBackground} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {
  Icon,
  Card,
  CardItem,
  Header,
  Content,
  Body,
  Item,
  Input,
  Button,
} from 'native-base';
class RestaurantsRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantName: '',
      cistyName: '',
      address: '',
      restaurantPhone: '',
      manageName: '',
      managePhone: '',
      error: false,
    };
  }
  onChangeRestaurantName(text) {
    this.setState({
      restaurantName: text,
    });
  }
  onChangeCityName(text) {
    this.setState({
      cistyName: text,
    });
  }
  onChangeAddress(text) {
    this.setState({
      address: text,
    });
  }
  onChangeRestaurantPhone(text) {
    this.setState({
      restaurantPhone: text,
    });
  }
  onChangeMaanageName(text) {
    this.setState({
      manageName: text,
    });
  }
  onChangeManagePhone(text) {
    this.setState({
      managePhone: text,
    });
  }
  async fetchDataToRegisterRestaurant() {
    const response = await fetch('http://10.0.2.2:3000/restaurants/register', {
      method: 'Post',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        name: this.state.restaurantName,
        city: this.state.cistyName,
        address: this.state.address,
        phone: this.state.restaurantPhone,
        manageName: this.state.manageName,
        managePhone: this.state.managePhone,
      }),
    });
    const responseJson = await response.json();
    await console.log(responseJson);
  }
  onRegisterClick() {
      //console.log(this.state)
    if (
      this.state.address == '' ||
      this.state.cistyName == '' ||
      this.state.manageName == '' ||
      this.state.managePhone == '' ||
      this.state.restaurantName == '' ||
      this.state.restaurantPhone == ''
    ) {
      this.setState({
        error: true,
      });
      return;
    } else {
        console.log('ok')
      this.fetchDataToRegisterRestaurant();
    }
  }
  render() {
    return (
      <ImageBackground resizeMode={'stretch'} source={require('../../../assets/img/registerres.jpg')} style={{flex: 1, backgroundColor: '#EEEEEE'}}>
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
              ثبت رستوران
            </Text>
          }
        />
        <View style={{margin: 20,opacity:0.6}}>
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
                  onChangeText={this.onChangeRestaurantName.bind(this)}
                  placeholder={'نام رستوران'}
                />
                <Icon name={'restaurant'} style={{color:'#E91E63'}} />
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
                  placeholder={'نام شهر'}
                  onChangeText={this.onChangeCityName.bind(this)}
                />
                <Icon name={'pin'} style={{color:'#E91E63'}} />
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
                  placeholder={'آدرس '}
                  onChangeText={this.onChangeAddress.bind(this)}
                />
                <Icon name={'pin'} style={{color:'#E91E63'}} />
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
                  placeholder={'تلفن رستوران '}
                  onChangeText={this.onChangeRestaurantPhone.bind(this)}
                />
                <Icon name={'call'} style={{color:'#E91E63'}} />
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
                  placeholder={'نام و نام خانوادگی مدیر رستوران'}
                  onChangeText={this.onChangeMaanageName.bind(this)}
                />
                <Icon name={'person'} style={{color:'#E91E63'}} />
              </Item>
            </CardItem>
            <CardItem style={{borderRadius: 20, borderBottomColor: 'white'}}>
              <Item style={{borderBottomColor: 'white'}}>
                <Input
                  style={{
                    textAlign: 'center',
                    fontFamily: 'IRANSansMobile_Medium',
                    fontSize: 13,
                  }}
                  placeholder={'شماره موبایل مدیر رستوران '}
                  onChangeText={this.onChangeManagePhone.bind(this)}
                />
                <Icon name={'calculator'} style={{color:'#E91E63'}} />
              </Item>
            </CardItem>
          </Card>
        </View>
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
            onPress={this.onRegisterClick.bind(this)}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'IRANSansMobile',
                fontSize: 16,
              }}>
              ثبت اطلاعات رستوران
            </Text>
            <Icon name={'restaurant'} />
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

export default RestaurantsRegister;
