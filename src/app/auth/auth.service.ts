import { AuthData } from "./auth-data.model";
import { from, Observable, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { CommonService } from "../shared/common.service";
import { TrainingService } from "../training/training.service";
import { shareReplay } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromRoot from "../app.reducer";
import * as UI from "../shared/ui.actions";
import * as Auth from "./auth.actions";

@Injectable()
export class AuthService {
  private allSubs: Subscription[] = [];
  isAuth$: Observable<boolean>;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private commonService: CommonService,
    private trainingService: TrainingService,
    private store: Store<fromRoot.State>
  ) {
    this.isAuth$ = this.store.select(fromRoot.getisAuth);
  }

  initAuth() {
    this.allSubs.push(
      this.fireAuth.authState.pipe(shareReplay()).subscribe((user) => {
        if (user) {
          this.authSuccessfully();
        } else {
          this.logout();
        }
      })
    );
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    const register$ = from(
      this.fireAuth.createUserWithEmailAndPassword(
        authData.email,
        authData.password
      )
    );

    this.allSubs.push(
      register$.pipe(shareReplay()).subscribe({
        next: () => {
          this.router.navigateByUrl("/login");
          this.commonService.openSnackBar(
            `${authData.email} user created successfully`,
            3000
          );
        },
        error: (error) => {
          this.commonService.openSnackBar(error.message, 5000);
          this.store.dispatch(new UI.StopLoading());
        },
        complete: () => this.store.dispatch(new UI.StopLoading()),
      })
    );
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    const signIn$ = from(
      this.fireAuth.signInWithEmailAndPassword(
        authData.email,
        authData.password
      )
    );

    this.allSubs.push(
      signIn$.pipe(shareReplay()).subscribe({
        next: () => {
          this.authSuccessfully();
          this.commonService.openSnackBar(`${authData.email} is now logged in`);
          this.store.dispatch(new UI.StopLoading());
        },
        error: (error) => {
          this.commonService.openSnackBar(error.message, 5000);
          this.store.dispatch(new UI.StopLoading());
        },
      })
    );
  }

  logout() {
    this.store.dispatch(new Auth.SetUnauthenticated());
    this.trainingService.cancelAllSubs();
    this.cancelAllSubs();
    this.fireAuth.signOut();
    this.router.navigate(["/"]);
    this.commonService.openSnackBar("User is now logged out!", 3000);
  }

  authSuccessfully() {
    this.store.dispatch(new Auth.SetAuthenticated());
    this.router.navigate(["/training"]);
  }

  cancelAllSubs() {
    this.allSubs.forEach((subs) => subs?.unsubscribe());
  }
}
