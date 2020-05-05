// @flow
import * as React from "react";
import {StyleSheet, View, Linking} from "react-native";

import {Button, Text} from "@ui-kitten/components";

const onPress = async () => Linking.openURL("app-settings:");

export default class EnableCameraPermission extends React.Component {

    state = {
        canOpen: null
    };

    async componentDidMount() {
        const canOpen = await Linking.canOpenURL("app-settings:");
        this.setState({ canOpen });
    }

    render() {
        const {canOpen} = this.state;
        if (canOpen === null) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Text type="header3" style={styles.text} gutterBottom>Take Pictures with NextStep</Text>
                <Text style={styles.text} gutterBottom>
                Allow access to your camera to start taking photos with NextStep.
                </Text>
                {
                    canOpen === true && (
                        <Button label="Enable Camera Access" primary full {...{onPress}} />
                    )
                }
                {
                    canOpen === false && (
                        <Text gutterBottom style={styles.text}>
                        Allow access to your camera in the app settings.
                        </Text>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20
    },
    text: {
        textAlign: "center"
    }
});
