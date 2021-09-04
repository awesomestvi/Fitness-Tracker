import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Observable } from "rxjs";
import { AuthData } from "src/app/auth/auth-data.model";
import { LOGIN_URL } from "src/app/shared/config";

@Injectable({
  providedIn: "root",
})
export class AuthDataService extends DefaultDataService<AuthData> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super("Auth", http, httpUrlGenerator);
  }

  add(authData: AuthData): Observable<AuthData> {
    return this.http.post<AuthData>(LOGIN_URL, authData);
  }
}
