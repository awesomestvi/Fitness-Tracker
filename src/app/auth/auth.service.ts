import { AuthData } from "./auth-data.model";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "../shared/common.service";
import { AuthEntityService } from "../store/entity/auth-entity.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SIGNUP_URL } from "../shared/config";

@Injectable()
export class AuthService {
  isAuth$: Observable<boolean>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private commonService: CommonService,
    private authService: AuthEntityService
  ) {
    this.isAuth$ = this.authService.isAuth();
  }

  registerUser(authData: AuthData) {
    this.http.post<any>(SIGNUP_URL, authData).subscribe({
      next: () => {
        this.router.navigateByUrl("/login");
        this.commonService.openSnackBar(
          `${authData.email} user created successfully`,
          3000
        );
      },
      error: (error) => {
        this.commonService.openSnackBar(error.error.error.message, 5000);
      },
    });
  }

  login(authData: AuthData) {
    this.authService.add(authData).subscribe({
      next: () => {
        this.router.navigate(["/training"]);
        this.commonService.openSnackBar(`${authData.email} is now logged in`);
      },
      error: (error) => {
        this.commonService.openSnackBar(error.error.error.error.message, 5000);
      },
    });
  }

  logout() {
    this.commonService.openSnackBar("You are now logged out!", 3000);
    this.authService.clearCache();
    this.router.navigate(["/"]);
  }
}
