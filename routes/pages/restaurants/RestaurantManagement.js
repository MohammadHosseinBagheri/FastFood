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
  async fetchDataMenu(){
    const response=await fetch('http://10.0.2.2:3000/restaurants/menus',{
      headers:{
        'Content-Type':'application/json'
      },
      method:'Post',
      body:JSON.stringify({
        data:this.state.data
      })
    });
    const responseJson=await response.json();
    //console.log(responseJson)
    const status=await responseJson.status;
    const Menudata=await responseJson.data;
    await console.log(Menudata)

    //console.log(status)
    if(status==200){
      this.props.navigation.navigate('MenusRestaurantScreen',data={
        Menudata:Menudata,
        restaurantData:this.state.data
      })
    }
    //console.log('test')
  }
  showMenu(){
    this.fetchDataMenu();

  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#EEEEEE'}}>
        <MyHeader body={<Text style={{fontFamily:'IRANSansMobile_Bold',fontSize:18,color:'white'}}>{this.state.name}</Text>} />
        <View
          style={{
            flex: 0.5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{margin: 15}}>
            <Card style={{borderRadius: 10}}>
              <CardItem style={{borderRadius: 10}}>
                <Button transparent>
                  <Text style={{fontFamily: 'IRANSansMobile_Bold'}}>
                    ویرایش اطلاعات رستوران
                  </Text>
                </Button>
              </CardItem>
            </Card>
          </View>
          <View style={{margin: 15}}>
            <Card style={{borderRadius: 10}}>
              <CardItem style={{borderRadius: 10}}>
                <Button transparent onPress={this.fetchDataMenu.bind(this)} >
                  <Text style={{fontFamily: 'IRANSansMobile_Bold'}}>
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
