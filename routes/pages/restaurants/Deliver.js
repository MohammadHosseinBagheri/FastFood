import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon, Button, Card, CardItem} from 'native-base';

class Item extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async fetchDataToRemoveDeliver() {
    const data = await this.props.item;
    console.log(data);
    const response = await fetch('http://10.0.2.2:3000/users/driver/remove', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'Post',
      body: JSON.stringify({
        data: data,
      }),
    });
    const responseJson = await response.json();
    // console.log(responseJson);
    const status = await responseJson.status;
    if (status != 200) {
      alert('حذف راننده با مشکل روبه رو شد');
      return;
    }
    if (status == 200) {
      alert('راننده با موفقیت حذف شد');
      return;
    }
  }

  render() {
    const {item, data} = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'center', margin: 5}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Card
            style={{
              margin: 5,
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <CardItem>
              <Text style={{fontFamily: 'IRANSansMobile'}}>
                نام : {item.name} {item.lastName}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={{fontFamily: 'IRANSansMobile'}}>
                کد ملی : {item.nationalCode}
              </Text>
            </CardItem>
            <CardItem>
              <Text style={{fontFamily: 'IRANSansMobile'}}>
                پلاک ماشین : {item.pelak}
              </Text>
            </CardItem>
          </Card>
          <View style={{flexDirection: 'row-reverse'}}>
            <Icon
              name={'trash'}
              style={{color: 'red', marginLeft: 20}}
              onPress={this.fetchDataToRemoveDeliver.bind(this)}
            />
            <Icon name={'create'} style={{color: 'green'}} />
          </View>
        </View>
      </View>
    );
  }
}

class Deliver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: [],
      data: null,
      restaurantId: null,
    };
  }
  async componentDidMount() {
    const data = await this.props.navigation.state.params;
    await this.setState({
      data: data,
      restaurantId: data.id,
    });

    console.log(this.state.restaurantId);
    this.fetchDataToGetDirver();
  }

  async fetchDataToGetDirver() {
    const response = await fetch('http://10.0.2.2:3000/users/driver', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'Post',
      body: JSON.stringify({
        restaurantId: this.state.restaurantId,
      }),
    });
    const responseJson = await response.json();
    await this.setState({
      driver: responseJson.data,
    });
    console.log(this.state.driver);
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
                fontSize: 16,
                fontFamily: 'IRANSansMobile_Bold',
                color: 'white',
              }}>
              صفحه ثبت پیک
            </Text>
          }
          right={<Icon name={'restaurant'} style={{color: 'white'}} />}
        />
        <ScrollView style={{flex: 0.5}}>
          <FlatList
            data={this.state.driver}
            renderItem={({item}) => <Item parentFlatList={this} item={item} />}
          />
        </ScrollView>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Button
            style={{justifyContent: 'center', width: '50%', borderRadius: 10}}
            onPress={() => {
              this.props.navigation.navigate(
                'RegisterDeliverScreen',
                (data = this.state.restaurantId),
              );
            }}>
            <Text style={{fontFamily: 'IRANSansMobile_Light', color: 'white'}}>
              استخدام پیک
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Deliver;
