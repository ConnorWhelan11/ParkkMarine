// @flow
import {observable, computed, action} from "mobx";

import Firebase from "../components/Firebase";
import {report} from "./DryDockReport"

import { create, persist } from 'mobx-persist'


export default class DryDockReportStore {

  @persist('object') @observable stringReportData;
  @persist('object') @observable stringSchemeData;
  @observable _offlineReportData;
  @observable _displayScheme;
  @observable _image;

  @computed get offlineReportData() { return this._offlineReportData; }
  set offlineReportData(reportData) { this._offlineReportData = reportData; }

  @computed get displayScheme() { return this._displayScheme; }
  set displayScheme(data) { this._displayScheme = data; }

  @computed get image() { return this._image; }
  set image(data) { this._image = data; }

  @action init(){
    if(!this.stringReportData){
      this.stringReportData = JSON.stringify(report);
    }
    if(!this.stringSchemeData){
      this.stringSchemeData = JSON.stringify({
        "bulb": [
          "",
          "",
          "",
          "",
          ""
        ],
        "thrust": [
          "",
          "",
          "",
          "",
          ""
        ],
        "forward": [
          "",
          "",
          "",
          "",
          ""
        ],
        "shoulders": [
          "",
          "",
          "",
          "",
          ""
        ],
        "side1": [
          "",
          "",
          "",
          "",
          ""
        ],
        "side2": [
          "",
          "",
          "",
          "",
          ""
        ],
        "side3": [
          "",
          "",
          "",
          "",
          ""
        ],
        "aft": [
          "",
          "",
          "",
          "",
          ""
        ],
        "stern": [
          "",
          "",
          ""
        ],
        "flats": [
          "",
          ""
        ],
        "boot": [
          "",
        ]
      })
    }
    this.offlineReportData = JSON.parse(this.stringReportData);
    this.displayScheme = JSON.parse(this.stringSchemeData);
  }

  offlineSave(){

  }

  resetStore(){

  }

  stringify(){
    this.stringReportData = JSON.stringify(this.offlineReportData)
  }

  @action removeCoatingTableRow(index){
    this._offlineReportData.slides[index].colors.splice(-1,1);
    this.stringify()
  }

  @action addCoatingTableRow(index){
    this._offlineReportData.slides[index].colors.push({
      code: '#000000',
      location: '',
      type: '',
      name: '',
    });
    this.stringify()
  }

  @action coatingSelect(slide, area, i, code){
    this._offlineReportData.slides[slide].scheme[area][i] = code;
    this.stringify()
  }

  async generateReport(email){
    const bodyReq = JSON.stringify({
      data: this._offlineReportData,
      email
    });

    try {
      const res = await fetch('http://ec2-13-58-174-91.us-east-2.compute.amazonaws.com:3000/generateReport', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: bodyReq
      }).then(r => {
        return r.json();
      });
      console.log('res', res)
    } catch (err) {
      console.log(err)
    }
  }
}
