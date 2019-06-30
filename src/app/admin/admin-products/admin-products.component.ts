import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Observable } from 'rxjs/Observable';
import { DataTableResource } from '@ismatjon/angular-data-table';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products$: Observable<any>;

  list: any = [];

  tableResource: DataTableResource<Product>;

  items: Product[] = [];

  itemCount: number;

  constructor(private productService: ProductService) {
    // this.products$ = this.productService.getAll(); 
   }

  ngOnInit() {
    this.getAll();
  }

  ngOnDestroy() {

  }

  getAll() {
    this.productService.getAll().subscribe(data => {
      this.list = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });

      this.tableResource = new DataTableResource(this.list);
      this.tableResource.query({ offset: 0 }).then(items => this.items = items);
      this.tableResource.count().then(count => this.itemCount = count) ;
    });
  } 

  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then(items => this.items = items);
  }

  /* getAll() {
    this.productService.getAll().subscribe(data => {
      this.list = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
    });
  } */

  filter(query: string) {

  }

}
