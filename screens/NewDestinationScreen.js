import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewDestinationScreen = props => {
    return (
        <View>
            <Text>NewDestinationScreen</Text>
        </View>
    );
};

NewDestinationScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Add Destination'
    };
};

const styles = StyleSheet.create({});

export default NewDestinationScreen;
