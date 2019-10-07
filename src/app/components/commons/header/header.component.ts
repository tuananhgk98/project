import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HomeService } from '../../../modules/home/service/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private HomeService: HomeService,
    private router: Router) { }

  products: any[];
  myControl = new FormControl();
  filterProduct: Observable<string[]>;
  cartCount: number;


  getAllProduct() {
    this.HomeService.getAllProduct().subscribe(res => {
      this.products = JSON.parse(JSON.stringify(res)).data;
      console.log(this.products);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.products.filter(prod =>
      prod.name.toLowerCase().includes(filterValue));
  }

  ngOnInit() {

    this.getAllProduct();
    this.filterProduct = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.cartCount = JSON.parse(localStorage.getItem('cart')).length;
  }

  ridirectToDetail(id) {
    this.router.navigate([`/${id}`]);
  }

}
