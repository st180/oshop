import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFirestore) { }



  getCart(cartId: string) {
    return this.db.collection('/shopping-carts' + cartId);
  }



  create() {
    return this.db
            .collection('/shopping-carts')
            .add({
              dateCreated: new Date().getTime()
            });
    }

}
