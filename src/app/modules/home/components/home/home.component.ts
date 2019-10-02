import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private HomeService: HomeService) { }

  products: any[];

  cart = localStorage.getItem('cart');
  cartArray: any;



  getAllProduct() {
    this.HomeService.getAllProduct().subscribe(res => {
      this.products = JSON.parse(JSON.stringify(res)).data;
      console.log(this.products);
    });
  }


  addToCart(id, name, imageURL, price) {

    let data = {
      id: id,
      name: name,
      imageURL: imageURL,
      price: price,
      quantity: 1
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
        this.cartArray[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(this.cartArray));
      }
      else {
        this.cartArray.push(data);
        localStorage.setItem('cart', JSON.stringify(this.cartArray));
      }
    }

  }

  ngOnInit() {
    this.getAllProduct();
    this.cartArray = JSON.parse(this.cart);

  }

}
