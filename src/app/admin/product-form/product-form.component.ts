import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories: any = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService, 
    private productService: ProductService) {
  }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
    });
  }

  save(product) { 
  this.productService.create(product)
      .then(res => {
          console.log("Success");
      });

  this.router.navigate(['/admin/products']);
  }



}
