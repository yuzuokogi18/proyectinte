import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRoles {

 private baseUrl = 'http://44.209.19.27:8080/api/user-roles';


  constructor(private http: HttpClient) {}

  assignRole(userId: number, roleId: number) {
    return this.http.post(`${this.baseUrl}`, {
      userId,
      roleId
    });
  }
}
