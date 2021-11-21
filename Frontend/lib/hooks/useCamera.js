// NÃO MODIFIQUE NEM SUBSTITUA ESTE ARQUIVO

import React, { useRef, useState } from 'react';

import { Platform } from 'react-native';

import * as FileSystem from 'expo-file-system';
import { manipulateAsync } from 'expo-image-manipulator';
import { Camera } from 'expo-camera';

const MAX_SIZE = 640;

export default function useCamera(uri) {
    const ref = useRef();

    const [allowed, setAllowed] = useState(false);
    const [active, setActive] = useState(false);
    const [first, setFirst] = useState(Platform.OS === 'android');
    const [photo, setPhoto] = useState({
        taking: false,
        saving: false,
        valid: true,
        uri: uri,
    });

    function activate() {
        if (!active) {
            if (allowed) {
                setActive(true);
            } else {
                Camera.requestCameraPermissionsAsync()
                    .then((response) => {
                        if (response.granted) {
                            setAllowed(true);
                            setActive(true);
                        }
                    })
                    .catch(() => {
                        setPhoto({
                            taking: false,
                            saving: false,
                            valid: false,
                            uri: photo.uri,
                        });
                    });
            }
        }
    }

    function encode(uri) {
        FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
            .then((data) => {
                setPhoto({
                    taking: false,
                    saving: false,
                    valid: true,
                    uri: `data:image/jpg;base64,${data}`,
                });
            });
    }

    function resize(input) {
        let width;
        let height;
        if (input.width < input.height) {
            height = MAX_SIZE;
            width = input.width * (height / input.height);
        } else {
            width = MAX_SIZE;
            height = input.height * (width / input.width);
        }
        manipulateAsync(input.uri, [{ resize: { width, height } }])
            .then((output) => {
                if (Platform.OS === 'web') {
                    setPhoto({
                        taking: false,
                        saving: false,
                        valid: true,
                        uri: output.uri,
                    });
                } else {
                    encode(output.uri);
                }
            });
    }

    function doTake(keepActive) {
        ref.current.takePictureAsync()
            .then((result) => {
                setPhoto({
                    taking: false,
                    saving: true,
                    valid: photo.valid,
                    uri: photo.uri,
                });
                if (result.width <= MAX_SIZE && result.height <= MAX_SIZE) {
                    if (Platform.OS === 'web') {
                        setPhoto({
                            taking: false,
                            saving: false,
                            valid: true,
                            uri: result.uri,
                        });
                    } else {
                        encode(result.uri);
                    }
                } else {
                    resize(result);
                }
                setActive(keepActive);
            })
            .catch(() => {
                setPhoto({
                    taking: false,
                    saving: false,
                    valid: false,
                    uri: photo.uri,
                });
                setActive(keepActive);
            });
    }

    function take(keepActive) {
        if (active && ref.current) {
            setPhoto({
                taking: true,
                saving: photo.saving,
                valid: photo.valid,
                uri: photo.uri,
            });
            if (first) {
                setFirst(false);
                ref.current.takePictureAsync();
            }
            setTimeout(() => doTake(keepActive), 1000);
        }
    }

    function deactivate() {
        if (active) {
            setActive(false);
        }
    }

    function pause() {
        if (ref.current) {
            ref.current.pausePreview();
        }
    }

    function resume() {
        if (ref.current) {
            ref.current.resumePreview();
        }
    }

    function Preview(props) {
        return (
            <Camera
                {...props}
                ref={ref}
            >
                {props.children}
            </Camera>
        );
    }

    return {
        camera: {
            allowed,
            active,
            activate,
            take,
            deactivate,
            pause,
            resume,
        },
        photo,
        Preview,
    };
}
