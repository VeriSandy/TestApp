import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { ProductdetailsPage } from '../productdetails/productdetails';

/**
 * Generated class for the BakeryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bakery',
  templateUrl: 'bakery.html',
})
export class BakeryPage {
  public responseData: any;
  public dataset: any;
  
  constructor(public navCtrl: NavController,public authSerive: AuthServiceProvider) {

  this.bakeproductdetail();
  }
  
  bakeproductdetail()
  {
    this.authSerive.getData('bakeproduct').then((result) =>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData.bakeProduct){
        this.dataset = this.responseData.bakeProduct;
        console.log(this.dataset);
      }
      console.log("success in bakeproductdetail");
      
    }, (err) =>{
      this.responseData = err;
      console.log(this.responseData);
      console.log("failed in bakeproductdetail");
    });
  }
  viewdetails(item)
  {
   this.navCtrl.push(ProductdetailsPage, {
     item:item
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BakeryPage');
  }

}
