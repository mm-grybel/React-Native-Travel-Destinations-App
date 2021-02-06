import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../components/CustomHeaderButton';

const DestinationsListScreen = props => {
    return (
        <View>
            <Text>DestinationsListScreen</Text>
        </View>
    );
};

DestinationsListScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'All Destinations',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title='Add Destination'
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navigationData.navigation.navigate('NewDestination');
                    }}
                />
            </HeaderButtons>
        )
    };
    
};

const styles = StyleSheet.create({});

export default DestinationsListScreen;
