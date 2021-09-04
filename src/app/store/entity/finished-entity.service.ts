import { Injectable } from "@angular/core";
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from "@ngrx/data";
import { Exercise } from "src/app/training/exercise.model";

@Injectable({
  providedIn: "root",
})
export class FinishedEntityService extends EntityCollectionServiceBase<Exercise> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("FinishedExercise", serviceElementsFactory);
  }
}
