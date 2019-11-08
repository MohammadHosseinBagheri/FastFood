import React, {Component} from 'react';
import {View, Text, view, ImageBackground} from 'react-native';
import {Icon} from 'native-base';
import StarRating from 'react-native-star-rating';
class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 0.3}}>
          <ImageBackground
            resizeMode={'stretch'}
            style={{width: '100%', height: '100%'}}
            source={require('../../../assets/img/res1.jpg')}>
            <View
              style={{
                flexDirection: 'column',
                marginRight: '18%',
                marginTop: '20%',
              }}>
              <View style={{flexDirection:'row-reverse',justifyContent:'space-around'}}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'IRANSansMobile_Bold',
                  fontSize: 20,
                }}>
                {this.props.navigation.state.params.item.name}
              </Text>
              <Text style={{color:'red',backgroundColor:'white',borderRadius:10,width:20,height:20,textAlign:'center',fontSize:16}}  >
              i
              </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  margin: 10,
                  alignItems: 'center',
                }}>
                <Icon name={'bicycle'} style={{color: 'white'}} />
                <Text
                  style={{
                    color: 'white',
                    margin: 5,
                    fontFamily: 'IRANSansMobile',
                    fontSize: 12,
                  }}>
                  هزینه پیک
                </Text>
              </View>
              <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row-reverse'}}>
                <StarRating
                fullStarColor={'white'}
                  starSize={15}
                  disabled={false}
                  maxStars={5}
                  rating={this.state.starCount}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                />
              <Text style={{backgroundColor:'#AFB42B',marginRight:10,width:25,textAlign:'center',borderRadius:5}} >
                  {this.state.starCount}
              </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default Restaurants;
