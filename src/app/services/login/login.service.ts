import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:3000/login';
  private logoutUrl = 'http://localhost:3000/logout';

  constructor(private http: HttpClient) { }

  public isAuthenticated() {
    // Check whether the token is expired and return
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      return true;
    }
    return false;
  }

  public getUser(): string {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      return (JSON.parse(userData)).user.name;
    }
    return '';
  }
  public setUserInfo(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public login(username: string, password: string) {
    // Set withCredentials option to true
    const options = { withCredentials: true };
    const body = { username: username, password: password };
    return this.http.post(this.loginUrl, body, options);
  }

  public logout() {
    localStorage.removeItem('userInfo');
    return this.http.get(this.logoutUrl);
  }
}