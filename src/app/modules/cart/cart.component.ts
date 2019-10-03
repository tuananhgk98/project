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
 
        this.total = this.cart.map(i => i.price*i.quantity).reduce( (a,b) => a+b,0);
    }

    updateQty(e) {
        let id = e.srcElement.attributes.id.value;
        console.log(e);
        let val = e.srcElement.value;
        let index = this.cart.findIndex(function(i){
            return i.id == id;
        });
        if(index !== -1){
            this.cart[index].quantity = val;
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
        this.getCartInfo();
    }

    removeItem(id){
        let index = this.cart.findIndex(function(i){
            return i.id == id;
        });
        console.log(index);
        this.cart.splice(index,1);
        localStorage.setItem('cart',JSON.stringify(this.cart));
        this.getCartInfo();
    }

    ngOnInit() {
        this.getCartInfo();
    }

}

//asd