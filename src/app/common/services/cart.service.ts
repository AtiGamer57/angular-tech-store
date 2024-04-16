import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  collectionName = 'Carts';
  cart?: Cart;

  constructor(private afs: AngularFirestore) { }

  createCart(cart: Cart) {
    return this.afs.collection<Cart>(this.collectionName).doc(cart.uid).set(cart);
  }

  addItemToCart(productId: string) {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const uid = JSON.parse(user).uid as string;
    this.getCart();
    if (!this.cart) {
      return;
    }
    for (let i = 0; i < this.cart.items.length; i++){
      if (this.cart.items[i].itemid == productId) {
        this.cart.items[i].count += 1;
        this.afs.collection(this.collectionName).doc(uid).update(this.cart);
        return; 
      }
    }
    let cartItem: CartItem = {
      itemid: productId,
      count: 1
    }
    this.cart.items.push(cartItem);
    this.updateCart(this.cart, uid);
    console.log('new item has added to cart');
  }

  updateCart(cart: Cart, uid: string) {
    this.afs.collection(this.collectionName).doc(uid).update(cart);
  }

  getCart() {
    const user = localStorage.getItem('user');
    if (user) {
      const uid = JSON.parse(user).uid as string;
      const docRef = this.afs.collection(this.collectionName).doc(uid);
      this.afs.doc<Cart>(`Carts/${uid}`).valueChanges().subscribe(cart => {
        this.cart = cart;
      });
    }
  }
}
