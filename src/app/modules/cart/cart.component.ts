import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { HomeService } from '../home/service/home.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: []
})
export class CartComponent implements OnInit {


    constructor(private service: CartService,
        private HomeService: HomeService,
        private router : Router) { }

    cart: any[];
    total: number;
    discountCode: string = '';
    discount: number = 0;


    getCartInfo() {
        this.cart = JSON.parse(localStorage.getItem('cart'));

        this.total = this.cart.map(i => i.price * i.quantity).reduce((a, b) => a + b, 0);
    }

    updateQty(e) {
        let id = e.srcElement.attributes.id.value;
        console.log(e);
        let val = +e.srcElement.value;
        let dataProduct = {
            id: id
        };

        this.HomeService.getProductByid(id, dataProduct).subscribe(res => {
            if (val > JSON.parse(JSON.stringify(res)).data.quantity) {
                alert(`You only can only buy ${JSON.parse(JSON.stringify(res)).data.name} up to ${JSON.parse(JSON.stringify(res)).data.quantity}`);
                let index = this.cart.findIndex(function (i) {
                    return i.id == id;
                });
                if (index !== -1) {
                    this.cart[index].quantity = JSON.parse(JSON.stringify(res)).data.quantity;
                    localStorage.setItem('cart', JSON.stringify(this.cart));
                }
                this.getCartInfo();

            }
        });
        let index = this.cart.findIndex(function (i) {
            return i.id == id;
        });
        if (index !== -1) {
            this.cart[index].quantity = val;
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
        this.getCartInfo();
    }

    removeItem(id) {
        let index = this.cart.findIndex(function (i) {
            return i.id == id;
        });
        console.log(index);
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.getCartInfo();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate([`/cart`]));
    }

    findCode() {
        let data = {
            id: this.discountCode
        };
        console.log(data);
        this.service.getCode(data).subscribe(res => {
            if (JSON.parse(JSON.stringify(res)).OK == true) {
                this.discount = JSON.parse(JSON.stringify(res)).data.discount;
                this.total = this.total - (this.total * this.discount) / 100;
                alert(`Use discount code successful, you get ${this.discount} percent off`);
            }
        }, err => {
            console.log(err);
            alert('Your code is not valid');
        })
    }

    ngOnInit() {
        this.getCartInfo();
    }

}

//asd