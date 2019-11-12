import { Component, OnInit, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Router } from '@angular/router';

import { HomeService } from '../../service/home.service';
declare var google: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  constructor(
    public router: Router,
    private HomeService : HomeService
  ) { }

  @ViewChild("placesRef", { static: false }) placesRef: GooglePlaceDirective;

  options = {
    types: [],
    componentRestrictions: { country: 'VN' }
  }

  address: string = '';
  name : string = '';
  email : string = '';
  phone : number ;
  birthday : string;

  public handleAddressChange(address: any) {
    console.log(address.formatted_address);
    this.address = address.formatted_address;
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address.formatted_address }, function (res) {

      let lattt = res[0].geometry.location.lat();
      let longgg = res[0].geometry.location.lng();
      console.log(lattt, longgg);
      this.latitude = lattt;
      this.longitude = longgg;

    });
  }

  latitude: any;
  longitude: any;
  formattedAddress: any;

  getCurrentLocation() {
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      navigator.geolocation.getCurrentPosition(postion => {
        console.log(postion);
        this.latitude = postion.coords.latitude
        this.longitude = postion.coords.longitude
        let gps = { lat: this.latitude, lng: this.longitude }
        geocoder.geocode({ 'location': gps }, function (res) {
          console.log(res[0].formatted_address);
          this.address = res[0].formatted_address;

        })
      })
    } else {
      console.log('errrrrrr');
    }

  }
  getCurrentAdress() {
    let geocoder = new google.maps.Geocoder();
    let gps = { lat: this.latitude, lng: this.longitude }
    geocoder.geocode({ 'location': gps }, function (res: any) {
      // console.log('abc');

    })
  }

  updateProfile(){
    let data = {
      _id : JSON.parse(localStorage.getItem('user'))._id,
      fullName : this.name,
      phone : this.phone,
      address : this.address,
      birthday : this.birthday,
      avatar : JSON.parse(localStorage.getItem('user')).avatar
    };
    this.HomeService.updateProfile(data).subscribe(res => {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('update successful');
    });
  }


  ngOnInit() {
 
    this.getCurrentLocation();
    this.name = JSON.parse(localStorage.getItem('user')).fullName;
    this.email = JSON.parse(localStorage.getItem('user')).email;
    this.phone = JSON.parse(localStorage.getItem('user')).phone;
    this.birthday = JSON.parse(localStorage.getItem('user')).birthday;
   
    console.log(this.name);

   
  }

}
