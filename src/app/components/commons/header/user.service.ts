import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    getAllEmail() : Observable<any>{
        return this.http.get('http://localhost:3000/user/email');
    }

    signup(data): Observable<any> {
        return this.http.post('http://localhost:3000/user/signup', data);
    }
    signin(data) : Observable<any>{
        return this.http.post('http://localhost:3000/user/signin', data);
    }


}
