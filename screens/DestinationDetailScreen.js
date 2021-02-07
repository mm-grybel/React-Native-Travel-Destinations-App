import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DestinationDetailScreen = props => {
    return (
        <View>
            <Text>DestinationDetailScreen</Text>
        </View>
    );
};

DestinationDetailScreen.navigationOptions = navigationData => {
    return {
        headerTitle: navigationData.navigation.getParam('destinationName')
    };
};

const styles = StyleSheet.create({});

export default DestinationDetailScreen;
