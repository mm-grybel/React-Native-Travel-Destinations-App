import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

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

    const saveSelectedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            // TODO: show an alert
            return;
        }
        
        props.navigation.navigate(
            'NewDestination', {
                selectedLocation: selectedLocation
            });
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({
            saveLocation: saveSelectedLocationHandler
        })
    }, [saveSelectedLocationHandler]);

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

MapScreen.navigationOptions = navigationData => {
    const saveFunc = navigationData.navigation.getParam('saveLocation');

    return {
        headerRight: () => (
            <TouchableOpacity 
                style={styles.headerButton}
                onPress={saveFunc}
            >
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
        )
    };
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtonText: {
        fontSize: 16,
        color: Platform.OS === 'android' ? Colors.white : Colors.primary
    }
});

export default MapScreen;
