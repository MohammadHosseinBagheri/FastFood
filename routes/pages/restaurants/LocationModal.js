import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Modal from 'react-native-modalbox';
import MapView, {Marker} from 'react-native-maps';
import {Button} from 'native-base';
class LocationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 2000,
      longitude: 2000,
      markers: [],
      mabda: 0,
      id: 0,
    };
  }
  async componentDidMount() {
    //console.log(this.props)
    const response = await this.props.navigation.state.params;
    const myId = await response.myId;
    //await console.log(myId)
    await this.setState({
      id: myId,
    });
    //await console.log(this.state.id)
    await Geolocation.getCurrentPosition(
      position => {
        //console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        //  console.log(this.state.longitude, this.state.latitude);
      },
      error => {
        // See error code charts below.
        // console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 20000},
    );
  }
  async onMapPress(e) {
    if (this.state.markers.length < 1) {
      //console.log(e.nativeEvent.coordinate);
      await this.setState({
        markers: [
          {
            coordinate: e.nativeEvent.coordinate,
            key: this.state.markers.length,
          },
        ],
        mabda: e.nativeEvent.coordinate,
      });
      // await console.log(this.state.markers);
    }
  }
  async sendDatatServer() {
    const response = await fetch(
      'http://10.0.2.2:3000/restaurants/register/location',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'Post',
        body: JSON.stringify({
          location: this.state.mabda,
          id: this.state.id,
        }),
      },
    );
    const responseJson = await response.json();
    console.log(responseJson);
    const status = await responseJson.status;
    console.log(status);
    const data = await responseJson.data;
    console.log(data)
    if (await status != 200) {
      alert('لوکیشن را درست انتخاب کنید');
      return;
    } else {
      await this.props.navigation.replace('RestaurantsManagementScreen',{data:{data}});
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            customMapStyle={customStyle}
            style={styles.map}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            onPress={this.onMapPress.bind(this)}>
            <Marker
              icon={require('../../../assets/img/mabda.png')}
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              title={'رستوران'}
            />
            {this.state.markers.map(marker => (
              <Marker
                coordinate={marker.coordinate}
                icon={require('../../../assets/img/maghsad.png')}
                key={marker.key}
              />
            ))}
          </MapView>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            alignItems: 'center',
          }}>
          <Button
            transparent
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'red',
              borderWidth: 2,
              width: '50%',
              borderRadius: 20,
              marginBottom: 10,
            }}
            onPress={this.sendDatatServer.bind(this)}>
            <Text style={{fontFamily: 'IRANSansMobile_Bold', color: 'white'}}>
              ثبت مکان رستوران
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default LocationModal;
