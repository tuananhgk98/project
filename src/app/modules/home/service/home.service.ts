import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };


    getAllProduct() : Observable<any>{
        return this.http.get('http://localhost:3000/product/list', this.httpOptions);
    }

    getProductByid(id) : Observable<any> {
        return this.http.get(`http://localhost:3000/product/${id}`);
    }

    increeViewCount(id,data) : Observable<any>{
        return this.http.post(`http://localhost:3000/product/increeView/${id}`, data);
    }

    updateProfile(data) : Observable<any>{
        return this.http.put('http://localhost:3000/user/update', data);
    }
}

