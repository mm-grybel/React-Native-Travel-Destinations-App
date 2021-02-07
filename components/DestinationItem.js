import React from 'react';
import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

const DestinationItem = props => {
    return (
        <TouchableOpacity
            onPress={props.onSelect}
            style={styles.destinationItem}
        >
            <Image 
                style={styles.image}
                source={{ uri: props.image }}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.address}>{props.address}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    destinationItem: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.gray,
        borderColor: Colors.primary,
        borderWidth: 1
    },
    infoContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    name: {
        color: Colors.black,
        fontSize: 18,
        marginBottom: 5
    },
    address: {
        color: Colors.darkGray,
        fontSize: 16
    }
});

export default DestinationItem;
