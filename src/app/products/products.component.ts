import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  list: any = [];
  categories: any = [];
  category: string;
  filteredProducts: Product[] = [];
  cart;

  @Input('shopping-cart') shoppingCart;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private categoryService: CategoryService,
    private shoppingCartService: ShoppingCartService,
    private db: AngularFirestore
    ) {

    }



  async ngOnInit() {
    this.getProductList();
    this.getCategoryList();
    let cart = await this.getCart();
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.list.title];
    return item ? item.quantity : 0;
  }

  create() {
    return this.db
            .collection('/shopping-carts')
            .add({
              dateCreated: new Date().getTime()
            });
    }

    async getCart() {  
      let cartId = await this.getOrCreateCartId();  
      return this.db.collection('/shopping-carts/'+ cartId);
    }

    private async getOrCreateCartId(){
      let cartId=localStorage.getItem('cartId');
      if (cartId) return cartId;
      
        let result=await this.create();
        localStorage.setItem('cartId', result.id);
        return result.id;
    }
  
  private getItem(cartId, productId) {
    return this.db.collection('/shopping-carts/').doc(cartId + '/items/' + productId);
  }
 
async addToCart(product: Product){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.title);
    
    item$.snapshotChanges().pipe(take(1)).subscribe((item:any) => {
 
      console.log(item.payload.data());
      
      
      if(!item.payload.exists){
        item$.set({
          product: product, 
          quantity: 1
        });
      } else {
        item$.update({
          quantity: item.payload.data().quantity + 1
        });
      }
    });
        
  }

  getProductList() {
    this.productService.getAll().subscribe(data => {
      this.list = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ? 
          this.list.filter(p => p.category === this.category) :
          this.list;
      });

    });
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

}
