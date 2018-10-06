import { Headers, Http, HttpModule, RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Inject, Injectable, NgModule } from "@angular/core";

import { CatalogItem } from './../core/catalog';
import { Config } from '../config/app.config';
import { LocalStorageService } from 'angular-2-local-storage';

//import { EIG, Finishing, PaperColor, PaperCover, PaperSize, PaperType, Press, PrintInkColor, PrintPaperSide, XFormsOrderType } from '../core/options'
@NgModule({
    imports: [
        HttpModule,
        Http
    ],
    providers: [CartService]
})

@Injectable()
export class CartService {
    _baseURL: string;
    public _catalogItems: Array<CatalogItem> = new Array<CatalogItem>();

    constructor(private localStorageService: LocalStorageService, private http: Http, private config: Config) {
        this._catalogItems = this.localStorageService.get("CatalogItems");
    }

    initData() {
        this._baseURL = this.config.get('baseURL');
        this._catalogItems = new Array<CatalogItem>();
    }

    public addtoCart(catalogItem: CatalogItem, updating: boolean): void {
        this._catalogItems.push(catalogItem);

        this.localStorageService.set("CartItems", this._catalogItems);
    }

    public removeFromCart(ci: CatalogItem): void {
        var index = this._catalogItems.indexOf(ci, 0);

        if (index > -1) {
            this._catalogItems.splice(index, 1);
        }

        this.localStorageService.set("Cart", this._catalogItems);
    }

    get TotalCount(): number {
        let count: number = 0;

        count += this._catalogItems.length

        return count;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}