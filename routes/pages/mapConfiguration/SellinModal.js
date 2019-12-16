import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modalbox';
import {Button} from 'native-base';
class SellinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  open() {
    this.refs.SellingModal.open();
    //console.log(this.props);
    const {data} = this.props;
    this.setState({
      data: data,
    });
    console.log(this.state.data);
  }
  render() {
    return (
      <Modal
        backdrop={true}
        ref={'SellingModal'}
        position="bottom"
        style={{
          width: '100%',
          height: '30%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Button transparent style={{margin: 20, justifyContent: 'center',borderColor:'black',borderWidth:2,borderRadius:10}}>
            <Text style={{fontFamily: 'IRANSansMobile_Bold'}}>
              قیمت با احتساب هزینه پیک : {<Text style={{color:'red'}}>{this.state.data}</Text>} تومان
            </Text>
          </Button>
        </View>
        <View style={{flex: 1, flexDirection: 'column-reverse'}}>
          <Button full style={{backgroundColor:'#E91E63'}}>
            <Text style={{fontFamily:'IRANSansMobile_Bold',color:'white'}}>سفارش</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}

export default SellinModal;
