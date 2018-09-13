import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MilkPage } from './milk';

@NgModule({
  declarations: [
    MilkPage,
  ],
  imports: [
    IonicPageModule.forChild(MilkPage),
  ],
})
export class MilkPageModule {}
