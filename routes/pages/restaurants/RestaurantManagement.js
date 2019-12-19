import React, {Component} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {Card, CardItem, Button} from 'native-base';

class RestaurantManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      name: '',
    };
  }
  async componentDidMount() {
    const data = await this.props.navigation.state.params.data.data;
    //console.log(data) restaurants info
    const restaurantname = await data.name;
    await this.setState({
      name: restaurantname,
      data: data,
    });
  }
  async fetchDataMenu() {
    const response = await fetch('http://10.0.2.2:3000/restaurants/menus', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'Post',
      body: JSON.stringify({
        data: this.state.data,
      }),
    });
    const responseJson = await response.json();
    //console.log(responseJson)
    const status = await responseJson.status;
    const Menudata = await responseJson.data;
    await console.log(Menudata);

    //console.log(status)
    if (status == 200) {
      this.props.navigation.navigate(
        'MenusRestaurantScreen',
        (data = {
          Menudata: Menudata,
          restaurantData: this.state.data,
        }),
      );
    }
    //console.log('test')
  }
  showMenu() {
    this.fetchDataMenu();
  }
  showInformation() {
    this.props.navigation.navigate(
      'RestaurantEditInformationScreen',
      (data = this.state.data),
    );
  }
  fetchDataDeliver() {
    this.props.navigation.navigate(
      'DeliverScreen',
      (data = this.state.data),
    );
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#EEEEEE', zIndex: 5}}>
        <MyHeader
          body={
            <Text
              style={{
                fontFamily: 'IRANSansMobile_Bold',
                fontSize: 18,
                color: 'white',
              }}>
              {this.state.name}
            </Text>
          }
        />

        <View
          style={{
            flex: 1,
            margin: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageBackground
            resizeMode={'stretch'}
            imageStyle={{borderRadius: 20}}
            style={{
              flex: 0.5,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 10,
              borderWidth: 1,
              borderRadius: 10,
            }}
            source={require('../../../assets/img/informationres.jpg')}>
            <Button
              style={{
                backgroundColor: 'black',
                opacity: 0.8,
                borderRadius: 10,
              }}
              onPress={this.showInformation.bind(this)}>
              <Text
                style={{
                  fontFamily: 'IRANSansMobile_Bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                ویرایش اطلاعات رستوران
              </Text>
            </Button>
          </ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            margin: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            resizeMode={'stretch'}
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              elevation: 10,
              borderWidth: 1,
              borderRadius: 10,
            }}
            source={require('../../../assets/img/menu2.jpg')}>
            <Button
              onPress={this.fetchDataMenu.bind(this)}
              style={{
                backgroundColor: 'black',
                borderRadius: 10,
                opacity: 0.8,
              }}>
              <Text
                style={{
                  fontFamily: 'IRANSansMobile_Bold',
                  textAlign: 'center',
                  color: 'white',
                  margin: 20,
                }}>
                ویرایش منو
              </Text>
            </Button>
          </ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            margin: 15,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <ImageBackground
            imageStyle={{borderRadius: 20}}
            resizeMode={'stretch'}
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              elevation: 10,
              borderWidth: 1,
              borderRadius: 10,
            }}
            source={require('../../../assets/img/deliver.png')}>
            <Button
              onPress={this.fetchDataDeliver.bind(this)}
              style={{
                backgroundColor: 'black',
                borderRadius: 10,
                opacity: 0.8,
              }}>
              <Text
                style={{
                  fontFamily: 'IRANSansMobile_Bold',
                  textAlign: 'center',
                  color: 'white',
                  margin: 20,
                }}>
                ثبت پیک
              </Text>
            </Button>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default RestaurantManagement;
