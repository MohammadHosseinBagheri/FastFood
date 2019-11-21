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
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#EEEEEE'}}>
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
        <View style={{flex:1,margin:10,borderRadius:10}} >
          <Card style={{borderRadius:10}}>
            <CardItem style={{borderRadius:10}}>
              <Item>
                <Input
                  style={{
                    textAlign: 'center',
                    fontFamily: 'IRANSansMobile_Medium',
                    fontSize: 13,
                  }}
                  placeholder={'نام رستوران'}
                  defaultValue={this.state.restaurantName}
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
                />
                <Icon name={'calculator'} style={{color: '#E91E63'}} />
              </Item>
            </CardItem>
          </Card>
        </View>
        <View style={{flex:1,flexDirection: 'column-reverse'}}>
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

export default EditRestaurantsInformation;
