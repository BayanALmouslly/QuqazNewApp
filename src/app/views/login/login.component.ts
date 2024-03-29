import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AuthService } from '../auth/auth.service';
import { UserLogin } from '../auth/userlogin.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    UserName: new FormControl(null, [Validators.required]),
    Password: new FormControl(null, [Validators.required]),
    RememberMe: new FormControl(false, []),
  })
  constructor(private router: Router,
    private authService: AuthService,
    private toasterService: ToasterService) {
  }
  login() {
    this.router.navigate(['/dashboard'])
  }
  Register() {
    this.router.navigate(['/register'])
  }
  // @ViewChild('loginForm') loginForm: NgForm;
  user: UserLogin = new UserLogin
  buttonDisabled = false
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.buttonDisabled = true;
    this.authService.signIn(this.loginForm.value).subscribe(
      response => {
        this.user = response as UserLogin
        this.user.expiry = new Date().getTime()
        localStorage.setItem('token', this.user.token)
        this.authService.setAuthenticatedUser(this.user);
        this.router.navigate(['/dashboard'])
        this.buttonDisabled = false

      }, error => {
        console.log(error)
        this.buttonDisabled = false
        // this.toasterService.pop('error', '', error.message);
        this.toasterService.pop('error', '', " كلمة المرور  او اسم المستخدم غير صحيحة");
      }

    )
  }
}
