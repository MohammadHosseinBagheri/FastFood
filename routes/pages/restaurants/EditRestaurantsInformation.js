import React, {Component} from 'react';
import {View, Text} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon, Card, CardItem, Item, Input, Button} from 'native-base';

class EditRestaurantsInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      restaurantName: '',
      restaurantCity: '',
      restaurantAddress: '',
      restaurantTelephone: '',
      restaurantMangerName: '',
      restaurantManagerPhone: '',
    };
  }
  async componentDidMount() {
    const data = await this.props.navigation.state.params;
    //await console.log(data)
    await this.setState({
      data: data,
      restaurantName: data.name,
      restaurantCity: data.city,
      restaurantAddress: data.address,
      restaurantTelephone: data.phone,
      restaurantMangerName: data.manageName,
      restaurantManagerPhone: data.managePhone,
    });
  }
  async fetchDataToUpdate() {
    const response = await fetch('http://10.0.2.2:3000/restaurants/update', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: this.state.data,
        restaurantName: this.state.restaurantName,
        restaurantCity: this.state.restaurantCity,
        restaurantAddress: this.state.restaurantAddress,
        restaurantTelephone: this.state.restaurantTelephone,
        restaurantMangerName: this.state.restaurantMangerName,
        restaurantManagerPhone: this.state.restaurantManagerPhone,
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
  }
  onChangeResName(txt) {
    this.setState({
      restaurantName: txt,
    });
  }
  onChangeResCity(txt) {
    this.setState({
      restaurantCity: txt,
    });
  }
  onChangeResAddr(txt) {
    this.setState({
      restaurantAddress: txt,
    });
  }
  onChangeResTel(txt) {
    this.setState({
      restaurantTelephone: txt,
    });
  }
  onChangeResManagerName(txt) {
    this.setState({
      restaurantMangerName: txt,
    });
  }
  onChangeResManagerPhone(txt) {
    this.setState({
      restaurantManagerPhone: txt,
    });
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
        <MyHeader
          left={
            <Icon
              name={'arrow-back'}
              style={{color: 'white'}}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          }
          body={
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'IRANSansMobile_Bold',
                fontSize: 14,
                color: 'white',
              }}>
              ویرایش اطلاعات رستوران
            </Text>
          }
        />
        <View style={{flex: 1, margin: 10, borderRadius: 10}}>
          <Card style={{borderRadius: 10}}>
            <CardItem style={{borderRadius: 10}}>
              <Item>
                <Input
                  style={{
                    textAlign: 'center',
                    fontFamily: 'IRANSansMobile_Medium',
                    fontSize: 13,
                  }}
                  placeholder={'نام رستوران'}
                  defaultValue={this.state.restaurantName}
                  onChangeText={this.onChangeResName.bind(this)}
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
                  placeholder={'نام شهر'}
                  defaultValue={this.state.restaurantCity}
                  onChangeText={this.onChangeResCity.bind(this)}
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
                  placeholder={'آدرس '}
                  defaultValue={this.state.restaurantAddress}
                  onChangeText={this.onChangeResAddr.bind(this)}
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
                  placeholder={'تلفن رستوران '}
                  defaultValue={this.state.restaurantTelephone}
                  onChangeText={this.onChangeResTel.bind(this)}
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
                  placeholder={'نام و نام خانوادگی مدیر رستوران'}
                  defaultValue={this.state.restaurantMangerName}
                  onChangeText={this.onChangeResManagerName.bind(this)}
                />
                <Icon name={'person'} style={{color: '#E91E63'}} />
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
                  defaultValue={this.state.restaurantManagerPhone}
                  onChangeText={this.onChangeResManagerPhone.bind(this)}
                />
                <Icon name={'calculator'} style={{color: '#E91E63'}} />
              </Item>
            </CardItem>
          </Card>
        </View>
        <View style={{flex: 1, flexDirection: 'column-reverse'}}>
          <Button
            style={{
              backgroundColor: '#E91E63',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              justifyContent: 'center',
            }}
            onPress={this.fetchDataToUpdate.bind(this)}>
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

export default EditRestaurantsInformation;
