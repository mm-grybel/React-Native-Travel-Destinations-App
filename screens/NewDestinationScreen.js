import React, { useState } from 'react';
import { 
    View, 
    ScrollView,
    Text,
    TextInput, 
    Button,
    StyleSheet 
} from 'react-native';
import { useDispatch } from 'react-redux';

import ImageSelector from '../components/ImageSelector';
import Colors from '../constants/Colors';
import * as destinationsActions from '../store/actions/destinations';

const NewDestinationScreen = props => {
    const [nameValue, setNameValue] = useState('');

    const dispatch = useDispatch();

    const nameChangeHandler = text => {
        // TODO: add validation
        setNameValue(text);
    };

    const saveDestinationHandler = () => {
        dispatch(destinationsActions.addDestination(nameValue));
        props.navigation.goBack();
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={nameChangeHandler} 
                    value={nameValue}
                />
                <ImageSelector />
                <Button
                    title="Save"
                    color={Colors.primary} 
                    onPress={saveDestinationHandler}
                />
            </View>
        </ScrollView>
    );
};

NewDestinationScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Add Destination'
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default NewDestinationScreen;
