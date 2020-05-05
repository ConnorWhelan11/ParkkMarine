// @flow
import * as firebase from "firebase";
import "firebase/firestore";

var config = {
    apiKey: "AIzaSyDk51pWH0sAIx0-VtuimiLMRtotdCcV_Co",
    authDomain: "parkk-marine.firebaseapp.com",
    databaseURL: "https://parkk-marine.firebaseio.com",
    projectId: "parkk-marine",
    storageBucket: "parkk-marine.appspot.com",
    messagingSenderId: "817658658196",
    appId: "1:817658658196:web:df829d5571f7098519a381",
    measurementId: "G-SVTFG4FTP2"
};



export default class Firebase {

    static firestore;
    static auth;
    static storage;

    static init() {
        if(!firebase.apps.length){
          firebase.initializeApp(config);
        }
        Firebase.firestore = firebase.firestore();
        Firebase.auth = firebase.auth();
        Firebase.storage = firebase.storage();
    }
}
