import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CartService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };


    getCode(data): Observable<any> {
        return this.http.post('http://localhost:3000/discount/find', data);
    }

    createBillExport(data: any): Observable<any> {
        return this.http.post('http://localhost:3000/billExport/create', data);
    }
    createBillExportDetail(data: any): Observable<any> {
        return this.http.post('http://localhost:3000/billExportDetail/create', data);
    }
}