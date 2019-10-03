import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private HomeService: HomeService
  ) { }

  productId: any;
  product: any;
  cart: any;
  cartArray: any;
  qty = 1;

  getCartInfo() {
    this.cart = localStorage.getItem('cart');
    this.cartArray = JSON.parse(this.cart);
  }

  getProductByid() {
    let data = {
      id: this.productId
    };

    this.HomeService.getProductByid(this.productId, data).subscribe(
      res => {
        this.product = JSON.parse(JSON.stringify(res)).data;
        console.log(this.product);
      }
    );
  }

  addToCart() {
    this.getCartInfo();
    let data = {
      id: this.product._id,
      name: this.product.name,
      imageURL: this.product.imageURL,
      price: this.product.price,
      quantity: this.qty
    };


    if (!this.cart || this.cartArray.length < 1) {
      this.cartArray = [];
      this.cartArray.push(data);
      localStorage.setItem('cart', JSON.stringify(this.cartArray));
    }

    else {
      let index = this.cartArray.findIndex(function (i) {
        return i.id == data.id;
      });
      if (index !== -1) {
        this.cartArray[index].quantity += this.qty;
        localStorage.setItem('cart', JSON.stringify(this.cartArray));
      }
      else {
        this.cartArray.push(data);
        localStorage.setItem('cart', JSON.stringify(this.cartArray));
      }
    }

  }

  ngOnInit() {
    this.productId = window.location.href.split('/').pop();
    this.getProductByid();
    this.getCartInfo();

  }

}
