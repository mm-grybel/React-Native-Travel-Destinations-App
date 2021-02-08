export const ADD_DESTINATION = 'ADD_DESTINATION';

export const addDestination = (name, image) => {
    return {
        type: ADD_DESTINATION,
        destinationData: {
            name: name,
            image: image
        }
    };
};
