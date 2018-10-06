import { Component, OnInit } from '@angular/core';

import { CatalogService } from './services/catalog.service'
import { CartService } from './services/cart.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public catalogService: CatalogService, public cartService: CartService) { }

  ngOnInit(){
    this.catalogService.initData();
    this.cartService.initData();
  }
}
