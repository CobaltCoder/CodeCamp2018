import { Headers, Http, HttpModule, RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Inject, Injectable, NgModule } from "@angular/core";

import { CatalogItem } from './../core/catalog';
import { Config } from '../config/app.config';

const _catalogItems: CatalogItem[] = [
  {
    id: "0",
    name: "Ammonia",
    desc: "Ammonia with bleach, a winning combination",
    featured: "0",
    image: "assets/images/Ammonia.jpg",
    price: "10.57"
  },
  {
    id: "1",
    name: "Boxes",
    desc: "Various boxes, for shipping stuff",
    featured: "1",
    image: "assets/images/boxes.jpg",
    price: "9.82"
  },
  {
    id: "2",
    name: "Cereals",
    desc: "A balanced part of a nutitious breakfast",
    featured: "0",
    image: "assets/images/cereals.jpg",
    price: "23.68"
  },
  {
    id: "3",
    name: "Cheeses",
    desc: "A balanced part of a nutritious lunch",
    featured: "0",
    image: "assets/images/cheeses.jpg",
    price: "567.21"
  },
  {
    id: "4",
    name: "Cleaners",
    desc: "Your house is filthy, clean it up with these cleaners",
    featured: "0",
    image: "assets/images/cleaners.jpg",
    price: "1.24"
  },
  {
    id: "5",
    name: "Fruits and Nuts",
    desc: "Nuts and fruits",
    featured: "1",
    image: "assets/images/fruitsandnuts.jpg",
    price: "876.13"
  },
  {
    id: "6",
    name: "Makeup",
    desc: "Be yourself by looking like someone else",
    featured: "1",
    image: "assets/images/makeup.jpg",
    price: "13.69"
  },
  {
    id: "7",
    name: "Pencils",
    desc: "Draw colorful things",
    featured: "1",
    image: "assets/images/pencils.jpg",
    price: "18.02"
  }
];

@NgModule({
  imports: [
    HttpModule,
    Http
  ],
  providers: [CatalogService]
})

@Injectable()
export class CatalogService {
  private catalogItem: CatalogItem;
  public catalogItems: Array<CatalogItem>;
  myHeaders: Headers = new Headers();
  opt = new RequestOptions();
  _baseURL: string;
  _currentContactURL: string;

  constructor(private http: Http, private config: Config) {
    this.myHeaders.set('Content-Type', 'application/json')
    this.myHeaders.append('Accept', 'application/json')

    this.opt = new RequestOptions({
      headers: this.myHeaders
    })
  }

  initData() {
    // this._baseURL = this.config.get('baseURL');
    // this._currentContactURL = this.config.get('currentContactURL');
  }

  getCatalogItems(): Array<CatalogItem> {
    return _catalogItems;
  }

  getCatalogItemsJson(): Promise<CatalogItem[]> {
    return this.http.get("/assets/data/catalog.json")
      .toPromise()
      .then(response => response.json().CatalogItems)
      .catch(this.handleError);
  }

  getCatalogItem(id: number): CatalogItem {
    return _catalogItems[id];
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public createGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}