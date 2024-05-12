import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { PasswordValidator } from 'src/shared/password.validator';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword!: FormGroup;

  constructor(private fb: FormBuilder, private _router: Router, private _login: LoginService) {}

  ngOnInit(): void {
    this.resetPassword = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      otp: ['', [Validators.required]],
    }, { validator: PasswordValidator });
  }

  onSubmit() {
    const email = this.resetPassword?.get('email')?.value;
    const confirmPassword = this.resetPassword?.get('confirmPassword')?.value;
    const otp = this.resetPassword?.get('otp')?.value;
  
    if (email && confirmPassword && otp) {  
      this._login.updatePasswordAndVerifyOTP(email, confirmPassword, otp).subscribe(
        (response) => {
          console.log(response);
          Swal.fire('Success', 'Password updated', 'success').then((e)=>{
            this._router.navigate(['login']);
          });
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Invalid email or otp', 'error');
        }
      );
    } else {
      console.error('FormGroup or controls are null or undefined.');
    }
  }
  
}
