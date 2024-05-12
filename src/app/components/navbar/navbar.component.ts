import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLoggedIn=false;
  user = null;

  constructor(public login: LoginService){}
  ngOnInit(){
    this.isLoggedIn=this.login.isLoggedIn();
    this.user = this.login.getuser();
    this.login.loginStatusSubject.asObservable().subscribe((data)=>{
      this.isLoggedIn=this.login.isLoggedIn();
      this.user = this.login.getuser();
    })
  }

  public logout(){
    this.login.logout();
    window.location.reload();
  }

}
