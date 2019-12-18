import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon, Card, CardItem, Button, Right} from 'native-base';
import AddNewFood from './Modal/AddNewFood';
import Swipeout from 'react-native-swipeout';

class ShowMenu extends Component {
  constructor() {
    super();
    this.state = {
      activeRowKey: null,
      data: null,
    };
  }
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
      return;
    }
  }
  componentDidMount() {
    console.log(this.props);
    const data = this.props;
    this.setState({
      data: data,
    });
  }
  render() {
    const {item} = this.props;
    const swipeRight = [
      {
        text: 'حذف',
        type: 'delete',
        onPress: this.fetchDataToRemove.bind(this, item),
      },
      {
        text: 'ویرایش',
        type: 'primary',
        onPress: async () => {
          await this.setState({
            name: this.props.item.name,
            description: this.props.item.description,
          });
          await this.props.parentFlatList.openedit(
            this.state.name,
            this.state.description,
            this.props.index,
          );
          await console.log(this.state.name, this.state.description);
        },
      },
    ];
    return (
      // <View
      //   style={{flex: 1, margin: 5, borderRadius: 10, flexDirection: 'column'}}>
      //   <Card style={{borderRadius: 10}}>
      //     <CardItem
      //       style={{
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         borderRadius: 10,
      //       }}>
      //       <Text
      //         style={{
      //           textAlign: 'center',
      //           fontFamily: 'IRANSansMobile_Bold',
      //         }}>
      //         {item.name}
      //       </Text>
      //     </CardItem>
      //     <CardItem style={{borderRadius: 10}}>
      //       <Text style={{fontFamily: 'IRANSansMobile_Light'}}>
      //         {item.description}
      //       </Text>
      //     </CardItem>
      //   </Card>
      //    <View
      //     style={{
      //       flex: 1,
      //       flexDirection: 'row',
      //       justifyContent: 'center',
      //       alignItems: 'center',
      //       marginLeft: 2,
      //       marginRight: 2,
      //     }}>
      //     <Button
      //       transparent
      //       style={{
      //         flex: 1,
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //       }}>
      //       <Text style={{fontFamily: 'IRANSansMobile'}}>ویرایش</Text>
      //       <Icon name={'create'} style={{color: 'green'}} />
      //     </Button>
      //     <Button
      //       transparent
      //       style={{
      //         flex: 1,
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //       }}
      //       onPress={this.fetchDataToRemove.bind(this, item)}>
      //       <Text style={{fontFamily: 'IRANSansMobile'}}>حذف</Text>
      //       <Icon name={'remove-circle'} style={{color: 'red'}} />
      //     </Button>
      //   </View>
      // </View>
      <Swipeout
        style={{
          marginRight: 10,
          marginLeft: 10,
          borderRadius: 10,
          marginBottom: 5,
          marginTop: 5,
        }}
        backgroundColor={'#607D8B'}
        onOpen={() => {
          this.setState({
            activeRowKey: item._id,
          });
        }}
        onClose={() => {
          if (this.state.activeRowKey != null) {
            this.setState({
              activeRowKey: null,
            });
          }
        }}
        autoClose={true}
        left={swipeRight}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            marginBottom: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'IRANSansMobile_Bold',
              color: 'white',
            }}>
            غذا : {item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row-reverse',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode={'stretch'}
              style={{flex: 0.5, width: 30, height: 60}}
              source={require('../../../assets/img/food3.jpg')}
            />
            <View style={{flex: 1, flexDirection: 'column', marginRight: 10}}>
              <Text
                style={{fontFamily: 'IRANSansMobile_Light', color: 'white'}}>
                توضیحات : {item.description}
              </Text>
              <Text
                style={{fontFamily: 'IRANSansMobile_Light', color: 'white'}}>
                قیمت : {item.price}
              </Text>
            </View>
          </View>
        </View>
      </Swipeout>
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
          extraData={this.state.data}
          keyExtractor={({item}) => item}
          numColumns={1}
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
