import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { ProductdetailsPage } from '../productdetails/productdetails';
/**
 * Generated class for the JuicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-juice',
  templateUrl: 'juice.html',
})
export class JuicePage {
  public responseData: any;
  public dataset: any;
  
  constructor(public navCtrl: NavController,public authSerive: AuthServiceProvider) {

  this.juiceproductdetail();
  }
  
  juiceproductdetail()
  {
    this.authSerive.getData('juiceproduct').then((result) =>{
      this.responseData = result;
      console.log(this.responseData);
      if(this.responseData.juiceProduct){
        this.dataset = this.responseData.juiceProduct;
        console.log(this.dataset);
      }
      console.log("success in juiceproductdetail");
      
    }, (err) =>{
      this.responseData = err;
      console.log(this.responseData);
      console.log("failed in juiceproductdetail");
    });
  }
  viewdetails(item)
  {
   this.navCtrl.push(ProductdetailsPage, {
     item:item
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad JuicePage');
  }

}
