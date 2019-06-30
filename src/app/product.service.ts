import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  form;

  constructor(private db: AngularFirestore) { }

  create(product) {
      return this.db
            .collection('/products')
            .add(product)
    }
    

  getAll() {
    return this.db.collection('/products').snapshotChanges();
    }

  // WRITE A get(productId) method

  //update(productId, product) {
  //
  //} WRITE AN UPDATE METHOD

  //delete() {
    
  //} WRITE DELETE METHOD

}
