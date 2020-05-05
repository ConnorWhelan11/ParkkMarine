// @flow
import * as ImageManipulator from 'expo-image-manipulator';

import Firebase from "./Firebase";
const {manipulate} = ImageManipulator;
const id = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

export default class ImageUpload {

    static uid(){
        return `${id()}${id()}-${id()}-${id()}-${id()}-${id()}${id()}${id()}`;
    }

    static async preview(uri){
        const result = await manipulate(uri, [{ resize: { width: 10, height: 10 }}], { base64: true });
        return `data:image/jpeg;base64,${result.base64 || ""}`;
    }

    static async upload(uri){
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });
        const ref = Firebase
            .storage
            .ref()
            .child(ImageUpload.uid());
        const snapshot = await ref.put(blob);
        const downloadURL = await snapshot.ref.getDownloadURL();
        return downloadURL;
    }
}
