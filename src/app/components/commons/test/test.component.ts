import { Component, OnInit, NgZone } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SocialLoginService, Provider } from 'ng8-social-login';



import { Router } from '@angular/router';
import { HomeService } from '../../../modules/home/service/home.service';

// import { UserService } from './user.service';
// import { UserModel } from './user.model';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private HomeService: HomeService,
    private router: Router,
    // private UserService: UserService,
    private ngZone: NgZone,
    private socicalLogin: SocialLoginService, ) { }

  products: any[];
  myControl = new FormControl();
  filterProduct: any;
  cartCount: number = 0;
  // selectedFile: ImageSnippet;

  listEmail: string[];

  imgBase64: string = '';
  fullName: string;
  email: string;
  pwd: string;
  confPwd: string;
  phone: number;
  birthDay: string;
  address: string;

  currentUser: any;

  accountName: string = '';

  getAllProduct() {
    this.HomeService.getAllProduct().subscribe(res => {
      this.products = JSON.parse(JSON.stringify(res)).data;
      console.log(this.products);
    }, err => {

    }, () => {
      this.filterProduct = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value) )
      );
    });
  }

  private _filter(value: any): any {
    const filterValue = value.toLowerCase();
    return this.products.filter(prod =>
      prod.name.toLowerCase().includes(filterValue));
    }


  ngOnInit() {
    this.getAllProduct();
   
  }

}
