import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon, Card, CardItem, Button, Right} from 'native-base';
import AddNewFood from './Modal/AddNewFood';
class ShowMenu extends Component {
  async fetchDataToRemove(item) {
    const response = await fetch(
      'http://10.0.2.2:3000/restaurants/menus/remove',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'Post',
        body: JSON.stringify({
          data: item,
        }),
      },
    );
    const responseJson = await response.json();
    console.log(responseJson);
    const status = await responseJson.status;
    if (status != 200) {
      alert('در حذف ایتم مورد نظر مشکل پیش اومد :(');
      return;
    } else {
      alert('آیتم مورد نظر با موفقیت حذف شد :)');
    }
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const {item} = this.props;
    return (
      <View
        style={{flex: 1, margin: 5, borderRadius: 10, flexDirection: 'column'}}>
        <Card style={{borderRadius: 10}}>
          <CardItem
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'IRANSansMobile_Bold',
              }}>
              {item.name}
            </Text>
          </CardItem>
          <CardItem style={{borderRadius: 10}}>
            <Text style={{fontFamily: 'IRANSansMobile_Light'}}>
              {item.description}
            </Text>
          </CardItem>
        </Card>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 2,
            marginRight: 2,
          }}>
          <Button
            transparent
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: 'IRANSansMobile'}}>ویرایش</Text>
            <Icon name={'create'} style={{color: 'green'}} />
          </Button>
          <Button
            transparent
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.fetchDataToRemove.bind(this, item)}>
            <Text style={{fontFamily: 'IRANSansMobile'}}>حذف</Text>
            <Icon name={'remove-circle'} style={{color: 'red'}} />
          </Button>
        </View>
      </View>
    );
  }
}

class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      restaurantData: '',
    };
  }
  addNewFood() {}
  async componentDidMount() {
    //console.log(this.props);
    const dataServer = await this.props.navigation.state.params.Menudata;
    const restaurantData = await this.props.navigation.state.params
      .restaurantData;
    //await console.log(dataServer)
    await this.setState({
      data: dataServer,
      restaurantData: restaurantData,
    });
    // console.log(this.state.data);
    // console.log(this.props);
    console.log(this.state.restaurantData);
  }
  openNewFood() {
    this.refs.addNewFood.open();
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
              صفحه ویرایش منو
            </Text>
          }
          right={<Icon name={'restaurant'} style={{color: 'white'}} />}
        />
        <View
          style={{
            marginLeft: 20,
            marginTop: 10,
            backgroundColor: '#E91E63',
            width: 25,
            height: 25,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={'add'}
            style={{color: 'white'}}
            onPress={this.openNewFood.bind(this)}
          />
        </View>
        <FlatList
          data={this.state.data}
          extraData={data}
          numColumns={2}
          renderItem={({item}) => <ShowMenu item={item} />}
        />
        <AddNewFood
          ref={'addNewFood'}
          restaurantData={this.state.restaurantData}
        />
      </View>
    );
  }
}

export default Menus;
