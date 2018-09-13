import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Storage } from '@ionic/storage';
//import { shouldCallLifecycleInitHook } from '@angular/core/src/view';
//import { getOrCreateContainerRef } from '@angular/core/src/render3/di';
//import { checkAndUpdateQuery } from '@angular/core/src/view/query';
import { DeladdressPage } from '../deladdress/deladdress';
//import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {DatePipe} from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-otpenter',
  templateUrl: 'otpenter.html',
})
export class OtpenterPage {
  key:string='userphone';
  phone:any;
  storedotp:string;
  otp:string;
  eneteredotp:any;
  responseData:any;
  dataset1:any;
  userData = {"Datestr":"", "Contact":"", "OTP":""};
  userData1 = {"Datestr":"", "Contact":""};
  userData2= {"Contact":""};
  userDataRegenerate = {"Datestr":"", "Contact":"", "OTP":""};
  userData1Regenerate = {"Datestr":"", "Contact":""};
  myDate:any;
  RandomNumber:any;


  constructor(
  public navCtrl: NavController,
  public navParams: NavParams,
 
  public authService: AuthServiceProvider,
  public datePipe: DatePipe
  )
  {



  this.phone = localStorage.getItem('CacheContactNo');
  this.otp = localStorage.getItem('CacheOTP');

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

regenerateOTP()
{
    //
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
      // FIX_ME: We need a timer for OTP validation

      //Token -- need for each transaction
      this.getDate();
      console.log("Inside regenerateOTP");
      console.log(this.myDate);
      console.log(this.phone);
      this.userData1Regenerate.Contact = this.phone;
      this.userData1Regenerate.Datestr = this.myDate;

      //GET USER OTP DETAILS
      //change it to OTP table
      this.authService.postData(this.userData1Regenerate, 'getotpdetails').then((result) =>{
      this.responseData = result;
      console.log("regenerateOTP(): sucess GetOTPDetails");
      //console.log(this.responseData);

      if(this.responseData < 6 )
      {
            this.getRandom();
            this.userDataRegenerate.OTP = this.RandomNumber;
            this.userDataRegenerate.Contact = this.phone;
            this.userDataRegenerate.Datestr = this.myDate;
            this.otp = this.RandomNumber;

            //localStorage.setItem('CacheContactNo',this.user_check);
            //localStorage.setItem('CacheOTP',this.userData.OTP);
            console.log("generating OTP: ", this.userDataRegenerate.OTP);
            console.log("count: " + this.responseData + " Generated for phone: " + this.userDataRegenerate.Contact);
            this.authService.postData(this.userDataRegenerate, 'pushotpdetails').then((result) =>{
            //this.responseData = result;
            //console.log("sucess PushUserDetails");
            //console.log(this.responseData);
            console.log("success in PushOTPDetails");
            alert('OTP has been sent');
            //this.storage.set(this.key,this.user_check);
            //this.storage.set(this.otp,this.userData.OTP);
            //console.log(this.userData.OTP);
            //this.navCtrl.setRoot(OtpenterPage);
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
            localStorage.removeItem('CacheOTP');;
            //this.user_mobile = '' ;
            //localStorage.setItem('userData', JSON.stringify(this.responseData));
            //this.navCtrl.push(TabsPage);
          });
      }
      else
      {
        console.log("already tried 5 times, dont generate OTP now");
        //this.user_mobile = '' ;
        alert('We are Sorry!!! You have reached maximum attempts for today, please try tomorrow');
        //console.log(this.responseData);
        this.navCtrl.push(LoginPage);
        localStorage.removeItem('CacheOTP');;


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
    this.otp = '';
    localStorage.removeItem('CacheOTP');;

    //this.user_mobile = '' ;
    //localStorage.setItem('userData', JSON.stringify(this.responseData));
    //this.navCtrl.push(TabsPage);
    });
    //
}

validateOTP()
{
    console.log("entered OTP " + this.eneteredotp);
  //  console.log("Mobile NO " + this.phone);

    if(this.eneteredotp == this.otp)
    {
            console.log('OTP is validated');
            //this.phone = "7795645636";
            //this.userData2.Contact = '9582777895';
           this.userData2.Contact = localStorage.getItem('CacheContactNo');
            //this.userData1.Datestr = "2018-08-30";

            this.authService.postData(this.userData2, 'userdetail').then((result) =>{
            this.responseData = result;

            if(this.responseData.userData){
              this.dataset1 = this.responseData.userData;
              console.log(this.dataset1);
              console.log(this.dataset1.MOBILE_NO);
              console.log(this.dataset1.token);
              console.log(this.dataset1.LOCATION_NAME);
              console.log(this.dataset1.ADRESS_HOME);
              console.log(this.dataset1.DELIVERY_NEIGHBOUR);
              console.log(this.dataset1.DELIVERY_SECURITY);
              console.log(this.dataset1.FIRST_DELIVERY);

              localStorage.setItem('GlobalToken',this.dataset1.token);
              localStorage.setItem('GlobalContactNo',this.dataset1.MOBILE_NO);
              localStorage.setItem('Global_Locality',this.dataset1.LOCATION_NAME);
              localStorage.setItem('GloabalAddress',this.dataset1.ADRESS_HOME);
              localStorage.setItem('Gloabal_Neighbour',this.dataset1.DELIVERY_NEIGHBOUR);
              localStorage.setItem('Gloabal_Security',this.dataset1.DELIVERY_SECURITY);
              localStorage.setItem('Gloabal_FirstDelivery',this.dataset1.FIRST_DELIVERY);
              localStorage.removeItem('CacheContactNo');
              localStorage.removeItem('CacheOTP');
              console.log("local variable has been set");
              console.log("sucess GetUserDetails");
              this.navCtrl.setRoot( TabsPage );
            
            

            }
            else
            {
              console.log("User do not exist");
              this.navCtrl.setRoot( DeladdressPage );
            }
            //this.dataset1 = this.responseData.userData;
           // console.log(this.dataset1.user_id);
            //if();
            //console.log("sucess GetUserDetails");
            //this.navCtrl.setRoot( HomePage );
            //localStorage.removeItem('CacheOTP');
            //localStorage.removeItem('CacheContactNo');
            //FIX_ME: save token value in global token, as it is being used throughout all the transactions for this user
            //localStorage.setItem('GlobalToken',this.responseData.txt);
            //keep contact no and discard the earlier stored
            //localStorage.setItem('GlobalContactNo',this.phone);
            //localStorage.clear('CacheContactNo');

            }, (err) =>{
              console.log("failed in GetUserDetails");
              this.responseData = err;
              console.log(this.responseData);
              console.log(this.responseData.error.text);

             /* if(this.responseData.error.text.includes("This entry does not exist"))
              {
                console.log("setting del address page");
                this.navCtrl.setRoot( DeladdressPage );
              }
              else{
                //if it exist then set home page as root

                localStorage.setItem('GlobalToken',this.responseData.txt);
                localStorage.setItem('GlobalContactNo',this.phone);
                //this.CacheContactNo = '';
                localStorage.removeItem('CacheContactNo');
               // this.navCtrl.setRoot( HomePage );
              }
              */
              //FIX_ME:: In case if it fails to get the data, clear cache and redirect to login
              localStorage.removeItem('CacheContactNo');
              alert('Network Error!! Please Relogin');
              this.navCtrl.setRoot( LoginPage );

              });
    }
    else{
            this.eneteredotp = '';
            // Clear the input text
            alert('Please Enter correct OTP');
    }
    //this.navCtrl.setRoot( DeladdressPage );
}

  /*
  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpenterPage');
  }
  */

}
