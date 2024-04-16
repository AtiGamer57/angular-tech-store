import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  collectionName = 'Products';

  constructor(private afs: AngularFirestore) { }

  createProduct(product: Product) {
    return this.afs.collection<Product>(this.collectionName).add(product);
  }

  listAllProducts() {
    return this.afs.collection<Product>(this.collectionName).valueChanges();
  }
}
