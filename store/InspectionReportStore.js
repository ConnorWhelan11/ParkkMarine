// @flow
import {observable, computed, action} from "mobx";

import Firebase from "../components/Firebase";


export default class InspectionReportStore {

    @observable _reportData = {
      id: '',
      createdBy: '',
      title: '',
      type: 'inspection',
      dueDate: '',
      timestamp: '',
      name: '',
      slides: [
        {
          type: 'titleSlide',
          preparedFor: '',
        },
        {
          type: 'textArea',
          text: '',
        },
        {
          type: 'images',
          images: [],
        },
        {
          type: 'images',
          images: [],
        },
        {
          type: 'textArea',
          text: '',
        },
        {
          type: 'textAndImages',
          text: '',
          images: [],
        },
        {
          type: 'textAndImages',
          text: '',
          images: [],
        },
        {
          type: 'textAndImages',
          text: '',
          images: [],
        },
      ]
    };

    @computed get reportData() { return this._reportData; }
    set reportData(reportData) { this._reportData = reportData; }


    async init(){

    }

    async generateReport(reportData){
      try {
      const res = await fetch('http://ec2-13-58-174-91.us-east-2.compute.amazonaws.com:3000/generateReport', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportData)
      }).then(r => {
        return r.json();
      });
      console.log('res', res)
    } catch (err) {
      console.log(err)
    }
    }

    async createReport(){
      await Firebase.firestore.collection('reports').doc(this.reportData.id).set(this.reportData);
    }

    async updateReport(reportData){
      await Firebase.firestore.collection('reports').doc(reportData.id).update(reportData).then(function() {
          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    }

    resetData(){
      this.reportData = {
        createdBy: '',
        title: 'Inspection Report',
        id: '',
        type: 'inspection',
        dueDate: '',
        timestamp: '',
        slides: [
          {
            type: 'titleSlide',
            preparedBy: '',
            preparedFor: '',
          },
          {
            type: 'textArea',
            text: '',
          },
          {
            type: 'images',
            images: [],
          },
          {
            type: 'images',
            images: [],
          },
          {
            type: 'textArea',
            text: '',
          },
          {
            type: 'textAndImages',
            text: '',
            images: [],
          },
          {
            type: 'textAndImages',
            text: '',
            images: [],
          },
          {
            type: 'textAndImages',
            text: '',
            images: [],
          },
        ]
      }
    }
}
