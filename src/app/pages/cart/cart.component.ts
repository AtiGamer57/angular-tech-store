import { Component, OnInit } from '@angular/core';
import { CartService } from '../../common/services/cart.service';
import { Cart } from '../../models/cart';
import { Product } from '../../models/product';
import { ProductService } from '../../common/services/product.service';
import { CartItemWithProduct } from '../../models/cartItemWithProduct';
import { AuthService } from '../../common/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private productService: ProductService, private auth: AuthService) { }
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
    
  }
}
