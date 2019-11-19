import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { CartService } from './cart.service';
import { HomeService } from '../home/service/home.service';
import { Router } from '@angular/router';

declare var google: any;
declare var $: any;


@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;

    options = {
        types: [],
        componentRestrictions: { country: 'VN' }
    }


    constructor(private service: CartService,
        private HomeService: HomeService,
        private router: Router) { }

    currentGPS: any;
    latitude: any;
    longitude: any;
    formattedAddress: any;


    cart: any[];
    total: number;
    discountCode: string = '';
    discount: number = 0;
    address: string;
    name: string;
    email: string;
    phone: any;
    ship: any;

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

    payment() {
        if (!localStorage.getItem('user')) {
            document.getElementById('toggleSigninModal').click();
        }
        else {
            let user = JSON.parse(localStorage.getItem('user'));
            this.name = user.fullName;
            this.email = user.email;
            this.phone = user.phone;
            $('#pay').show(1000);
            $('html, body').animate({
                scrollTop: $("#pay").offset().top
            }, 1000);
        }
    }


    public handleAddressChange(address: any) {
        console.log(address.formatted_address);
        this.address = address.formatted_address;
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address.formatted_address }, function (res) {
            let lattt = res[0].geometry.location.lat();
            let longgg = res[0].geometry.location.lng();
            this.pickerAddressGPS = new google.maps.LatLng(lattt, longgg);
            const home = new google.maps.LatLng(21.0670581, 105.82446570000002);
            const distance = +google.maps.geometry.spherical.computeDistanceBetween(home, this.pickerAddressGPS) / 1000;
            if (distance < 5) {
                this.ship = `${distance.toString().split('').splice(0, 3).join('')}km (free)`;
                console.log(this.ship);
                $('#shipPrice').show(500);
            }
            if (distance > 5 && distance < 15) {
                this.ship = `${distance.toString().split('').splice(0, 3).join('')}km (15000 vnd)`;
                console.log(this.ship);
                $('#shipPrice').show(500);
            }
            if (distance > 15 && distance < 30) {
                this.ship = `${distance.toString().split('').splice(0, 3).join('')}km (30000 vnd)`;
                console.log(this.ship);
                $('#shipPrice').show(500);
            }
            if (distance > 30) {
                alert('Sorry, we just ship within a radius of 30km ');
            }
        });
    }


    getCurrentLocation() {
        if (navigator.geolocation) {
            let geocoder = new google.maps.Geocoder();
            navigator.geolocation.getCurrentPosition(postion => {
                // console.log(postion);
                this.latitude = postion.coords.latitude
                this.longitude = postion.coords.longitude
                let gps = { lat: this.latitude, lng: this.longitude }
                this.currentGPS = { ...gps };
                console.log(this.currentGPS);
                this.currentGPS = new google.maps.LatLng(this.latitude, this.longitude);
                geocoder.geocode({ 'location': gps }, function (res) {
                    this.address = res[0].formatted_address;
                });
            })
        } else {
            console.log('errrrrrr');
        }

    }
    getCurrentAdress() {
        let geocoder = new google.maps.Geocoder();
        let gps = { lat: this.latitude, lng: this.longitude }
        geocoder.geocode({ 'location': gps }, function (res: any) {

        });
    }


    ngOnInit() {
        this.getCartInfo();
    }

}

//asd