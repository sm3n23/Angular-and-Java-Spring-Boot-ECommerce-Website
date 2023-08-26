import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../common/register';
import { Observable } from 'rxjs';
import { Login } from '../common/login';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  private registerUrl = "http://localhost:8080/api/register";
  private loginUrl = "http://localhost:8080/api/login";

  constructor(private httpClient: HttpClient) { }

  createUser(user:Register): Observable<any> {

    return this.httpClient.post<Register>(this.registerUrl,user);
  }

  login(login:Login): Observable<any> {
    
    return this.httpClient.post<Login>(this.loginUrl, login);
  }
}
