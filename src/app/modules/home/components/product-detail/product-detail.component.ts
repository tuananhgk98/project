import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private HomeService: HomeService,
    private router: Router
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

  increeViewCount() {
    let data = {
      viewCount: this.product.viewCount + 1
    };
    console.log(data);
    this.HomeService.increeViewCount(this.product._id, data).subscribe(res => {
      console.log(res);
    });
  }

  getProductByid() {
    let data = {
      id: this.productId
    };

    this.HomeService.getProductByid(this.productId, data).subscribe(
      res => {
        this.product = JSON.parse(JSON.stringify(res)).data;
        console.log(this.product);
        this.increeViewCount();
      }
    );
  }

  addToCart() {
    this.getCartInfo();
    let data = {
      id: this.product._id,
      name: this.product.name,
      imageString: this.product.imageString,
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

        if (this.cartArray[index].quantity == this.product.quantity) {
          alert(`you only can bought ${this.product.name} up to ${this.product.quantity}, you have bought ${this.cartArray[index].quantity}`);
        }
        else {
          this.cartArray[index].quantity += this.qty;
          localStorage.setItem('cart', JSON.stringify(this.cartArray));
          alert('Buy successfully!!');
          this.router.navigate(['/cart']);
        }

      }
      else {
        this.cartArray.push(data);
        localStorage.setItem('cart', JSON.stringify(this.cartArray));
        alert('Buy successfully!!');
        this.router.navigate(['/cart']);
      }
    }


  }

  updateQty() {

    let dataProduct = {
      id: this.product._id,
    };
    let Cart = JSON.parse(localStorage.getItem('cart'));

    this.HomeService.getProductByid(this.product._id, dataProduct).subscribe(res => {
      let index = Cart.findIndex(function (i) {
        return i.id == JSON.parse(JSON.stringify(res)).data._id;
      });
      if (this.qty > Cart[index].quantity) {
        alert(`You only can only buy ${JSON.parse(JSON.stringify(res)).data.name} up to ${JSON.parse(JSON.stringify(res)).data.quantity}, 
you have bought ${Cart[index].quantity}`);

        if (index !== -1) {
          this.qty = this.product.quantity - Cart[index].quantity;
        }
      }
    });

  }

  ngOnInit() {
    this.productId = window.location.href.split('/').pop();
    this.getProductByid();
    this.getCartInfo();



  }

}
