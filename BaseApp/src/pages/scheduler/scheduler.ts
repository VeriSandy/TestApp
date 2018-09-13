import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from 'ion2-calendar';
//import { open } from 'fs';

/**
 * Generated class for the SchedulerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scheduler',
  templateUrl: 'scheduler.html',
})
export class SchedulerPage {
  dateMulti: string[];
  type: 'string';
  //optionsMulti: CalendarComponentOptions = {pickMode: 'multi'};

  constructor(public navCtrl: NavController, public navParams: NavParams,private modalCtrl: ModalController) {
    this.openCalendar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulerPage');
  }
  openCalendar() {
    const options = {
      pickMode: 'multi',
      title: 'MULTI'
    };

    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult[], type: string) => {
      console.log(date);
    })
  }

}
