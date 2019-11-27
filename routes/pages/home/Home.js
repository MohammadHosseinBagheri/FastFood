import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon, Card, CardItem, Content, Button, Left, Right} from 'native-base';
import MyModal from '../../../components/Modal/MyModal';
import StarRating from 'react-native-star-rating';
import CatItem from '../categories/categories';

class Basicitem extends Component {
  render() {
    const {item, navigation} = this.props;
    return (
      <View style={{margin: 5}}>
        <View style={{borderRadius: 10}}>
          <Card
            style={{
              width: 200,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <CardItem style={{elevation: 10, borderRadius: 20, height: '100%'}}>
              <Content>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    style={{width: 100, height: 100}}
                    resizeMode={'stretch'}
                    source={require('../../../assets/img/food4.png')}
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontFamily: 'IRANSansMobile_Bold',
                    }}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        marginRight: 5,
                        backgroundColor: 'green',
                        width: 20,
                        height: 20,
                        textAlign: 'center',
                        borderRadius: 5,
                      }}></Text>
                    <StarRating
                      fullStarColor={'gray'}
                      starSize={15}
                      rating={3.5}
                      disabled={true}
                    />
                  </View>
                  <CardItem>
                    <View>
                      <Text style={{fontFamily: 'IRANSansMobile_Light'}}>
                        {item.city}
                      </Text>
                      <Text style={{fontFamily: 'IRANSansMobile'}}>
                        {item.address}
                      </Text>
                    </View>
                  </CardItem>
                  <Button
                    style={{
                      padding: 10,
                      borderColor: '#E91E63',
                      borderWidth: 3,
                    }}
                    bordered
                    onPress={() =>
                      this.props.navigation.navigate('RestaurantsScreen', {
                        item: item,
                      })
                    }>
                    <Text
                      style={{
                        fontFamily: 'IRANSansMobile_Bold',
                        color: '#E91E63',
                      }}>
                      نمایش منو
                    </Text>
                  </Button>
                </View>
              </Content>
            </CardItem>
          </Card>
        </View>
      </View>
    );
  }
}
class Places extends Component {
  render() {
    const {item, navigation} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          //console.log(this.props);
        }}
        activeOpacity={0.8}>
        <View
          style={{margin: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            resizeMode={'stretch'}
            style={{width: 100, height: 100}}
            source={require('../../../assets/img/food1.png')}
          />
          <Text style={{fontFamily: 'IRANSansMobile', textAlign: 'center'}}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
class Categories extends Component {
  constructor(props) {
    super(props);
  }
  async clickItem(item) {
    console.log(item);
    const response = await fetch(
      'http://10.0.2.2:3000/restaurants/menus/categories',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'Post',
        body: JSON.stringify({
          name: item.name,
        }),
      },
    );
    const responseJsaon = await response.json();
    await console.log(responseJsaon);
    const status = await responseJsaon.status;
    await console.log(status);
    if (status == 200) {
      this.props.navigation.navigate('CategoriesFoodScreen');
    }
  }
  render() {
    const {item, navigation} = this.props;
    return (
      <TouchableOpacity
        onPress={this.clickItem.bind(this, item)}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ImageBackground
            resizeMode={'stretch'}
            imageStyle={{borderRadius:20}}
            style={{width: 100, height: 100, borderRadius: 20, margin: 10,alignItems:'center',elevation:20}}
            source={item.img}>
            <Text style={{fontFamily: 'IRANSansMobile',color:'white',backgroundColor:'black',margin:5,padding:5,marginTop:-20,borderRadius:20,opacity:0.8}}>{item.name}</Text>
          </ImageBackground>
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
      categories: [],
    };
  }
  async componentDidMount() {
    await this.getDataFromRestaurantApi();
    await this.getDataFromPlacesApi();
    await this.getDataFromCategoriesApi();
    //console.log(this.props.navigation);
  }
  openMenu() {
    this.refs.myModal.modalOpen();
  }
  async getDataFromCategoriesApi() {
    // const response = await fetch('http://10.0.2.2:3000/api/categories');
    // const responseJsaon = await response.json();
    // await this.setState({
    //   categories: responseJsaon,
    // });
    await this.setState({
      categories: CatItem,
    });
  }
  async getDataFromPlacesApi() {
    const response = await fetch('http://10.0.2.2:3000/api/places');
    const responseJsaon = await response.json();
    //console.log(responseJsaon);
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
    //console.log(this.state.restaurants);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
        <MyHeader
          right={
            <Icon
              name={'menu'}
              style={{color: 'white'}}
              onPress={this.openMenu.bind(this)}
            />
          }
          body={
            <Text style={{fontFamily: 'IRANSansMobile_Bold', color: 'white'}}>
              فست فود !
            </Text>
          }
          left={<Icon name={'mail'} style={{color: 'white'}} />}
        />
        {/* <View style={{flex: 0.4}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.places}
            keyExtractor={index => index.toString()}
            renderItem={({item, index}) => {
              return <Places navigation={this.props.navigation} item={item} />;
            }}
          />
        </View> */}
        <View style={{flex: 0.8}}>
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
            extraData={this.state.restaurants}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.restaurants}
            keyExtractor={index => index.toString()}
            renderItem={({item}) => {
              return (
                <Basicitem navigation={this.props.navigation} item={item} />
              );
            }}
          />
        </View>
        <View style={{flex: 0.4, marginTop: 10}}>
          <Text style={{fontFamily: 'IRANSansMobile_Light', fontSize: 16}}>
            دسته بندی ها
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.categories}
            renderItem={({item, index}) => {
              return (
                <Categories item={item} navigation={this.props.navigation} />
              );
            }}
          />
        </View>
        <MyModal ref={'myModal'} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Home;
