import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const DestinationDetailScreen = props => {
    const destinationId = props.navigation.getParam('destinationId');
    const selectedDestination = useSelector(state => 
        state.destinations.destinations.find(destination => destination.id === destinationId)
    );

    const selectedLocation = { latitude: selectedDestination.latitude, longitude: selectedDestination.longitude };

    const showMapHandler = () => {
        props.navigation.navigate('Map', {
            readonly: true,
            initialLocation: selectedLocation
        });
    };

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <Image 
                source={{uri: selectedDestination.imageUri}} 
                style={styles.image}
            />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{selectedDestination.address}</Text>
                </View>
                <MapPreview 
                    style={styles.mapPreview}
                    location={selectedLocation}
                    onPress={showMapHandler}
                />
            </View>
        </ScrollView>
    );
};

DestinationDetailScreen.navigationOptions = navigationData => {
    return {
        headerTitle: navigationData.navigation.getParam('destinationName')
    };
};

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: Colors.gray
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: Colors.white,
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});

export default DestinationDetailScreen;
