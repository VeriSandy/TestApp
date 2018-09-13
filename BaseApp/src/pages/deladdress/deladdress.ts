import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { DatePipe} from '@angular/common';
//import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-deladdress',
  templateUrl: 'deladdress.html',
})
export class DeladdressPage {

  //GlobalContactNo:any;
  //GlobalToken:any;
 // temp:any;
/*
  Global_Locality
  localStorage.setItem('Global_Locality',this.Locality);
  localStorage.setItem('GloabalAddress',this.Address);
  localStorage.setItem('Gloabal_Neighbour',this.Neighbour);
  localStorage.setItem('Gloabal_Security',this.Security);
  localStorage.setItem('Gloabal_FirstDelivery',this.FirstDelivery);
  */

  public responseData: any;
  public dataset: any;
  public dataset1: any;
  public localitydetails: any;
  public Area: any;
  public Locality: any;
  areaSet = {"Datestr":"", "AreaVal":""};
  public myDate:any;
  public user_email:any;
  Security:any = 0;
  Neighbour:any = 0;
  CityCode:any = "100";
  AddressSecond:any = "";
  Comments:any = "";
  FirstDelivery:any = 1;

  userDetails =
  {
    "MobileNO":"",
    "EmailID":"",
    "DateStr":"",
    "CityCode":"100",
    "AreaName":"",
    "LocationName":"",
    "AddressHome":"",
    "AddressSecond":" ",
    "DelToNeighbour":"", //deliver to neighbour
    "DelToSecurity":"",
    "Comments":"",
    "FirstDelivery":"" //1 for yes, '0' for no
  };

  public Address: any;

  constructor(public navCtrl: NavController,public authService: AuthServiceProvider, public datePipe: DatePipe) {

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

getDate()
{
  this.myDate = new Date();
  this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  //console.log(this.myDate);
}

//Push all details to main user table
PushToUserTable()
{
  this.getDate();
  /*
  "MobileNO":"",
  "EmailID":"",
  "DateStr":"",
  "CityCode":"100",
  "AreaName":"",
  "LocationName":"",
  "AddressHome":"",
  "AddressSecond":"",
  "DelToNeighbour":"", //deliver to neighbour
  "DelToSecurity":"",
  "Comments":"",
  "FirstDelivery":"1" //1 for yes, '0' for no
  */
  this.userDetails.MobileNO = localStorage.getItem('CacheContactNo');
 // this.userDetails.MobileNO = '9780401566';
  this.userDetails.EmailID = this.user_email;
  this.userDetails.DateStr = this.myDate;
  console.log(this.userDetails.DateStr);
  this.userDetails.AreaName = this.Area;
  this.userDetails.LocationName = this.Locality;
  this.userDetails.AddressHome = this.Address;
  this.userDetails.AddressSecond = this.AddressSecond;
  this.userDetails.DelToNeighbour = this.Neighbour;
  this.userDetails.DelToSecurity = this.Security;
  this.userDetails.Comments = this.Comments;
  this.userDetails.FirstDelivery = this.FirstDelivery;


  console.log(
  this.userDetails.MobileNO + " " + this.user_email + " " + this.myDate + " "
  + this.Area + " " + this.Locality + " " + this.Address + " " + this.CityCode + " " +
  this.Neighbour + " " + this.Security + " FirstDelivery: " + this.FirstDelivery + " Comments: " + this.Comments);
 console.log("posting user detail now");
  this.authService.postData(this.userDetails, 'postuserdetails').then((result) =>{
  this.responseData = result;
  if(this.responseData.userData){
    console.log(this.responseData);
    //localStorage.setItem('GlobalToken', JSON.stringify(this.responseData));
    console.log("success in PushToUserTable");
    this.dataset1 = this.responseData.userData;
    console.log(this.dataset1.MOBILE_NO);
    console.log(this.dataset1.token);
    
    console.log(this.responseData.userData.Token);

    // Setting global variable
    localStorage.setItem('GlobalToken',this.dataset1.token);
    localStorage.setItem('GlobalContactNo',this.dataset1.MOBILE_NO);
    localStorage.setItem('Global_Locality',this.Locality);
    localStorage.setItem('GloabalAddress',this.Address);
    localStorage.setItem('Gloabal_Neighbour',this.Neighbour);
    localStorage.setItem('Gloabal_Security',this.Security);
    localStorage.setItem('Gloabal_FirstDelivery',this.FirstDelivery);
    localStorage.removeItem('CacheContactNo');
    console.log("local variable has been set");
    this.navCtrl.setRoot( TabsPage );
  }
  else{
    console.log("There is no data");
  }
  //console.log("sucess PushUserDetails");
  //console.log(this.responseData);
  


  
  //localStorage.setItem('GlobalToken',this.responseData.txt);
 
 
  //console.log(JSON.parse(localStorage.getItem('GlobalToken')));
  //this.temp = localStorage.getItem('Gloabal_Security');
  //console.log(this.temp);
  //console.log(GlobalToken);


  //delete all the localstoragehere
  
  },(err) =>{
    this.responseData = err;
    console.log(this.responseData);
    //push on alert here and go to login page
    //delete all the localstoragehere
    alert('OOPS!! Authentication Failed');
    this.navCtrl.setRoot( LoginPage );
    console.log("failed in PushToUserTable");
  });
}
}
