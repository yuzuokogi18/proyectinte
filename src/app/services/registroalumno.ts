import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegistroalumnoService {

  private apiUrl = 'http://44.209.19.27:8080/api/users/register';


  constructor(private http: HttpClient) {}

  registrarAlumno(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
