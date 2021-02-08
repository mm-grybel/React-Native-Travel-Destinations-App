import React, { useState } from 'react';
import { 
    View,
    Text,
    Button,
    Image,
    Alert,
    StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImageSelector = props => {
    const [selectedImage, setSelectedImage] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions',
                'You need to grant camera permissions to use this app.',
                [{ text: 'OK' }]
            );
            return false;
        }
        return true;
    };

    const takePhotoHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const img = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setSelectedImage(img.uri);
        props.onPhotoTaken(img.uri);
    };

    return (
        <View style={styles.imageSelector}>
            <View style={styles.imagePreview}>
                {!selectedImage
                ? (
                    <Text>No image selected yet.</Text>
                ) : (
                    <Image 
                        style={styles.image} 
                        source={{uri: selectedImage}}
                    />
                )}
            </View>
            <Button 
                title="Take a Photo" 
                color={Colors.primary} 
                onPress={takePhotoHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imageSelector: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.gray,
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImageSelector;
