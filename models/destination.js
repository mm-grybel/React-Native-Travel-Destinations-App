import { add } from "react-native-reanimated";

class Destination {
    constructor(id, name, imageUri, address, latitude, longitude) {
        this.id = id;
        this.name = name;
        this.imageUri = imageUri;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default Destination;
