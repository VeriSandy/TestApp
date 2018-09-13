import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OtpenterPage } from '../otpenter/otpenter';
import { TruncateOptions } from 'lodash';
import { Storage } from '@ionic/storage';
import {DatePipe} from '@angular/common';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
user_mobile:string;
showbutton:any;
user_check:string;
key:string='userphone';
otp:string;
userToken:string;
responseData:any;
CacheContactNo:any;
CacheOTP:any;

RandomNumber;
//mobile='';
userData = {"Datestr":"", "Contact":"", "OTP":""};
userData1 = {"Datestr":"", "Contact":""};
myDate:any;



  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
  private storage: Storage,
  public authService: AuthServiceProvider,
  public datePipe: DatePipe)
  {
  }

  onSearchChange(searchValue : string ) {
    console.log(searchValue);
    if(this.user_mobile.length < 1 )
    {
      this.showbutton=false;
    }
    else
    {
      this.showbutton=true;
    }
  }

  getRandom()
  {
    console.log("inside getRandom");
    this.RandomNumber = Math.floor(100000 + (999999 - 100000) * Math.random());
    //console.log(this.RandomNumber);
  }

  getDate()
  {
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    //console.log(this.myDate);
  }

  GenOTP()
  {
    this.user_check=this.user_mobile.replace(" ","")
    if (this.user_check.length <10 )
    {

    }
    else
    {
        //1. See if number is cached in app space(If number is cached in app space
        //then make sure entry exist for this transaction). if exist proceed with home page
        //No need to generate OTP here.
        //2. Dont generate OTP if already done 5 times in today's date. Give alert "please try after sometime"
        //3. Save in DB and generate OTP and get OTP from DB
        //4. Send OTP to mobile number
        //5. Once verified, if number exist in main user table
        //6. If number exist then generate a token from server, get it to app space
        // Push to home page
        // Else ask for necessary details.
        //Once details enetered => save this number in Main user DB table. Push home page.
        //

        //Token -- need for each transaction

        this.getRandom();
        this.getDate();
        this.userData.OTP = this.RandomNumber;
        this.userData.Contact = this.user_mobile;
        this.userData.Datestr = this.myDate;
        console.log("Inside GenOTP");
        console.log(this.myDate);
        console.log(this.user_mobile);
        this.userData1.Contact = this.user_mobile;
        this.userData1.Datestr = this.myDate;

        //GET USER OTP DETAILS
        //change it to OTP table
        this.authService.postData(this.userData1, 'getotpdetails').then((result) =>{
        this.responseData = result;
        console.log("sucess GetOTPDetails");
        //console.log(this.responseData);

        if(this.responseData < 50 )
        {

              let CacheContact = 'Mobile_no';
          
              localStorage.setItem(CacheContact,this.userData.Contact);
              localStorage.setItem('CacheContactNo',this.user_check);
              localStorage.setItem('CacheOTP',this.userData.OTP);
              console.log("generating OTP: ", this.userData.OTP);
              console.log("count: " + this.responseData + " Generated for phone: " + this.userData.Contact);
              this.authService.postData(this.userData, 'pushotpdetails').then((result) =>{
              //this.responseData = result;
              //console.log("sucess PushUserDetails");
              //console.log(this.responseData);
              console.log("success in PushOTPDetails");
              //this.storage.set(this.key,this.user_check);
              //this.storage.set(this.otp,this.userData.OTP);
              //console.log(this.userData.OTP);
              this.navCtrl.setRoot(OtpenterPage);
              //this.navCtrl.push(TabsPage);
              //localStorage.setItem('userData', JSON.stringify(this.responseData));
            },(err) =>{
              //some alert
              //this.navCtrl.push(TabsPage);
              //this.responseData = err;
              //console.log("failed PushUserDetails");
              //console.log(this.responseData);
              console.log("failed in PushOTPDetails");
              alert('Network Error!! Please Regenerate OTP');
              //this.user_mobile = '' ;
              //localStorage.setItem('userData', JSON.stringify(this.responseData));
              //this.navCtrl.push(TabsPage);
            });
        }
        else
        {
          console.log("already tried 5 times, dont generate OTP now");
          this.user_mobile = '' ;
          alert('We are Sorry!!! You have reached maximum attempts for today, please try tomorrow');
          //console.log(this.responseData);
        }
      //console.log("success in getuserdetails");
      //this.navCtrl.push(TabsPage);
      //localStorage.setItem('userData', JSON.stringify(this.responseData));
      }, (err) =>{
      //some alert
      //this.navCtrl.push(TabsPage);
      //this.responseData = err;
      //console.log("failed PushUserDetails");
      //console.log(this.responseData);
      console.log("failed in GetOTPDetails");
      alert('Oops! Try Again');
      this.user_mobile = '' ;
      //localStorage.setItem('userData', JSON.stringify(this.responseData));
      //this.navCtrl.push(TabsPage);
      });
    }
  }

}
