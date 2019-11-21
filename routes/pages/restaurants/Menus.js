import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon, Card, CardItem, Button, Right} from 'native-base';
import AddNewFood from './Modal/AddNewFood';
class ShowMenu extends Component {
  render() {
    const {item} = this.props;
    return (
      <View style={{flex: 1, margin: 5, borderRadius: 10}}>
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
          <Button
            full
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              borderColor: '#E91E63',
              borderWidth: 1,
            }}>
            <Text style={{fontFamily: 'IRANSansMobile'}}>ویرایش</Text>
          </Button>
        </Card>
      </View>
    );
  }
}

class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      restaurantData:""
    };
  }
  addNewFood() {}
  async componentDidMount() {
    //console.log(this.props);
    const dataServer = await this.props.navigation.state.params.Menudata;
    const restaurantData = await this.props.navigation.state.params.restaurantData;
   //await console.log(dataServer)
    await this.setState({
      data: dataServer,
      restaurantData:restaurantData
    });
    // console.log(this.state.data);
    // console.log(this.props);
    console.log(this.state.restaurantData)
  }
  openNewFood() {
    this.refs.addNewFood.open();
  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#EEEEEE'}}>
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
          numColumns={2}
          renderItem={({item}) => <ShowMenu item={item} />}
        />
        <AddNewFood ref={'addNewFood'} restaurantData={this.state.restaurantData} />
      </View>
    );
  }
}

export default Menus;
