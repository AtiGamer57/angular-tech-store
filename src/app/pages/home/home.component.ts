import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../common/services/product.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  firstAd?: Product;
  secondAd?: Array<Product>;
  thirdAd?: Array<Product>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.GetHomeBest().then(data => {
      this.firstAd = data;
    });
    this.productService.GetHomeLaptops().then(data => {
      this.secondAd = data;
    });
    this.productService.GetHomePhones().then(data => {
      this.thirdAd = data;
    });
  }

}
