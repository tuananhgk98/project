import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SubscribeService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };


    subscribe(data): Observable<any> {
        return this.http.post('http://localhost:3000/mail/sendSubscribeMail', data);
    }
}