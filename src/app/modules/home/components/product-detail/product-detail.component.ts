import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private HomeService : HomeService
  ) { }

  productId : any;
  product : any;


    getProductByid(){
      let data = {
        id : +this.productId
      };

      this.HomeService.getProductByid(this.productId, data).subscribe(
        res => {
          this.product = JSON.parse(JSON.stringify(res)).data;
          console.log(this.product);
        }
      );
    }


  ngOnInit() {
    this.productId = window.location.href.split('/').pop();
    this.getProductByid();
 
  }

}
