import { Component, OnInit } from '@angular/core';
import { CartService } from '../../common/services/cart.service';
import { Cart } from '../../models/cart';
import { Product } from '../../models/product';
import { ProductService } from '../../common/services/product.service';
import { CartItemWithProduct } from '../../models/cartItemWithProduct';
import { AuthService } from '../../common/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../../common/alert/alert.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private productService: ProductService, private auth: AuthService, public dialog: MatDialog) { }
  cart?: Cart;
  itemsInCart: Array<CartItemWithProduct> = [];


  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe(user => {
      if(user)
      this.cartService.getCartById(user?.uid).then(data => {
        this.cart = data;
        if (this.cart) {
          for (let i = 0; i < this.cart?.items.length; i++) {
            let temp: CartItemWithProduct = {
              itemid: this.cart.items[i].itemid,
              count: this.cart.items[i].count,              
            }
            this.productService.getProductById(this.cart.items[i].itemid).then(data => {
              console.log(data);
              temp.product = data;
              this.itemsInCart.push(temp);
            });
          }
        }
      })
    })
  }

  buyEverything(){
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.cartService.emptyCart(user.uid);
    this.openAlertDialog('Successful purchase!');
  }

  emptyCart(){
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.cartService.emptyCart(user.uid);
    this.openAlertDialog('Cart emptied!');
  }

  increaseItem(productId: string){
    const user = JSON.parse(localStorage.getItem('user') as string);
    let asd = this.cartService.addItemToCart(productId, user.uid);
    this.openAlertDialog('Item added!');
  }

  decreaseItem(productId: string){
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.cartService.decreaseItemInCart(productId, user.uid);
    this.openAlertDialog('Item decreased!');
  }

  removeItem(productId: string){
    const user = JSON.parse(localStorage.getItem('user') as string);
    this.cartService.removeItemFromCart(productId, user.uid);
    this.openAlertDialog('Item removed!');
  }

  openAlertDialog(msg: string) {
    this.dialog.open(AlertComponent, {
      width: 'auto',
      minHeight: '100px',
      data: { message: msg }
    });
  }

}
