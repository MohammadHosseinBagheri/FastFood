import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import Modal from 'react-native-modalbox';
import {Button, Right, Icon, Item} from 'native-base';
// import {Button} from 'native-base';
class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  modalOpen() {
    this.refs.myModal.open();
    console.log(this.props)
  }
  componentDidMount(){
    console.log(this.props)
  }
  render() {
    return (
      <Modal
        style={{
          height: '90%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        ref={'myModal'}
        position={'bottom'}
        backdrop={true}>
        <View
          style={{flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30}}>
          <View
            style={{
              flex: 0.2,
              backgroundColor: '#E91E63',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}>
            <View></View>
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'IRANSansMobile_Bold',
                  color: 'white',
                }}>
                فست
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: 'IRANSansMobile_Bold',
                  color: 'white',
                }}>
                فود!
              </Text>
            </View>
            <Icon
              name="arrow-dropdown"
              style={{color: 'white', marginRight: 10}}
              onPress={() => {
                this.refs.myModal.close();
              }}
            />
          </View>
          <View style={{flex: 0.6, backgroundColor: 'white'}}>
            <Item
            onPress={()=>{this.props.navigation.navigate('LoginScreen')}}
              style={{
                flexDirection: 'row-reverse',
                borderBottomWidth: 0,
                marginTop: 20,
              }}>
              <Icon style={{color: '#E91E63'}} name={'person'} />
              <Text
                style={{marginRight: 10, fontFamily: 'IRANSansMobile_Light'}}>
                ورود یا عضویت
              </Text>
            </Item>
            <Item
              style={{
                flexDirection: 'row-reverse',
                borderBottomWidth: 0,
                marginTop: 20,
              }}>
              <Icon style={{color: '#E91E63'}} name={'mail'} />
              <Text
                style={{marginRight: 10, fontFamily: 'IRANSansMobile_Light'}}>
                {' '}
                پیام ها{' '}
              </Text>
            </Item>
            <Item
              style={{
                flexDirection: 'row-reverse',
                borderBottomWidth: 0,
                marginTop: 20,
              }}>
              <Icon style={{color: '#E91E63'}} name={'cube'} />
              <Text
                style={{marginRight: 10, fontFamily: 'IRANSansMobile_Light'}}>
                {' '}
                بسته های خدماتی{' '}
              </Text>
            </Item>
            <Item
              style={{
                flexDirection: 'row-reverse',
                borderBottomWidth: 0,
                marginTop: 20,
              }} onPress={()=>{this.props.navigation.navigate('RestaurantsRegisterScreen')}} >
              <Icon style={{color: '#E91E63'}} name={'pizza'} />
              <Text
                style={{marginRight: 10, fontFamily: 'IRANSansMobile_Light'}}>
                معرفی رستوران
              </Text>
            </Item>
            <Item
              style={{
                flexDirection: 'row-reverse',
                borderBottomWidth: 0,
                marginTop: 20,
              }}>
              <Icon style={{color: '#E91E63'}} name={'chatboxes'} />
              <Text
                style={{marginRight: 10, fontFamily: 'IRANSansMobile_Light'}}>
                {' '}
                چت با پشتیبانی{' '}
              </Text>
            </Item>
            <Item
              style={{
                flexDirection: 'row-reverse',
                borderBottomWidth: 0,
                marginTop: 20,
              }}>
              <Icon style={{color: '#E91E63'}} name={'people'} />
              <Text
                style={{marginRight: 10, fontFamily: 'IRANSansMobile_Light'}}>
                {' '}
                معرفی به دوستان{' '}
              </Text>
            </Item>
            
          </View>
        </View>
      </Modal>
    );
  }
}

export default MyModal;
