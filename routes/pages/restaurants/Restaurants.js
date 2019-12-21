import React, {Component} from 'react';
import {
  View,
  Text,
  view,
  ImageBackground,
  FlatList,
  Image,
  AsyncStorage,
} from 'react-native';
import {Icon, Button} from 'native-base';
import StarRating from 'react-native-star-rating';
class Menus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  async onLogin() {
    const data = {
      dataItem: this.props,
      count: this.state.count,
    };
    if (this.state.count == 0) {
      alert('سبد خرید خالی است');
      return;
    } else {
      await AsyncStorage.getItem('user', (error, Mydata) => {
        const dataJson = JSON.parse(Mydata);
        console.log(dataJson);
        if (dataJson) {
          this.props.navigation.navigate('SellingMapScreen', data);
        } else {
          alert('ابتدا وارد حساب کابری شوید');
        }
      });
    }
  }
  render() {
    const {item} = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ECEFF1',
        }}>
        <Button
          style={{
            margin: 10,
            width: 30,
            height: 30,
            justifyContent: 'center',
            backgroundColor: '#FF7043',
          }}
          onPress={this.onLogin.bind(this)}>
          <Text
            style={{
              fontFamily: 'IRANSansMobile_Bold',
              fontSize: 12,
              color: 'white',
            }}>
            خرید
          </Text>
        </Button>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="add-circle"
            style={{color: 'green'}}
            onPress={() => {
              this.setState({
                count: this.state.count + 1,
              });
            }}
          />
          <Text style={{marginLeft: 3, marginRight: 3, fontSize: 16}}>
            {this.state.count}
          </Text>
          <Icon
            name="remove-circle-outline"
            style={{color: 'red'}}
            onPress={() => {
              if (this.state.count != 0) {
                this.setState({
                  count: this.state.count - 1,
                });
              }
            }}
          />
        </View>
        <View style={{flex: 1, flexDirection: 'column', marginLeft: 20}}>
          <Text style={{fontFamily: 'IRANSansMobile_Bold', fontSize: 16}}>
            {item.name}
          </Text>
          <Text style={{fontFamily: 'IRANSansMobile'}}>
            قیمت {item.price} تومان
          </Text>
          <Text style={{fontFamily: 'IRANSansMobile_Medium'}}>
            {item.about}
          </Text>
          <View
            style={{
              width: 150,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <StarRating
              fullStarColor={'gray'}
              starSize={15}
              disabled={false}
              maxStars={5}
              rating={3}
            />
            <Text
              style={{
                backgroundColor: '#AFB42B',
                marginLeft: 10,
                width: 20,
                borderRadius: 4,
                textAlign: 'center',
              }}>
              3
            </Text>
          </View>
        </View>

        <Image
          style={{width: 100, height: 100}}
          resizeMode={'stretch'}
          source={require('../../../assets/img/food4.png')}
        />
      </View>
    );
  }
}
class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      menus: [],
      data: '',
      foods: [],
      user: false,
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  async componentDidMount() {
    //console.log(this.props);

    const data = await this.props.navigation.state.params.item;
    await this.setState({
      data: data,
    });
    await console.log(this.state.data);
    await this.fetchDataFromMenu();
  }
  colorRank() {
    if (this.state.starCount <= 2) {
      return '#d50000';
    }
    if (this.state.starCount > 2 && this.state.starCount <= 4) {
      return '#AFB42B';
    }
    if (this.state.starCount >= 4) {
      return '#4CAF50';
    }
  }
  async fetchDataFromMenu() {
    const response = await fetch('http://10.0.2.2:3000/restaurants/menus', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'Post',
      body: JSON.stringify({data: this.state.data}),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    const food = await responseJson.data;
    await this.setState({
      foods: food,
    });
    //await console.log(this.state.foods);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.3}}>
          <ImageBackground
            resizeMode={'stretch'}
            style={{width: '100%', height: '100%'}}
            source={require('../../../assets/img/res1.jpg')}>
            <View
              style={{
                flexDirection: 'column',
                marginRight: '18%',
                marginTop: '20%',
              }}>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'IRANSansMobile_Bold',
                    fontSize: 20,
                  }}>
                  {this.props.navigation.state.params.item.name}
                </Text>
                <Text
                  style={{
                    color: 'red',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    textAlign: 'center',
                    fontSize: 16,
                  }}>
                  i
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  margin: 10,
                  alignItems: 'center',
                }}>
                <Icon name={'bicycle'} style={{color: 'white'}} />
                <Text
                  style={{
                    color: 'white',
                    margin: 5,
                    fontFamily: 'IRANSansMobile',
                    fontSize: 12,
                  }}>
                  هزینه پیک
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row-reverse',
                }}>
                <StarRating
                  fullStarColor={'white'}
                  starSize={15}
                  disabled={false}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                />
                <Text
                  style={{
                    backgroundColor: this.colorRank(),
                    marginRight: 10,
                    width: 25,
                    textAlign: 'center',
                    borderRadius: 5,
                  }}>
                  {this.state.starCount}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{flex: 0.7}}>
          <FlatList
            data={this.state.foods}
            renderItem={({item}) => {
              return <Menus item={item} navigation={this.props.navigation} />;
            }}
          />
        </View>
      </View>
    );
  }
}

export default Restaurants;
