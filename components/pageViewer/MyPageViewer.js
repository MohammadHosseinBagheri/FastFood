import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
class MyPageViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1,marginTop:-70}}>
        <ViewPager style={styles.viewPager} initialPage={0}>
          <View style={{justifyContent:'center',alignItems:'center'}} key="1">
            <Image

              style={{width: 150, height: 150,borderRadius:100}}
              resizeMode={'stretch'}
              source={require('../../assets/img/food1.png')}
            />
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}} key="2">
            <Image
              style={{width: 150, height: 150,borderRadius:150}}
              resizeMode={'stretch'}
              source={require('../../assets/img/food2.jpg')}
            />
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}} key="3">
            <Image
              style={{width: 150, height: 150}}
              resizeMode={'stretch'}
              source={require('../../assets/img/food3.jpg')}
            />
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}} key="4">
            <Image
              style={{width: 150, height: 150}}
              resizeMode={'stretch'}
              source={require('../../assets/img/food4.png')}
            />
          </View>
        </ViewPager>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MyPageViewer;
