import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  collectionName = 'Products';
  private productCollection: AngularFirestoreCollection<Product>;
  

  constructor(private afs: AngularFirestore) {
    this.productCollection = afs.collection<Product>(this.collectionName);
  }

  createProduct(product: Product) {
    return this.afs.collection<Product>(this.collectionName).add(product);
  }

  createProductWithId(product: Product) {
    return this.afs.collection<Product>(this.collectionName).doc(product.id).set(product);
  }

  listAllProducts() {
    return this.afs.collection<Product>(this.collectionName).valueChanges();
  }

  async getProductById(id: string) {
    const querySnapshot = await this.productCollection.ref
      .where('id', '==', id)
      .get();

    if (querySnapshot.empty) {
      return;
    }

    return querySnapshot.docs.at(0)?.data();
  }
}
