import React from 'react';
import { 
    FlatList, 
    Platform, 
    StyleSheet 
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../components/CustomHeaderButton';
import DestinationItem from '../components/DestinationItem';

const DestinationsListScreen = props => {
    const destinations = useSelector(state => state.destinations.destinations);
    
    return (
        <FlatList 
            data={destinations}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <DestinationItem 
                    image={null}
                    name={itemData.item.name}
                    address={null}
                    onSelect={() => {
                        props.navigation.navigate('DestinationDetail', {
                            destinationName: itemData.item.name,
                            destinationId: itemData.item.id
                        });
                    }}
                />
            )}
        />
    );
};

DestinationsListScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Destinations',
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
