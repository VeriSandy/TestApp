import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { ProductdetailsPage } from '../productdetails/productdetails';

/**
 * Generated class for the MilkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-milk',
  templateUrl: 'milk.html',
})
export class MilkPage {
  public responseData: any;
  public dataset: any;
  
  constructor(public navCtrl: NavController,public authSerive: AuthServiceProvider) {

  this.milkproductdetail();
  }
  
  milkproductdetail()
  {
    this.authSerive.getData('milkproduct').then((result) =>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData.milkProduct){
        this.dataset = this.responseData.milkProduct;
        console.log(this.dataset);
      }
      console.log("success in milkproductdetail");
      
    }, (err) =>{
      this.responseData = err;
      console.log(this.responseData);
      console.log("failed in milkproductdetail");
    });
  }
  viewdetails(item)
  {
   this.navCtrl.push(ProductdetailsPage, {
     item:item
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MilkPage');
  }

}
