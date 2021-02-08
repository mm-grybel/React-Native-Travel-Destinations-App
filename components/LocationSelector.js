import React, { useState } from 'react';
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

import Colors from '../constants/Colors';

const LocationSelector = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState();

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
            console.log(location);
            setSelectedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
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

    return (
        <View style={styles.locationSelector}>
            <View style={styles.mapPreview}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                    <Text>No location selected yet.</Text>
                )}
            </View>
            <Button 
                title="Get User Location"
                color={Colors.primary}
                onPress={getLocationHandler}
            />
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
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LocationSelector;
