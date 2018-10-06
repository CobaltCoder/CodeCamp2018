import { Component, OnInit } from '@angular/core';

import { CartService } from '../app/services/cart.service';
import { CatalogItem } from './core/catalog';
import { CatalogService } from '../app/services/catalog.service'

@Component({
  selector: 'cart-detail',
  templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {
  test: CatalogItem[];

  constructor(public catalogService: CatalogService, public cartService: CartService) {
  }

  ngOnInit() {
    let test = this.cartService._catalogItems;
  }

  submit() {
      alert('Submitted. Hooray!')
  }

  removeFromCart(ci: CatalogItem): void {
    this.cartService.removeFromCart(ci);
  }
}
