import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { WalletPage } from '../wallet/wallet';
import { SchedulerPage } from '../scheduler/scheduler';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CartPage;
  tab3Root = WalletPage;
  tab4Root = SchedulerPage;
  tab5Root = MenuPage;

  constructor() {

  }
}
