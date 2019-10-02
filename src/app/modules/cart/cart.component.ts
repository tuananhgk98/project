import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: []
})
export class CartComponent implements OnInit {

    constructor() { }

    cart: any[];
    total : number;


    getCartInfo() {
        this.cart = JSON.parse(localStorage.getItem('cart'));

    }

    updateQty(e) {
        let id = +e.srcElement.attributes.id.value;
        let val = +e.srcElement.value;
        let index = this.cart.findIndex(function(i){
            return i.id == id;
        });
        if(index !== -1){
            this.cart[index].quantity = val;
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }

    ngOnInit() {
        this.getCartInfo();
    }

}