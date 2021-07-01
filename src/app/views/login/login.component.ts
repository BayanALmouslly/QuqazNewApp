import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserLogin } from '../auth/userlogin.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  constructor(private router:Router,
    private authService:AuthService){}
  login(){
    this.router.navigate(['/dashboard'])
  }
  Register(){
    this.router.navigate(['/register'])
  }
  @ViewChild('loginForm') loginForm: NgForm;
  user: UserLogin

  onSubmit() {
    // if (!this.loginForm.valid || this.buttonDisabled) {
    //   return;
    // }
   console.log(this.loginForm.value)
    if (this.loginForm.value)
      this.authService.signIn(this.loginForm.value).subscribe(
        response => {
          this.user = response as UserLogin
          this.user.expiry = new Date().getTime()
          localStorage.setItem('token', this.user.token)
          this.authService.setAuthenticatedUser(this.user);
          this.router.navigate(['/dashboard'])

        }, error => {
        }

      )
  }
}
