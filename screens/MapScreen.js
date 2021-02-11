import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState();

    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = event => {
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
    };

    let markerCoordinates;

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude
        };
    }

    return (
        <MapView 
            style={styles.map} 
            region={mapRegion}
            onPress={selectLocationHandler}
        >
            {markerCoordinates && (
                <Marker title="Selected Location" coordinate={markerCoordinates} />
            )}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default MapScreen;
