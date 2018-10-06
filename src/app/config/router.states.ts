import { Transition, UIRouterModule, UIView } from "@uirouter/angular";

import { CartComponent } from '../cart.component';
import { CatalogComponent } from '../catalog.component';
import { CatalogItemComponent } from '../catalog-item.component';
import { CatalogService } from '../services/catalog.service';

export const itemByIDState = {
    name: 'CatalogItemByID',
    url: '/CatalogItem/:CIId',
    component: CatalogItemComponent,
    resolve: [
      {
        token: 'catalogItem',
        deps: [Transition, CatalogService],
        resolveFn: (trans: Transition, catalogSvc: CatalogService) => catalogSvc.getCatalogItem(trans.params().CIId)
      }
    ]
  }

export const catalogState = {
    name: 'Catalog',
    url: '/Catalog',
    component: CatalogComponent,
};

export const cartState = {
  name: 'Cart',
  url: '/Cart',
  component: CartComponent,
};
