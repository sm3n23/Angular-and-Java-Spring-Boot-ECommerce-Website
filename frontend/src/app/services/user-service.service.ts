import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Register } from '../common/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  storage: Storage = sessionStorage;
  user:any;

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    /* let data = this.storage.getItem('user');
    if(data!=null){
      const parsedData:Register  = JSON.parse(data);
      this.user = parsedData;
      
    }
    else{

    } */
   }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }

  clearUser() {
    this.userSubject.next(null);
  }
}
