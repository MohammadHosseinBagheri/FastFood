import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modalbox';
class EditMenuModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        ref={'editMenu'}
        backdrop={true}
        position={'center'}
        style={{}}>
            <View>
                
            </View>
        </Modal>
    );
  }
}

export default EditMenuModal;
