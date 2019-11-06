import React, {Component} from 'react';
import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import items from './Items';
import {FlatList} from 'react-native-gesture-handler';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon, Card, CardItem, Content, Button, Left, Right} from 'native-base';
import MyModal from '../../../components/Modal/MyModal';

class Basicitem extends Component {
  render() {
    const {item} = this.props;
    return (
      <View style={{margin: 5}}>
        <TouchableOpacity onPress={() => console.log('ok')} activeOpacity={0.9}>
          <View>
            <Card
              style={{
                width: 200,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CardItem style={{elevation: 10}}>
                <Content>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{textAlign: 'center',fontFamily:'IRANSansMobile'}}>{item.name}</Text>
                    <Image
                      style={{width: 100, height: 100}}
                      resizeMode={'stretch'}
                      source={require('../../../assets/img/food4.png')}
                    />
                    <Text numberOfLines={2}>{item.description}</Text>
                  </View>
                </Content>
              </CardItem>
            </Card>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
class Places extends Component {
  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity onPress={()=>{}} activeOpacity={0.8}>
        <View
          style={{margin: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            resizeMode={'stretch'}
            style={{width: 100, height: 150}}
            source={require('../../../assets/img/food1.png')}
          />
          <Text style={{fontFamily:'IRANSansMobile'}} >{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      places: [],
    };
  }
  componentDidMount() {
    this.getDataFromRestaurantApi();
    this.getDataFromPlacesApi();
  }
  openMenu() {
    this.refs.myModal.modalOpen();
  }
  async getDataFromPlacesApi() {
    const response = await fetch('http://10.0.2.2:3000/api/places');
    const responseJsaon = await response.json();
    console.log(responseJsaon);
    await this.setState({
      places: responseJsaon,
    });
  }
  async getDataFromRestaurantApi() {
    const response = await fetch('http://10.0.2.2:3000/api/restaurants');
    const responseJsaon = await response.json();
    console.log(responseJsaon);
    await this.setState({
      restaurants: responseJsaon,
    });
    console.log(this.state.restaurants);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#E0E0E0'}}>
        <MyHeader
          right={
            <Icon
              name={'menu'}
              style={{color: 'white'}}
              onPress={this.openMenu.bind(this)}
            />
          }
          body={<Text style={{fontFamily:'IRANSansMobile_Bold',color:'white'}} >فست فود !</Text>}
          left={<Icon name={'mail'} style={{color: 'white'}} />}
        />
        <View style={{flex: 0.5}}>
          <FlatList
            horizontal={true}
            data={this.state.places}
            renderItem={({item, index}) => {
              return <Places item={item} />;
            }}
          />
        </View>
        <View style={{flex: 0.6}}>
          <View
            style={{
              margin: 5,
              marginBottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={'arrow-dropleft'} style={{color: 'green'}} />
              <Button transparent style={{marginLeft: 2}}>
                <Text
                  style={{
                    color: 'green',
                    fontFamily: 'IRANSansMobile_Light',
                    fontSize: 14,
                  }}>
                  بیشتر
                </Text>
              </Button>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'IRANSansMobile_Light',
              }}>
              برترین ها
            </Text>
          </View>
          <FlatList
            horizontal={true}
            data={this.state.restaurants}
            keyExtractor={index => index.toString()}
            renderItem={({item}) => {
              return <Basicitem item={item} />;
            }}
          />
        </View>
        <View style={{flex: 0.5}}>
          <Text>دسته بندی ها</Text>
        </View>
        <MyModal ref={'myModal'} />
      </View>
    );
  }
}

export default Home;
