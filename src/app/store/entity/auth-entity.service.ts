import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { map } from "rxjs/operators";
import { AuthData } from "../../auth/auth-data.model";

@Injectable({
  providedIn: "root",
})
export class AuthEntityService extends EntityCollectionServiceBase<AuthData> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("Auth", serviceElementsFactory);
  }

  isAuth() {
    return this.entities$.pipe(map((auth) => auth.length > 0));
  }
}
