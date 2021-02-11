import { ADD_DESTINATION, SET_DESTINATIONS } from '../actions/destinations';
import Destination from '../../models/destination';

const initialState = {
    destinations: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DESTINATIONS:
            return {
                destinations: action.destinations.map(
                    dest => new Destination(
                        dest.id.toString(), 
                        dest.name, 
                        dest.imageUri,
                        dest.address,
                        dest.lat,
                        dest.lng
                    )
                )
            };
        case ADD_DESTINATION:
            const newDestination = new Destination(
                action.destinationData.id.toString(),
                action.destinationData.name,
                action.destinationData.image,
                action.destinationData.address,
                action.destinationData.coords.lat,
                action.destinationData.coords.lng
            );
            return {
                destinations: state.destinations.concat(newDestination)
            };
        default:
            return state;
    }
};