import React, {Component} from 'react';
import {View, Text} from 'react-native';
import MyHeader from '../../../components/Header/MyHeader';
import {Icon} from 'native-base';

class CategoriesFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      headerTitle: '',
    };
  }
  async componentDidMount() {
    console.log(this.props.navigation.state.params);
    const data = await this.props.navigation.state.params.responseJson;
    const name = await this.props.navigation.state.params.item.name;
    await this.setState({
      data: data,
      headerTitle: name,
    });
    console.log(this.state.data);
  }
  render() {
    return (
      <View>
        <MyHeader
          left={
            <Icon
              name={'arrow-back'}
              style={{color: 'white'}}
              onPress={() => this.props.navigation.pop()}
            />
          }
          body={<Text>{this.state.headerTitle}</Text>}
        />
      </View>
    );
  }
}

export default CategoriesFood;
