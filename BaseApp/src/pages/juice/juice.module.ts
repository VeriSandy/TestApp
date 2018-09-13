import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JuicePage } from './juice';

@NgModule({
  declarations: [
    JuicePage,
  ],
  imports: [
    IonicPageModule.forChild(JuicePage),
  ],
})
export class JuicePageModule {}
