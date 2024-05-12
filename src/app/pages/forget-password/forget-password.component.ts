import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPassword!: FormGroup;
  isSendingEmail: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private _snack: MatSnackBar, private _router:Router) { }


  ngOnInit(): void {
    this.forgetPassword = this.fb.group({
      email: ['', [Validators.required]]
    })
    

  }

  sendEmail() {
    let email=this.forgetPassword.get('email')?.value;
    this.isSendingEmail = true; 
    this.loginService.sendEmail(email).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Success', 'Mail sent', 'success').then(() => {
          this.isSendingEmail = false; 
          this._router.navigate(['reset-password']);
        });
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Invalid email address', 'error').then(() => {
          this.isSendingEmail = false;
        });
      }
    );
  }
}


