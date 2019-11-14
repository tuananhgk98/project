import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private HomeService: HomeService,
    private router: Router) { }

  products: any[];

  cart: any;
  cartArray: any;

  p: Number = 1;
  count: Number = 5;



  getAllProduct() {
    this.HomeService.getAllProduct().subscribe(res => {
      this.products = JSON.parse(JSON.stringify(res)).data;
      this.products.sort( (a, b) => {
        return b.viewCount - a.viewCount;
      } )
    });
  }

  getCartInfo() {
    this.cart = localStorage.getItem('cart');
    this.cartArray = JSON.parse(this.cart);
  }

  addToCart(id, name, imageString, price) {

    var dataProd = {
      id: id
    };

    this.getCartInfo();
    let data = {
      id: id,
      name: name,
      imageString: imageString,
      price: price,
      quantity: 1
    };


    if (!this.cart || this.cartArray.length < 1) {
      this.cartArray = [];
      this.cartArray.push(data);
      localStorage.setItem('cart', JSON.stringify(this.cartArray));
      // alert('buy successful');
      this.router.navigate(['/cart']);
    }

    else {
      let index = this.cartArray.findIndex(function (i) {
        return i.id == data.id;
      });
      if (index !== -1) {
        var currentProd;
        this.HomeService.getProductByid(id, dataProd).subscribe(res => {
          currentProd = JSON.parse(JSON.stringify(res)).data;


          let cartIndex = this.cartArray.findIndex((i) => i.id == currentProd._id);

          if (this.cartArray[cartIndex].quantity >= currentProd.quantity) {
            alert(`you only bougth ${currentProd.name} up to ${currentProd.quantity}, you have bought ${this.cartArray[cartIndex].quantity} `);
          } else {

          }
          this.cartArray[index].quantity = currentProd.quantity;
          localStorage.setItem('cart', JSON.stringify(this.cartArray));

        });

      }
      else {
        this.cartArray.push(data);
        localStorage.setItem('cart', JSON.stringify(this.cartArray));
      }
    }
    this.router.navigate(['/cart']);
  }

  ngOnInit() {
    this.getAllProduct();
    this.getCartInfo();
  }

}
