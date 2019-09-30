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
  getAllProduct() {
    this.HomeService.getAllProduct().subscribe(res => {
      this.products = JSON.parse(JSON.stringify(res)).data;
      console.log(this.products);
    });
  }

  ngOnInit() {
    this.getAllProduct();
  }

}
