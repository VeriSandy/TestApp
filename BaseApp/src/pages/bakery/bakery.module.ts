import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BakeryPage } from './bakery';

@NgModule({
  declarations: [
    BakeryPage,
  ],
  imports: [
    IonicPageModule.forChild(BakeryPage),
  ],
})
export class BakeryPageModule {}
