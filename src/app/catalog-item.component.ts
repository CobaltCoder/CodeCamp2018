import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { CartService } from '../app/services/cart.service';
import { CatalogItem } from './core/catalog';
import { CatalogService } from '../app/services/catalog.service';
import { Config } from './config/app.config';
import { FilterPipe } from '../app/pipes/filterBy.pipe'

@Component({
    selector: 'catalog',
    templateUrl: './catalog-item.component.html',
    styleUrls: ['./app.component.css']
})
export class CatalogItemComponent implements OnInit {
    @Input() catalogItem: CatalogItem;
    private label: string

    constructor(private catalogService: CatalogService, private cartService: CartService, private config: Config) {
        this.label = this.config.get('ProductLabel');
    }

    ngOnInit() {
        console.log(this.catalogItem.id);
    }

    addToCart(): void {
        this.cartService.addtoCart(this.catalogItem, false);
    }
}
