import React, {Component} from 'react';
import {View, Text} from 'react-native';
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
    this.props.navigation.navigate('RestaurantEditInformationScreen',data=this.state.data)
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#EEEEEE',zIndex:5}}>
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
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              margin: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Card style={{borderRadius: 10}}>
              <CardItem style={{borderRadius: 10}}>
                <Button transparent onPress={this.showInformation.bind(this)} >
                  <Text
                    style={{
                      fontFamily: 'IRANSansMobile_Bold',
                      textAlign: 'center',
                      color: '#E91E63',
                    }}>
                    ویرایش اطلاعات رستوران
                  </Text>
                </Button>
              </CardItem>
            </Card>
          </View>
          <View
            style={{
              flex: 1,
              margin: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Card style={{borderRadius: 10,zIndex:5}}>
              <CardItem style={{borderRadius: 10}}>
                <Button transparent onPress={this.fetchDataMenu.bind(this)}>
                  <Text
                    style={{
                      fontFamily: 'IRANSansMobile_Bold',
                      textAlign: 'center',
                      color: '#E91E63',
                    }}>
                    ویرایش منو
                  </Text>
                </Button>
              </CardItem>
            </Card>
          </View>
        </View>
      </View>
    );
  }
}

export default RestaurantManagement;
