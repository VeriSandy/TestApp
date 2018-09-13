import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OrderPage } from '../pages/order/order';
import { WalletPage } from '../pages/wallet/wallet';
import { SchedulerPage } from '../pages/scheduler/scheduler';
import { MenuPage } from '../pages/menu/menu';
import { WaterPage } from '../pages/water/water';
import { JuicePage } from '../pages/juice/juice';
import { MilkPage } from '../pages/milk/milk';
import { BakeryPage } from '../pages/bakery/bakery';
import { LoginPage } from '../pages/login/login';
import { CartPage } from '../pages/cart/cart';
import { OffersPage } from '../pages/offers/offers';
import { FaqPage } from '../pages/faq/faq';
import { DellocPage } from '../pages/delloc/delloc';
import { DeladdressPage } from '../pages/deladdress/deladdress';
import { DetailwaterPage } from '../pages/detailwater/detailwater';
import { ProductdetailsPage } from '../pages/productdetails/productdetails';
import { PaymentPage } from '../pages/payment/payment';
import { OtpenterPage } from '../pages/otpenter/otpenter';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { CalendarModule } from "ion2-calendar";
import {DatePipe} from '@angular/common';
import { EdtaddressPage } from '../pages/edtaddress/edtaddress';
import { AddmoneyPage } from '../pages/addmoney/addmoney';




@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    OrderPage,
    WalletPage,
    SchedulerPage,
    MenuPage,
    WaterPage,
    JuicePage,
    MilkPage,
    BakeryPage,
    LoginPage,
    CartPage,
    OffersPage,
    FaqPage,
    DellocPage,
    DeladdressPage,
    DetailwaterPage,
    ProductdetailsPage,
    PaymentPage,
    OtpenterPage,
    EdtaddressPage,
    AddmoneyPage
  ],
  imports: [
    BrowserModule, HttpModule, HttpClientModule,FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    OrderPage,
    WalletPage,
    SchedulerPage,
    MenuPage,
    WaterPage,
    JuicePage,
    MilkPage,
    BakeryPage,
    LoginPage,
    CartPage,
    OffersPage,
    FaqPage,
    DellocPage,
    DeladdressPage,
    DetailwaterPage,
    ProductdetailsPage,
    PaymentPage,
    OtpenterPage,
    EdtaddressPage,
    AddmoneyPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    HttpClient,
    DatePipe
  ]
})
export class AppModule {}
