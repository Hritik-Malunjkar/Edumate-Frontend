import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar, private _router:Router) { }
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',

  }
  ngOnInit() {

  }
  formSubmit() {
    console.log("click");
    console.log(this.user);
    if (this.user.username == '' || this.user.username == null) {
      // alert('user is required!!');
      this.snack.open('Username is required!','',{
        duration: 3000,
      });
      return;
    }
    // add user
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        console.log(data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        //alert('success');
        Swal.fire('Success done','User id is' + data.id ,'success');
        this._router.navigate(['login']);
      },
      (error) => {
        console.log(error);
        // alert('something went wrong');
        this.snack.open('User Already exists!','',{
          duration: 3000,
        })
      }
    );
  }


}
