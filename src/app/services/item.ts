import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Item {

  private apiUrl = 'http://44.209.19.27:8080/api/items';


  constructor(private http: HttpClient) {}

  crearItem(itemData: any): Observable<any> {
    return this.http.post(this.apiUrl, itemData);
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateItem(id: number, itemData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, itemData);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

