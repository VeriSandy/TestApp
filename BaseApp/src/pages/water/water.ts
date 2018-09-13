import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { DetailwaterPage } from '../detailwater/detailwater';
import { PaymentPage } from '../payment/payment';

@IonicPage()
@Component({
  selector: 'page-water',
  templateUrl: 'water.html',
})
export class WaterPage {

    public responseData: any;
    public dataset: any;
    public currenthour:any;
    public tomorrow:any;
    public currentDate:any;
    public tempdate:any;
   // public currentDate: String;
public chosenDate: String;
    
    constructor(public navCtrl: NavController,public authSerive: AuthServiceProvider) {

    this.showmydetail();
    this.currentDate = (new Date()).toISOString();
    this.tempdate = new Date().getTime() + 50;
    console.log("tempdate " + this.tempdate);
  this.chosenDate = this.currentDate;
  }

  showmydetail(){
   this.authSerive.getData('waterproduct').then((result) =>{
    this.responseData = result;
    console.log(this.responseData);
    if(this.responseData.waterProduct){
      this.dataset = this.responseData.waterProduct;
      console.log(this.dataset);
    }
    console.log("success in showmydetail");
  }, (err) =>{
     this.responseData = err;
    console.log(this.responseData);
    console.log("failed in showmydetail");
  });
  //this.navCtrl.push(TabsPage);*/
  }
  viewdetails(item)
  {
   this.navCtrl.push(DetailwaterPage, {
     item:item
    });
  }
  gotopayment(item)
  {
    //this.navCtrl.push(PaymentPage, {
    //  item:item
   //  });
   
    this.currenthour = new Date().getHours();
   // this.currentDate = new Date();

    //this.tomorrow = this.currentDate +1;
    //console.log(this.tomorrow);
    if ( this.currenthour > 22 || this.currenthour < 8 )
    {
      alert("We take orders till 9:59 PM. We will resume our service at 8:00 AM in morning. For more information please check FAQs.")
    }
    else
    {
      this.navCtrl.push(PaymentPage, {
          item:item
        });
    }
    
  }
}
