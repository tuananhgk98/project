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
        private router: Router) { }

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
                alert(`You only can buy ${JSON.parse(JSON.stringify(res)).data.name} up to ${JSON.parse(JSON.stringify(res)).data.quantity}`);
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
        if (JSON.parse(localStorage.getItem('cart')).length == 1) {
            localStorage.removeItem('cart');
            this.getCartInfo();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate([`/cart`]));
        } else {
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
    }

    findCode() {
        if (localStorage.getItem('user') == null) {
            let cf = confirm(`This feature requires login, do you want to continue??
            `);
            if (cf == true) document.getElementById('toggleSigninModal').click();
        }
        else {
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
            });
        }

    }

    clearCart() {
        let cf = confirm('Are you sure you want to delete cart?');
        if (cf == true) {
            localStorage.removeItem('cart');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
                this.router.navigate([`/cart`]));
        }
    }

    payment(){
        if(!localStorage.getItem('user')){
            document.getElementById('toggleSigninModal').click();
        }
    }

    ngOnInit() {
        this.getCartInfo();
    }

}

//asd