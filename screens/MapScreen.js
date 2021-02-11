import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Colors from '../constants/Colors';

const MapScreen = props => {
    const initialLocation = props.navigation.getParam('initialLocation');
    const readonly = props.navigation.getParam('readonly');

    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    const mapRegion = {
        latitude: initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };

    const selectLocationHandler = event => {
        if (readonly) {
            return;
        }

        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
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
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
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
    const readonly = navigationData.navigation.getParam('readonly');
    if (readonly) {
        return;
    }

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
