import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { AddmoneyPage } from '../addmoney/addmoney';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
sec_deposit:any;
main_balance:any;
planner_balance:any;
public loggedin:any;
public loggedoff:any;
public responseData: any;
public responseData2: any;
public dataset: any;
public dataset2:any;

userDetails =
  {
    "MobileNO":"",
    "Token":""
  };
  userDetails2 =
  {
    "MobileNO":"",
    "Token":""
  };

ionViewDidEnter()
{
  if(localStorage.getItem('GlobalContactNo')!== null || localStorage.getItem('GlobalToken')!== null)
  {
   this.loggedin = true;
   this.loggedoff=false;
   this.displaywallet();
   this.diplaytransaction();
  }
  else
  {
   this.loggedin = false;
   this.loggedoff=true;
  }
}
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider) {
    
    //this.sec_deposit=0;
    //this.main_balance=0;
    //this.planner_balance=0;
  }
  displaywallet()
  {
    this.userDetails.MobileNO = localStorage.getItem('GlobalContactNo');
    this.userDetails.Token=localStorage.getItem('GlobalToken');
    this.authService.postData(this.userDetails, 'getwallet').then((result) =>{
      this.responseData = result;

      if(this.responseData.walletData){
        this.dataset = this.responseData.walletData;
        this.main_balance=this.dataset.MAIN_BALANCE;
        this.planner_balance=this.dataset.PLANNER_BALANCE;
        this.sec_deposit=this.dataset.SECURITY_DEPOSIT;

        console.log(this.dataset);
        console.log(this.dataset.MAIN_BALANCE);
        console.log(this.dataset.SECURITY_DEPOSIT);
        console.log(this.dataset.PLANNER_BALANCE);
        
      }
      else
      {
        console.log("Data do not exist");
        //this.navCtrl.setRoot( DeladdressPage );
      }
     
      }, (err) =>{
        console.log("failed in GetwalletDetails");
        this.responseData = err;
        console.log(this.responseData);
        console.log(this.responseData.error.text);
        });
  }

  diplaytransaction()
  {
    this.userDetails2.MobileNO = localStorage.getItem('GlobalContactNo');
    this.userDetails2.Token=localStorage.getItem('GlobalToken');
    this.authService.postData(this.userDetails, 'gettransaction').then((result) =>{
      this.responseData2 = result;

      if(this.responseData2.transData){
        this.dataset2 = this.responseData2.transData;
        

        console.log(this.dataset2);
        
      }
      else
      {
        console.log("Transaction History does not extis");
        //this.navCtrl.setRoot( DeladdressPage );
      }
     
      }, (err) =>{
        console.log("failed to get transaction detailsDetails");
        this.responseData2 = err;
        console.log(this.responseData2);
        console.log(this.responseData2.error.text);
        });
  }
  addMoneyInwallet()
  {
    this.navCtrl.push(AddmoneyPage, {
      balancedata: this.dataset
    });
  }


  gotologin()
  {
    this.navCtrl.push(LoginPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

}
