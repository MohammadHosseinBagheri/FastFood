import React, {Component} from 'react';
import {View, Text, StatusBar} from 'react-native';
import items from './Items';
import {FlatList} from 'react-native-gesture-handler';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon} from 'native-base';
import MyModal from '../../../components/Modal/MyModal';

class Basicitem extends Component {
  render() {
    const {item} = this.props;
    return (
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text>{item.txt}</Text>
        <Text>{item.body}</Text>
      </View>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(items[0].txt);
  }
  openMenu() {
    this.refs.myModal.modalOpen();
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#E0E0E0'}}>
        <MyHeader
          right={
            <Icon
              name={'menu'}
              style={{color: 'white'}}
              onPress={this.openMenu.bind(this)}
            />
          }
          left={<Icon name={'mail'} style={{color: 'white'}} />}
        />
        <View style={{flex:0.4}}>
          <Text>برترین ها</Text>
          <FlatList
            horizontal={true}
            data={items}
            keyExtractor={index => index}
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
