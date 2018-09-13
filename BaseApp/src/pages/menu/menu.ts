import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { OrderPage } from '../order/order';
import { OffersPage } from '../offers/offers';
import { ContactPage } from '../contact/contact';
import { FaqPage } from '../faq/faq';
//import { HomePage } from '../home/home';
import { EdtaddressPage } from '../edtaddress/edtaddress';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
phone:any;
address:any;
key:any;
public loggedIn:any;
public loggedoff:any;
ionViewDidEnter()
{
  if(localStorage.getItem('GlobalContactNo')!== null || localStorage.getItem('GlobalToken')!== null)
  {
   this.loggedIn = true;
   this.loggedoff=false;
   this.displayPhone();
  }
  else
  {
   this.loggedIn = false;
   this.loggedoff=true;
  }
}
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App ) {
   
   
    
  }
  displayPhone()
  {
    this.phone=localStorage.getItem('GlobalContactNo');
    this.address=localStorage.getItem('GloabalAddress');
    this.key=localStorage.getItem('GlobalToken');
    console.log(this.phone);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
gotologin()
{
  console.log("load login page");
  this.navCtrl.push( LoginPage );
}
openorders()
{
  this.navCtrl.push(OrderPage);
}
openoffers()
{
  this.navCtrl.push(OffersPage);
}

opencontact()
{
  this.navCtrl.push(ContactPage);
}
openfaq()
{
  this.navCtrl.push(FaqPage);
}
editaddress()
{
this.navCtrl.push(EdtaddressPage);
}
dologout()
{
  localStorage.clear();
  localStorage.removeItem('GlobalToken');
  localStorage.removeItem('GlobalContactNo');
  localStorage.removeItem('Global_Locality');
  localStorage.removeItem('GloabalAddress');
  localStorage.removeItem('Gloabal_Neighbour');
  localStorage.removeItem('Gloabal_Security');
  localStorage.removeItem('Gloabal_FirstDelivery');
  localStorage.removeItem('CacheContactNo');
  localStorage.removeItem('CacheOTP');
  //const root = this.app.getRootNavById('n4');
  //root.popToRoot();
  this.navCtrl.setRoot( TabsPage );
}

}
