import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import getDistance from 'geolib/es/getDistance';
import {convertDistance} from 'geolib';
import MapView, {Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import SellinModal from './SellinModal';
import {Button} from 'native-base';
import io from 'socket.io-client';
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default class SellingMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      latitude: 2000,
      longitude: 2000,
      markers: [],
      mabda: 0,
      maghsad: 0,
      distanceKm: 0,
      money: 0,
      tstMabda: {},
    };
  }

  async componentDidMount() {
    await this.setState({
      data: this.props.navigation.state.params,
    });

    const navigationData = await this.state.data.dataItem.navigation.state
      .params.item;
    const mabdaCoordinate = await {
      latitude: navigationData.latitude,
      longitude: navigationData.longitude,
    };
    await this.setState({
      tstMabda: mabdaCoordinate,
    });
    await console.log(this.state.tstMabda);

    //console.log(this.props);
    Geolocation.getCurrentPosition(
      position => {
        //console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        //console.log(this.state.longitude, this.state.latitude);
      },
      error => {
        // See error code charts below.
        //console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 20000},
    );
  }
  async onMapPress(e) {
    if (this.state.markers.length < 1) {
      this.setState({
        markers: [
          ...this.state.markers,
          {
            coordinate: e.nativeEvent.coordinate,
            key: this.state.markers.length,
          },
        ],
      });
      await this.setState({
        maghsad: e.nativeEvent.coordinate,
      });
    }
    let distance = await getDistance(this.state.tstMabda, this.state.maghsad);
    //await console.log(distance);
    distance = await Math.round(convertDistance(distance, 'km'));
    //console.log(distance);
    await this.setState({
      distanceKm: distance,
    });
    await console.log(this.state.distanceKm);
    await this.calculateMoney(this.state.distanceKm);
  }
  openModal() {
    this.refs.SellingModal.open();
  }
  async calculateMoney(dis) {
    const foodMoney =
      (await this.state.data.count) * this.state.data.dataItem.item.price;
    const distMoney = (await dis) * 1500;
    const finalMoney = (await foodMoney) + distMoney;
    await this.setState({
      money: finalMoney,
    });
    //console.log(this.state.money);
    await this.openModal();
  }
  render() {
    return (
      <View style={[styles.container, {flex: 1}]}>
        <MapView
          // remove if not using Google Maps
          customMapStyle={customStyle}
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsCompass={true}
          showsUserLocation={true}
          showsBuildings={true}
          showsTraffic={true}
          showsIndoorLevelPicker={true}
          onPress={this.onMapPress.bind(this)}>
          <Marker
            coordinate={{
              latitude: this.state.tstMabda.latitude,
              longitude: this.state.tstMabda.longitude,
            }}
            icon={require('../../../assets/img/mabda.png')}
            title={'رستوران'}
          />
          {this.state.markers.map(marker => (
            <Marker
              coordinate={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
              }}
              icon={require('../../../assets/img/maghsad.png')}
              key={marker.key}
              title={'مقصد'}
            />
          ))}
        </MapView>
        <SellinModal
          ref={'SellingModal'}
          data={this.state.money}
          mabda={this.state.tstMabda}
          maghsad={this.state.maghsad}
        />
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
