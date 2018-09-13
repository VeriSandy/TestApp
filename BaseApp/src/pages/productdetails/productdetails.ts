import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentPage } from '../payment/payment';

/**
 * Generated class for the ProductdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetails',
  templateUrl: 'productdetails.html',
})
export class ProductdetailsPage {
  data: any;
  private currentNumber = 1;
  constructor(public navCtrl: NavController, public params: NavParams) {
    this.data = params.get('item');
  }
  increment() {
    this.currentNumber++;
  }
  
  decrement() {
    this.currentNumber--;
    if (this.currentNumber < 1)
    this.currentNumber = 1;
  }
  gotopayment(data)
  {
    this.navCtrl.push(PaymentPage, {
      item:data
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailsPage');
  }

}
