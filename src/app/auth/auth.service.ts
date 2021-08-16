import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  private user: User;
  authChange = new Subject<Boolean>();

  constructor(private router: Router) {}

  authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(["/training"]);
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: new Date().getTime().toString(),
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: new Date().getTime().toString(),
    };
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(["/"]);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
