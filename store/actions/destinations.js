import * as FileSystem from 'expo-file-system';

export const ADD_DESTINATION = 'ADD_DESTINATION';

export const addDestination = (name, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop(); // the last part of the path
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
        } catch (err) {
            // TODO: store errors on an analytics server
            console.log(err);
            throw err;
        }

        dispatch({
            type: ADD_DESTINATION,
            destinationData: {
                name: name,
                image: image
            }
        });
    };
};
