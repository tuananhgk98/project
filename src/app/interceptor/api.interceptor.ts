import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = localStorage.getItem('access_token');
    // const request = req.clone({
    //   url: `https://glinkserver.us-east-2.elasticbeanstalk.com/${req.url}`,
    //   // url: `http://192.168.1.33/glinkserver/${req.url}`,
    //   setHeaders: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });

    // return next.handle(request);
    return ;
  }
}