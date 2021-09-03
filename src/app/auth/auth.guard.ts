import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthEntityService } from "../store/entity/auth-entity.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthEntityService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((auth) => {
        if (!auth) this.router.navigateByUrl("/");
      })
    );
  }
}
