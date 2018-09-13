import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { WalletPage } from '../wallet/wallet';

/**
 * Generated class for the AddmoneyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addmoney',
  templateUrl: 'addmoney.html',
})
export class AddmoneyPage {
  main_balance: string;
  balance:any;
  sec_deposit:any;
  planner_balance:any;
  public responseData: any;
  public dataset: any;
  public amount_add:any;
  

  walletdetails =
  {
    "MobileNO":"",
    "Token":"",
    "Transno":"",
    "Paidfrm":"",
    "Paidat":"",
    "Orderid":"",
    "Trans_type":"",
    "Added":"",
    "Deducted":" ",
    "flag":"1",
    "Trans_sign":"",
    "Trans_detail":""
   
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider) {
      this.balance= navParams.get('balancedata');
      this.main_balance=this.balance.MAIN_BALANCE;
      this.sec_deposit=this.balance.SECURITY_DEPOSIT;
      this.planner_balance=this.balance.PLANNER_BALANCE;

     // this.main_balance=this.dataset.MAIN_BALANCE;
       // this.planner_balance=this.dataset.PLANNER_BALANCE;
        //this.sec_deposit=this.dataset.SECURITY_DEPOSIT;
      console.log(this.balance);
  }
  addhundred()
  {
   this.amount_add=100;
  }
  addtwohundred()
  {
    this.amount_add=200;
  }
addfivehundred()
{
  this.amount_add=500;
}
  AddMoney()
  {
      this.walletdetails.MobileNO = localStorage.getItem('GlobalContactNo');
      this.walletdetails.Token=localStorage.getItem('GlobalToken');
      this.walletdetails.Transno = "12312";
      this.walletdetails.Paidfrm = "From icici bank";
      this.walletdetails.Paidat = "Added to Daily Wallet";
      this.walletdetails.Orderid = "101";
      this.walletdetails.Trans_type="ADDED";
      this.walletdetails.Added = this.amount_add;
      this.walletdetails.Deducted="0";
      this.walletdetails.flag = "1";
      this.walletdetails.Trans_sign = "+";
      this.walletdetails.Trans_detail="Testing";

     this.authService.postData(this.walletdetails, 'addmoneytranswallet').then((result) =>{
      this.responseData = result;
        
      console.log("success in Adding Money");
      this.navCtrl.setRoot(WalletPage);
         
        },(err) =>{
          this.responseData = err;
          console.log(this.responseData);
          alert('OOPS!! Opertaion Failed,try again later');
          this.navCtrl.pop();
          console.log("Money is not added due to ntwork error");
        });
      

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddmoneyPage');
  }

}
