import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';


/**
 * Generated class for the DellocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delloc',
  templateUrl: 'delloc.html',
})
export class DellocPage {
  public localitydetails: any;
  public Area: any;
  public Locality: any;
  areaSet = {"Datestr":"", "AreaVal":""};
  public responseData: any;
  public dataset: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider) {
    this.getAreaDetails();
  }
  SetArea()
  {
    //console.log("SetArea");
    //console.log("SetArea");
    //let item = this.Area;
    //console.log("SetArea: " + item);
    console.log("SetArea: " + this.Area);
    this.getLocalityDetails();
  }
  
  SetLocality(Locality)
  {
    //console.log("SetLocality");
    console.log("SetLocality: " + this.Locality);
  }
  
  getAreaDetails(){
   this.authService.getData('areadetails').then((result) =>{
    this.responseData = result;
    console.log(this.responseData);
    if(this.responseData.areanames){
      this.dataset = this.responseData.areanames;
      console.log(this.dataset);
    }
    console.log("success in delivery getAreaDetails");
    //this.navCtrl.push(TabsPage);
    //localStorage.setItem('userData', JSON.stringify(this.responseData))
  }, (err) =>{
    //some alert
    //this.navCtrl.push(TabsPage);
    this.responseData = err;
    console.log(this.responseData);
    console.log("failed in delivery getAreaDetails");
  });
  //this.navCtrl.push(TabsPage);
  }
  
  getLocalityDetails(){
  this.areaSet.AreaVal = this.Area;
   this.authService.postData(this.areaSet, 'getlocalitydetails').then((result) =>{
    this.responseData = result;
    console.log(this.responseData);
    if(this.responseData.Locations){
      this.localitydetails = this.responseData.Locations;
      console.log(this.localitydetails);
    }
    console.log("success in delivery getLocalityDetails");
    //this.navCtrl.push(TabsPage);
    //localStorage.setItem('userData', JSON.stringify(this.responseData))
  }, (err) =>{
    //some alert
    //this.navCtrl.push(TabsPage);
    this.responseData = err;
    console.log(this.responseData);
    console.log("failed in delivery getLocalityDetails");
  });
  //this.navCtrl.push(TabsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DellocPage');
  }

}
