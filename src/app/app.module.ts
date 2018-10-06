import { APP_INITIALIZER, NgModule } from '@angular/core';
import { LocalStorageModule, LocalStorageService } from 'angular-2-local-storage';
import { Transition, UIRouterModule, UIView } from "@uirouter/angular";
import { cartState, catalogState, itemByIDState } from './config/router.states';

import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from './cart.component'
import { CartService } from './services/cart.service';
import { CatalogComponent } from './catalog.component'
import { CatalogItemComponent } from './catalog-item.component'
import { CatalogService } from './services/catalog.service';
import { Config } from './config/app.config';
import { CountDownDirective } from "./directives/countdown.directive";
import { FilterPipe } from '../app/pipes/filterBy.pipe'
import { HttpModule } from '@angular/http';
import { uiRouterConfigFn } from "./config/router.config";

let INITIAL_STATES = [catalogState, itemByIDState, cartState];
let INITIAL_COMPONENTS = [CatalogComponent, CatalogItemComponent, AppComponent, CartComponent, CountDownDirective, FilterPipe];

export function initConfig(config: Config) {
  return () => config.load();
}

@NgModule({
  declarations: [
    INITIAL_COMPONENTS
  ],
  imports: [
    BrowserModule,
    HttpModule,
    UIRouterModule.forRoot({
      states: INITIAL_STATES,
      useHash: true,
      config: uiRouterConfigFn
    }),
    LocalStorageModule.withConfig({
      prefix: 'AlsoRann',
      storageType: 'localStorage'
    })
  ],
  exports: [
    CountDownDirective
  ],
  providers: [
    CatalogService,
    CartService,
    LocalStorageService,
    Config,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [Config, HttpModule],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
