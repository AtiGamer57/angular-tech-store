import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../common/services/product.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CartService } from '../../common/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products?: Array<Product>;

  constructor(private productService: ProductService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.listAllProducts().subscribe((data: Array<Product>) => {
      this.products = data;
    });
    this.cartService.getCart();
  }


  addItemToCard(id: string) {
    if (localStorage.getItem('user')){
      this.cartService.addItemToCart(id);
    } else {
      this.router.navigateByUrl('/login')
    }
  }

}
