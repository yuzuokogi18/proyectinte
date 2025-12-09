import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginalumnoService {

  private apiUrl = 'http://44.209.19.27:8080/api/users/login';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
