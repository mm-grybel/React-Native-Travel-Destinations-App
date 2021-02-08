import * as FileSystem from 'expo-file-system';

import { fetchDestinations, insertDestination } from '../../helpers/db';

export const ADD_DESTINATION = 'ADD_DESTINATION';
export const SET_DESTINATIONS = 'SET_DESTINATIONS';

export const addDestination = (name, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop(); // the last part of the path
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });

            const dbResult = await insertDestination(
                name,
                newPath,
                '45 Rockefeller Plaza, New York, NY 10111, United States',
                40.7128,
                74.0060
            );
            console.log(dbResult);

            dispatch({
                type: ADD_DESTINATION,
                destinationData: {
                    id: dbResult.insertId,
                    name: name,
                    image: newPath
                }
            });
        } catch (err) {
            // TODO: store errors on an analytics server
            console.log(err);
            throw err;
        }
    };
};

export const loadDestinations = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchDestinations();
            console.log(dbResult);

            dispatch({
                type: SET_DESTINATIONS,
                destinations: dbResult.rows._array
            });
        } catch (err) {
            throw err;
        }
    };
};
