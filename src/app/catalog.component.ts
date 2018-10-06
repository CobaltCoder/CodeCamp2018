import { Component, OnInit } from '@angular/core';

import { CatalogItem } from './core/catalog';
import { CatalogService } from '../app/services/catalog.service';
import { FilterPipe } from '../app/pipes/filterBy.pipe'

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./app.component.css']
})
export class CatalogComponent implements OnInit {
  public catalogItems: Array<CatalogItem> = new Array<CatalogItem>();;

  constructor(public catalogService: CatalogService) { }
  
   ngOnInit(){
     this.getCatalogItems();
   }

   getCatalogItems(): void{
    this.catalogItems = this.catalogService.getCatalogItems();
   }

   test(data){
     this.catalogItems = data;
     console.log(data);
   }
}
