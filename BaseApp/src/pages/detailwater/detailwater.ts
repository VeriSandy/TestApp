import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';
 
/**
 * Generated class for the DetailwaterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailwater',
  templateUrl: 'detailwater.html',
})
export class DetailwaterPage {
data: any;
  constructor(public navCtrl: NavController, public params: NavParams) {
    this.data = params.get('item');
  }
 
  gotopayment(data)
  {
    this.navCtrl.push(PaymentPage, {
      item:data
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailwaterPage');
  }

}
