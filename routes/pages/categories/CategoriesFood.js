import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon, Card, CardItem, Item, Button} from 'native-base';

class CategoriItem extends Component {
  constructor() {
    super();
  }
  render() {
    const {item} = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Card
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            flex: 1,
            elevation:10,
            padding: 20,
          }}>
          <CardItem header>
            <Text>{item.name}</Text>
          </CardItem>
          <CardItem cardBody>
            <Text>اطلاعات : {item.description}</Text>
          </CardItem>
          <CardItem>
            <Text>قیمت : {item.price}</Text>
          </CardItem>
        </Card>
        <Button
          style={{
            marginTop: 0,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FF7043',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            elevation:5
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>خرید</Text>
        </Button>
      </View>
    );
  }
}

class CategoriesFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headerTitle: '',
    };
  }
  async componentDidMount() {
    //console.log(this.props.navigation.state.params);
    const data = await this.props.navigation.state.params.responseJson.data;
    const name = await this.props.navigation.state.params.item.name;
    await this.setState({
      data: data,
      headerTitle: name,
    });
    console.log(this.state.data);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#EEEEEE'}}>
        <MyHeader
          left={
            <Icon
              name={'arrow-back'}
              style={{color: 'white'}}
              onPress={() => this.props.navigation.pop()}
            />
          }
          body={
            <Text style={{fontFamily: 'IRANSansMobile_Bold', color: 'white'}}>
              {this.state.headerTitle}
            </Text>
          }
        />
        <FlatList
          data={this.state.data}
          numColumns={2}
          renderItem={({item, index}) => {
            return <CategoriItem item={item} />;
          }}
        />
      </View>
    );
  }
}

export default CategoriesFood;
