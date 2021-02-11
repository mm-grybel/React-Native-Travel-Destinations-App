import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import DestinationsListScreen from '../screens/DestinationsListScreen';
import DestinationDetailScreen from '../screens/DestinationDetailScreen';
import NewDestinationScreen from '../screens/NewDestinationScreen';
import MapScreen from '../screens/MapScreen';
import Colors from '../constants/Colors';

const DestinationsNavigator = createStackNavigator({
    Destinations: DestinationsListScreen,
    DestinationDetail: DestinationDetailScreen,
    NewDestination: NewDestinationScreen,
    Map: MapScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? Colors.white : Colors.primary
    }
});

export default createAppContainer(DestinationsNavigator);