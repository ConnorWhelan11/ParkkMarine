// @flow
import {observable, computed, action} from "mobx";

import Firebase from "../components/Firebase";
import { AsyncStorage } from 'react-native';



export default class UserStore {

    @observable _profile;
    @observable _uid;
    @observable _myReports = [];
    @observable _allUsers = [];

    @computed get profile() { return this._profile; }
    set profile(profile) { this._profile = profile; }

    @computed get uid() { return this._uid; }
    set uid(uid) { this._uid = uid; }

    @computed get myReports() { return this._myReports; }
    set myReports(myReports) { this._myReports = myReports; }

    @computed get allUsers() { return this._allUsers; }
    set allUser(allUsers) { this._allUsers = allUsers; }

    constructor(){
    }

    async init(offline){
      const reports = await AsyncStorage.getItem('reports');
      if(reports === null) {
        await AsyncStorage.setItem('reports', JSON.stringify([]))
      }
      if(!offline){
        try{
          Firebase.auth.onAuthStateChanged((user) => {
            if(user){
              this.uid = user.uid;
              this.fetchUser(user.uid)
              this.fetchReports(user.uid)
              this.fetchAllUsers()
            }
          });
        } catch(e){
          console.log(e)
        }
      } else{
        this.fetchOfflineReports();
      }
    }

    async logout(){
      Firebase.auth.signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    }

    async fetchUser(uid){
      await Firebase.firestore.collection("users").doc(uid).get().then(async snap => {
          if (snap.exists) {
            this.profile = snap.data();
          }
      });
    }

    async fetchReports(uid){
      await Firebase.firestore.collection("reports").where('createdBy', '==', uid).get().then(async snap => {
        snap.forEach((doc) => {
            var report = doc.data();
            report.id = doc.id;
            this.myReports.push(doc.data())
        });
      });
    }

    async fetchOfflineReports(){
      const reports = await AsyncStorage.getItem('reports');
      if(reports !== null) {
        this.myReports = JSON.parse(reports);
      }
    }

    async fetchAllUsers(){
      const snapshot = await Firebase.firestore.collection('users').get()
      snapshot.docs.forEach(doc => this.allUsers.push(doc.data()));
    }
}
