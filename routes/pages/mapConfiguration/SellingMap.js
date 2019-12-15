import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import getDistance from 'geolib/es/getDistance';
import {convertDistance} from 'geolib';
import MapView, {Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
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
      latitude: 2000,
      longitude: 2000,
      markers: [],
      mabda: 0,
      maghsad: 0,
      distanceKm: 0,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(this.state.longitude, this.state.latitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 20000},
    );
  }
  async onMapPress(e) {
    if (this.state.markers.length <= 1) {
      this.setState({
        markers: [
          ...this.state.markers,
          {
            coordinate: e.nativeEvent.coordinate,
            key: this.state.markers.length,
          },
        ],
      });
      if (this.state.markers.length == 0) {
        await this.setState({
          mabda: e.nativeEvent.coordinate,
        });
        console.log(this.state.mabda);
      } else {
        await this.setState({
          maghsad: e.nativeEvent.coordinate,
        });
      }
      console.log(this.state.maghsad);
    }
    let distance = await getDistance(this.state.mabda, this.state.maghsad);
    //await console.log(distance);
    distance = await convertDistance(distance, 'km');
    //console.log(distance);
    await this.setState({
      distanceKm: distance,
    });
    //await console.log(this.state.distanceKm);
  }
  render() {
    return (
      <View style={[styles.container, {flex: 1}]}>
        <MapView
          // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          onPress={this.onMapPress.bind(this)}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            icon={require('../../../assets/img/pin128.png')}
            title={'مکان فعلی من'}
          />
          {this.state.markers.map(marker => (
            <Marker
              coordinate={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
              }}
              icon={
                marker.key == 0
                  ? require('../../../assets/img/mabda.png')
                  : require('../../../assets/img/maghsad.png')
              }
              key={marker.key}
              title={marker.key == 0 ? 'مبدا من' : 'مقصد من'}
            />
          ))}
        </MapView>
      </View>
    );
  }
}
