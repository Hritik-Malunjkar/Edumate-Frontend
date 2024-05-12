import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //current user: which is loggedin
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token

  public generateToken(loginData:any){

    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //Login user: set token in localStorage
  public loginUser(token: any){
    localStorage.setItem('token',token);
    
    return true;
  }

  //isLogin: user is login or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem('token');
    if(tokenStr==undefined || tokenStr == ''|| tokenStr == null){
      return false;
    }else {
      return true;
    }
  }

  //Logout: remove token for local storage

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem('token');
  }

  //set user detail
  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user
  public getuser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else {
      this.logout();
      return null;
    }
  }

  //get user role

  public getUserRole(){
    let user=this.getuser();
    return user.authorities[0].authority;
  }


  public sendEmail(email:any) {
    return this.http.post(`${baseUrl}/user/sendEmail`,  email );
  }



  public updatePasswordAndVerifyOTP(email: string, confirmPassword: string, otp: string): Observable<string> {
    const body = {
      email: email,
      confirmPassword: confirmPassword,
      otp: otp,
    };
    return this.http.post<string>(`${baseUrl}/user/update-password-and-verify-otp`, body);
  }

}
