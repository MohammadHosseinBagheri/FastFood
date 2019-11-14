import React, {Component} from 'react';
import {View, Text} from 'react-native';
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
      managePhone:text
    });
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
              ثبت رستوران
            </Text>
          }
        />
        <View style={{margin: 20}}>
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
                  placeholder={'نام رستوران'}
                />
                <Icon name={'restaurant'} />
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
                />
                <Icon name={'pin'} />
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
                />
                <Icon name={'pin'} />
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
                />
                <Icon name={'call'} />
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
                />
                <Icon name={'person'} />
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
                />
                <Icon name={'calculator'} />
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
            }}>
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
      </View>
    );
  }
}

export default RestaurantsRegister;
