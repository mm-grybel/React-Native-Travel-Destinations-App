import React, { useState, useEffect } from 'react';
import { 
    View,
    Text,
    Button,
    Alert,
    ActivityIndicator,
    StyleSheet 
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapPreview from './MapPreview';
import Colors from '../constants/Colors';

const LocationSelector = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState();

    const mapSelectedLocation = props.navigation.getParam('selectedLocation');

    const { onLocationSelected } = props;

    useEffect(() => {
        if (mapSelectedLocation) {
            setSelectedLocation(mapSelectedLocation);
            onLocationSelected(mapSelectedLocation);
        }
    }, [mapSelectedLocation, onLocationSelected]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);

        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions',
                'You need to grant location permissions to use this app.',
                [{ text: 'OK' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            setIsLoading(true);
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000
            });
            // console.log(location);
            setSelectedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            props.onLocationSelected({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        } catch (err) {
            Alert.alert(
                'Could not get the location', 
                'Please try again later or select a location on the map.', 
                [{ text: 'OK' }]
            );
        }
        setIsLoading(false);
    };

    const selectOnMapHandler = () => {
        props.navigation.navigate('Map');
    };

    return (
        <View style={styles.locationSelector}>
            <MapPreview 
                style={styles.mapPreview} 
                location={selectedLocation}
                onPress={selectOnMapHandler}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                    <Text>No location selected yet.</Text>
                )}
            </MapPreview>
            <View style={styles.actions}>
                <Button 
                    title="Get User Location"
                    color={Colors.primary}
                    onPress={getLocationHandler}
                />
                <Button 
                    title="Select on Map"
                    color={Colors.primary}
                    onPress={selectOnMapHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    locationSelector: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: Colors.gray,
        borderWidth: 1
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});

export default LocationSelector;