import { Component, OnInit } from '@angular/core';
import { SubscribeService } from './subscribe.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(private service: SubscribeService) { }


  email: string;

  subscribe(){
    let data = {
      "mail" : this.email,
      "subject" : 'Thanks for subscribe my shop!!!'
    };
    this.service.subscribe(data).subscribe(res => {
      console.log(res);
      alert('subscribe successfuly');
    })
  }

  ngOnInit() {
  }

}
