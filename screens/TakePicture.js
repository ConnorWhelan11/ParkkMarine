// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, View, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Modal, ActivityIndicator, AsyncStorage} from "react-native";
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Feather as Icon } from "@expo/vector-icons";

import EnableCameraPermission from "./EnableCameraPermission";
import FlashIcon from "./FlashIcon";
import {inject, observer} from "mobx-react";
import type {ScreenProps} from "../../components/Types";

@inject("userStore", 'dryDockStore')
@observer
export default class TakePicture extends React.Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
        loading: false
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === "granted"
        });
    }

    toggle() {
        this.setState({ loading: false });
    }

    toggleFlash() {
        const {flashMode} = this.state;
        const {on, off} = Camera.Constants.FlashMode;
        this.setState({ flashMode: flashMode === on ? off : on });
    }

    toggleCamera() {
        const {type} = this.state;
        const {front, back} = Camera.Constants.Type;
        this.setState({ type: type === back ? front : back });
    }

    async snap() {
        const {navigation} = this.props;
        try {
            this.setState({ loading: true });
            const picture = await this.camera.takePictureAsync();
            this.props.navigation.state.params.onGoBack(picture.uri);
            this.props.navigation.goBack();
        } catch (e) {
            this.setState({ loading: false });
        }
    }

    backFn() {
        this.props.navigation.goBack();
    }

    render() {
        const {navigation} = this.props;
        const {backFn} = this;
        const {hasCameraPermission, type, flashMode, loading} = this.state;
        if (hasCameraPermission === null) {
            return (
                <View style={styles.refreshContainer}>
                    <ActivityIndicator />
                </View>
            );
        } else if (hasCameraPermission === false) {
            return <EnableCameraPermission />;
        }
        return (
            <View style={styles.container}>
                <Camera ref={ref => {
                      this.camera = ref;
                    }} style={styles.camera} {...{type, flashMode}}>
                    <View style={styles.cameraBtns}>
                        <TouchableWithoutFeedback onPress={() => this.toggleCamera()}>
                            <View>
                                <Icon name="rotate-ccw" style={styles.rotate} size={25} />
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.toggleFlash()}>
                            <View>
                                <FlashIcon on={flashMode === Camera.Constants.FlashMode.on} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Camera>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => this.snap()}>
                        <View style={styles.btn} />
                    </TouchableOpacity>
                </View>
                <Modal transparent visible={loading} onRequestClose={this.toggle}>
                    <View style={styles.modal}>
                        <ActivityIndicator />
                    </View>
                </Modal>
            </View>
        );
    }
}

TakePicture.navigationOptions = {
  title: 'Take Picture',
};

const {width, height} = Dimensions.get("window");
const ratio = width / height;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    refreshContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    camera: {
        width,
        height: width
    },
    cameraBtns: {
        position: "absolute",
        bottom: 0,
        width,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    rotate: {
        backgroundColor: "transparent",
        color: "white"
    },
    footer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        height: ratio < 0.75 ? 100 : 60,
        width: ratio < 0.75 ? 100 : 60,
        borderRadius: ratio < 0.75 ? 50 : 30,
        borderWidth: ratio < 0.75 ? 20 : 10,
        borderColor: 'black'
    },
    modal: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    }
});
