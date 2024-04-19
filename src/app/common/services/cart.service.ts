import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  collectionName = 'Carts';
  cart?: Cart;
  private cartCollection: AngularFirestoreCollection<Cart>;

  constructor(private afs: AngularFirestore) {
    this.cartCollection = afs.collection<Cart>(this.collectionName);
  }

  createCart(cart: Cart) {
    return this.afs.collection<Cart>(this.collectionName).doc(cart.uid).set(cart);
  }

  addItemToCart(productId: string, uid: string) {
    let cart: Cart;
    this.getCartById(uid).then(data => {
      if (data){
        cart = data;
        console.log("cart fount, content: " + cart)
      }

    });
    this.isItemInCart(productId).then(bool => {
      if (bool) {
        for (let i = 0; i < cart.items.length; i++) {
          if (cart.items[i].itemid == productId) {
            cart.items[i].count++;
          }
        }
      } else {
        const item: CartItem = {
          itemid: productId,
          count: 1
        }
        cart.items.push(item);
      }
      this.updateCart(cart, uid);
    })
  }

  removeItemFromCart(productId: string, uid: string) {
    const user = JSON.parse(localStorage.getItem('user') as string);
    let cart: Cart;
    this.getCartById(uid).then(data => {
      if (data)
        cart = data;

      let cutIndex;
      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].itemid == productId) {
          cutIndex = i;
        }
      }
      if (cutIndex) {
        cart.items = cart.items.splice(cutIndex, 1);
        this.updateCart(cart, user.uid);
      }
    });
  }

  updateCart(cart: Cart, uid: string) {
    return this.afs.collection(this.collectionName).doc(uid).update(cart);
  }

  deleteCart(cartId: string) {
    return this.afs.collection(this.collectionName).doc(cartId).delete();
  }

  createEmptyCart(uid: string) {
    const cart: Cart = {
      uid: uid,
      items: []
    }
    return this.createCart(cart);
  }

  emptyCart() {
    const user = localStorage.getItem('user');
    if (user) {
      const uid = JSON.parse(user).uid as string;
      this.deleteCart(uid).then(_ => {
        return this.createEmptyCart(uid);
      });
    }
  }

  async isItemInCart(productId: string) {
    const user = JSON.parse(localStorage.getItem('user') as string);
    const querySnapshot = await this.cartCollection.ref
      .where('uid', '==', user.uid)
      .get();

    if (querySnapshot.empty) {
      return false;
    }

    for (const doc of querySnapshot.docs) {
      const items = doc.data().items || [];
      console.log(items);
      for (const item of items) {
        if (item.itemid === productId) {
          return true;
        }
      }
    }
    return false;
  }

  async getCartById(uid: string) {
    console.log(uid)
    const querySnapshot = await this.cartCollection.ref
      .where('uid', '==', uid)
      .get();

    if (querySnapshot.empty) {
      return;
    }

    return querySnapshot.docs.at(0)?.data();
  }
}
