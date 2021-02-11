import * as FileSystem from 'expo-file-system';

import { fetchDestinations, insertDestination } from '../../helpers/db';
import ENV from '../../env';

export const ADD_DESTINATION = 'ADD_DESTINATION';
export const SET_DESTINATIONS = 'SET_DESTINATIONS';

export const addDestination = (name, image, location) => {
    return async dispatch => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
                location.lat
            },${
                location.lng
            }&key=${ENV.googleApiKey}`
        );

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const responseData = await response.json();
        // console.log(responseData);
        if (!responseData.results) {
            throw new Error('Something went wrong!');
        }

        const address = responseData.results[0].formatted_address;

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
                address,
                location.lat,
                location.lng
            );
            console.log(dbResult);

            dispatch({
                type: ADD_DESTINATION,
                destinationData: {
                    id: dbResult.insertId,
                    name: name,
                    image: newPath,
                    address: address,
                    coords: {
                        lat: location.lat,
                        lng: location.lng
                    }
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