import { Component, OnInit, NgZone } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SocialLoginService, Provider } from 'ng8-social-login';



import { Router } from '@angular/router';
import { HomeService } from '../../../modules/home/service/home.service';
import { UserService } from './user.service';
import { UserModel } from './user.model';

export class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private HomeService: HomeService,
    private router: Router,
    private UserService: UserService,
    private ngZone: NgZone,
    private socicalLogin: SocialLoginService, ) { }

  products: any[];
  myControl = new FormControl();
  filterProduct: any;
  cartCount: number = 0;
  selectedFile: ImageSnippet;

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




  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.imgBase64 = this.selectedFile.src;
    });
    reader.readAsDataURL(file);

  }

  getAllEmail() {
    this.UserService.getAllEmail().subscribe(res => {
      this.listEmail = res.data;
      // console.log(this.listEmail);

    });
  }

  getAllProduct() {
    console.log('123');
    this.HomeService.getAllProduct().subscribe(res => {
      this.products = JSON.parse(JSON.stringify(res)).data;
      console.log(this.products);
    }, err => {

    }, () => {
      this.filterProduct = this.myControl.valueChanges.pipe(
        startWith(''),
<<<<<<< HEAD
        map(value => this._filter(value) )
=======
        map(value => this._filter(value))
>>>>>>> 82c2288ac7a1768063c42439188f2088dc75375b
      );
    });
  }

 


  signup() {
    let data = new UserModel();
    let date = new Date();
    data.fullName = this.fullName;
    data.email = this.email;
    data.hashedPassword = this.pwd;
    data.phone = this.phone;
    data.birthday = this.birthDay;
    data.address = this.address;
    data.avatar = this.imgBase64;
    data.createOn = date.toString();
    // console.log(data);
    this.UserService.signup(data).subscribe(async res => {
      // console.log(res);
      if (res.OK == true) {
        alert('sign up successful');

        document.getElementById('closeSignupModal').click();
        await this.getInfo();
      }
      else {
        alert(res.Message);
      }

    }, err => {
      alert(JSON.parse(JSON.stringify(err)).statusText);
    });
  }

  public navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }

  loginWithGoogle(): void {
    this.socicalLogin.login(Provider.GOOGLE).subscribe(user => {
     
      if (this.listEmail.includes(user.email)) {
        this.UserService.signin({ email: user.email, hashedPassword: user.id }).subscribe(async res => {
          localStorage.setItem('user', JSON.stringify(JSON.parse(JSON.stringify(res)).data));
          // alert('login successful!');

          document.getElementById('closeSigninModal').click();
          this.getInfo();
          // this.currentUser = JSON.parse(localStorage.getItem('user'));
          // this.accountName = this.currentUser.fullName;
          // this.cartCount = JSON.parse(localStorage.getItem('cart')).length;
        
          
       
          // window.location.reload();  
        }, err => {

        }, () => {
          this.router.navigateByUrl('/abc', { skipLocationChange: true }).then(() =>
          this.router.navigate([`/${window.location.href.split('/')[1]}`]));
        });
      }
      else {
        let data = new UserModel();
        data.fullName = user.name;
        data.hashedPassword = user.id;
        data.email = user.email;
        data.avatar = user.profileImg;
        this.UserService.signup(data).subscribe(res => {
          if (res.OK == true) {

            this.UserService.signin({ email: user.email, hashedPassword: user.id }).subscribe(res => {

              if (res.OK == true) {
                localStorage.setItem('user', JSON.stringify(JSON.parse(JSON.stringify(res)).data));

                this.accountName = this.currentUser.fullName;
                alert(res.Message);
              }
              else {
                alert(res.Message);
              }
            }, err => {
              alert(err.statusText);
            }, () => {
              document.getElementById('closeSigninModal').click();
              this.getInfo();
            });
          }
        });

      };
    });
  }


  login() {
    let data = {
      email: this.email,
      hashedPassword: this.pwd
    };
    this.UserService.signin(data).subscribe(res => {

      if (res.OK == true) {
        localStorage.setItem('user', JSON.stringify(JSON.parse(JSON.stringify(res)).data));
        this.getInfo();
        document.getElementById('closeSigninModal').click();
        setTimeout(function () {
          this.router.navigateByUrl('/cart', { skipLocationChange: true }).then(() =>
            this.router.navigate([`/`]));
        }, 600);
      }
      else {
        alert(res.Message);
      }

    }, err => {
      alert(err.statusText);
    });
  }

  getInfo() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.accountName = this.currentUser.fullName;
    this.cartCount = JSON.parse(localStorage.getItem('cart')).length;
    this.router.navigateByUrl('/abc', { skipLocationChange: true }).then(() =>
    this.router.navigate([`/${window.location.href.split('/')[1]}`]));
  }


  private _filter(value: any): any {
    const filterValue = value.toLowerCase();
    return this.products.filter(prod =>
      prod.name.toLowerCase().includes(filterValue));
    }
  ngOnInit() {
<<<<<<< HEAD
    // this.getAllEmail();
    // this.getInfo();
    this.getAllProduct();

    document.getElementById('mat-autocomplete-0').style.visibility = 'visible';
    document.getElementById('mat-autocomplete-0').style.position = 'absolute';
    // document.getElementById('mat-autocomplete-0').style.visibility = 'visible';
    // document.getElementById('mat-autocomplete-0').style.visibility = 'visible';
    // document.getElementById('mat-autocomplete-0').style.visibility = 'visible';

    
   

=======
    this.getAllProduct();
    this.getAllEmail();
    this.getInfo();
>>>>>>> 82c2288ac7a1768063c42439188f2088dc75375b

  }

  logout() {
    let cf = confirm('are you sure to logout??');
    if (cf == true) {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/abc', { skipLocationChange: true }).then(() =>
        this.router.navigate([`/${window.location.href.split('/')[1]}`]));
      // window.location.reload();
    }

  }

  ridirectToHome() {
    this.router.navigate(['/']);
  }

  ridirectToDetail(id) {
    this.router.navigate([`/${id}`]);
  }

  ridirectToCart() {
    this.router.navigate(['/cart']);
  }

}
