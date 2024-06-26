import { Injectable, OnDestroy } from '@angular/core';
import { from, Observable, of, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
export interface user {
  email: string;
  password: string;
}
export interface ICreateCredentials {
  email: string;
  password: string;
  displayName: string;
}

export interface IPasswordReset {
  code: string;
  newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private localStorageKey: string = 'kokazClient';
  private permissionlocalStorageKey: string = 'permissions';
  ngOnDestroy(): void {
  }

  constructor(private http: HttpClient, private localStorageService: LocalStorageService,
    private rout: Router) {
    // this.startTokenTimer()
  }
  baseUrl = environment.baseUrl + "api/";
  signIn(user): Observable<any> {
    let headers = new HttpHeaders({
      'app-v': '2'
    });
    return this.http.post(this.baseUrl + 'ClientAuth', user, { headers: headers });
  }

  signOut() {
    this.resetAuthenticated();
    localStorage.removeItem('token')
    localStorage.removeItem("kokazClient");
    //localStorage.clear();
    this.rout.navigate(['/login']);
  }

  public get authenticatedUser(): any {
    var auth: any = this.localStorageService.getItem(this.localStorageKey);
    if (Object.keys(auth).length === 0 && auth.constructor === Object) {
      return null;
    } else {
      return auth;
    }
  }
  IsExpire() {
    var user = this.authenticatedUser;

  }

  register(credentials: ICreateCredentials) {

  }

  sendPasswordEmail(email) {

  }

  resetPassword(credentials: IPasswordReset) {

  }
  setAuthenticatedUser(userData) {
    this.localStorageService.setItem(this.localStorageKey, userData);
    this.startTokenTimer()
  }
  private resetAuthenticated(): void {
    this.localStorageService.removeItem(this.localStorageKey);
  }
  getUser() {
    return JSON.parse(localStorage.getItem(this.localStorageKey));

  }
  setPermission(permission) {
    localStorage.setItem(this.permissionlocalStorageKey, JSON.stringify(permission));

  }
  private getTokenRemainingTime() {
    const accessToken = this.authenticatedUser
    if (!accessToken) {
      return 0;
    }
    return 60 * 60 * 1000 * 14
  }
  public startTokenTimer() {
    const timeout = this.getTokenRemainingTime()

    setTimeout(() => { alert('log out'); this.signOut(); }, timeout)

  }

}
