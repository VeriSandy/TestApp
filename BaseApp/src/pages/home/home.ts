import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WaterPage } from '../water/water';
import { MilkPage } from '../milk/milk';
import { JuicePage } from '../juice/juice';
import { BakeryPage } from '../bakery/bakery';
import { DellocPage } from '../delloc/delloc';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  onInput()
  {
    this.navCtrl.push(DellocPage);
  }
  openwater()
  {
    this.navCtrl.push(WaterPage);
  }
  openjuice()
  {
    this.navCtrl.push(JuicePage);
  }
  openmilk()
  {
    this.navCtrl.push(MilkPage);
  }
  openbakery()
  {
    this.navCtrl.push(BakeryPage);
  }

}
