import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';
import Modal from 'react-native-modalbox';
import {Button, Item, Input, Icon, Picker} from 'native-base';
class AddNewFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerValue: 0,
      name: '',
      price: '',
      description: '',
      restaurantId: '',
      tag: '',
    };
  }
  async open() {
    this.refs.addNewFood.open();
    //console.log(this.props);
    await this.setState({
      restaurantId: this.props.restaurantData,
    });
    //await console.log(this.state.restaurantId);
  }
  onNameChange(text) {
    this.setState({
      name: text,
    });
  }
  onPriceChange(text) {
    this.setState({
      price: Number(text),
    });
  }
  onChangeDescription(text) {
    this.setState({
      description: text,
    });
  }

  async setPickerTag(itemValue, itemIndex) {
    await this.setState({
      pickerValue: itemValue,
    });
    await (itemValue == 0
      ? this.setState({tag: 'برگر'})
      : itemValue == 1
      ? this.setState({tag: 'پیتزا'})
      : itemValue == 2
      ? this.setState({tag: 'کباب'})
      : itemValue == 3
      ? this.setState({tag: 'سنتی'})
      : itemValue == 4
      ? this.setState({tag: 'سالاد'})
      : itemValue == 5
      ? this.setState({tag: 'نوشیدنی'})
      : this.setState({tag: 'برگر'}));
  }
  async fecthDataAddMenu() {
    const response = await fetch(
      'http://10.0.2.2:3000/restaurants/menus/addfood',
      {
        headers: {
          'COntent-Type': 'application/json',
        },
        method: 'Post',
        body: JSON.stringify({
          tag: this.state.tag,
          name: this.state.name,
          price: this.state.price,
          description: this.state.description,
          restaurantId: this.state.restaurantId,
        }),
      },
    );
    const responseJson = await response.json();
    console.log(responseJson);

    this.refs.addNewFood.close();
  }
  render() {
    return (
      <Modal
        ref={'addNewFood'}
        position={'center'}
        backdrop={true}
        style={{
          height: '40%',
          width: '70%',
          borderRadius: 20,
          borderColor: '#E91E63',
          borderWidth: 1.5,
          elevation: 2,
        }}>
        <View style={{flex: 1}}>
          <View style={{marginTop: 5}}>
            <Item>
              <Input
                style={{fontFamily: 'IRANSansMobile'}}
                placeholderTextColor={'#E91E63'}
                placeholder={'نام غذا'}
                onChangeText={this.onNameChange.bind(this)}
              />
              {/* <Icon name={'name'} /> */}
            </Item>
          </View>
          <View>
            <Item>
              <Input
                style={{fontFamily: 'IRANSansMobile'}}
                placeholderTextColor={'#E91E63'}
                placeholder={' قیمت'}
                onChangeText={this.onPriceChange.bind(this)}
              />
              {/* <Icon name={'name'} /> */}
            </Item>
          </View>
          <View>
            <Item>
              <Input
                style={{fontFamily: 'IRANSansMobile'}}
                placeholderTextColor={'#E91E63'}
                placeholder={'توضیحات '}
                onChangeText={this.onChangeDescription.bind(this)}
              />
              {/* <Icon name={'name'} /> */}
            </Item>
          </View>
          <View>
            <Picker
              selectedValue={this.state.pickerValue}
              onValueChange={this.setPickerTag.bind(this)}
              style={{
                fontFamily: 'IRANSansMobile',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Picker.Item color={'#E91E63'} label={'برگر'} value={0} />
              <Picker.Item color={'#E91E63'} label={'پیتزا'} value={1} />
              <Picker.Item color={'#E91E63'} label={'کباب'} value={2} />
              <Picker.Item color={'#E91E63'} label={'سنتی'} value={3} />
              <Picker.Item color={'#E91E63'} label={'سالاد'} value={4} />
              <Picker.Item color={'#E91E63'} label={'نوشیدنی'} value={5} />
            </Picker>
          </View>
          <View style={{flex: 1, flexDirection: 'column-reverse', margin: 10}}>
            <Button
              style={{
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderWidth: 1,
                elevation: 2,
              }}
              onPress={this.fecthDataAddMenu.bind(this)}>
              <Text style={{fontFamily: 'IRANSansMobile', color: '#E91E63'}}>
                اضافه کردن غذا
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

export default AddNewFood;
