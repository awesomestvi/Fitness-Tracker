import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { Exercise } from "./exercise.model";
import { CommonService } from "../shared/common.service";
import { ExerciseEntityService } from "../store/entity/exercise-entity.service";
import { FinishedEntityService } from "../store/entity/finished-entity.service";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  private currentTraining: Exercise | undefined | null;

  public onGoingTrainingSubject = new BehaviorSubject<boolean>(false);
  onGoingTraining$: Observable<boolean> =
    this.onGoingTrainingSubject.asObservable();

  finishedExercisesChanged = new BehaviorSubject<Exercise[]>([]);

  private allSubs: Subscription[] = [];

  constructor(
    private commonService: CommonService,
    private finishedExerciseService: FinishedEntityService
  ) {}

  private sendDatatoDatabase(exercise: Exercise) {
    this.finishedExerciseService.add(exercise);
  }

  deleteRow(exercise: Exercise) {
    this.finishedExerciseService.delete(exercise);
    this.commonService.openSnackBar(`${exercise.name} exercise is deleted`);
  }

  getCurrentTraining() {
    return { ...this.currentTraining };
  }

  setCurrentTraining(exercise: Exercise | null) {
    this.currentTraining = exercise;
  }

  getCurrentTrainingName() {
    return this.currentTraining?.name;
  }

  getCurrentTrainingIcon() {
    return this.currentTraining?.iconName;
  }

  getCurrentTrainingDuration() {
    return this.currentTraining?.duration || 0;
  }

  finishedExercise(state: any, progress?: number) {
    const finishedExercise: Exercise = {
      ...this.currentTraining,
      date: new Date(),
      state: state,
      duration: progress
        ? this.currentTraining.duration * (progress / 100)
        : this.currentTraining.duration,
      calories: progress
        ? this.currentTraining.calories *
          this.currentTraining.duration *
          (progress / 100)
        : this.currentTraining.calories * this.currentTraining.duration,
    };

    this.sendDatatoDatabase(finishedExercise);

    // Show feedback
    this.commonService.openSnackBar(
      `${finishedExercise.name} workout is ${state}`
    );

    // Clear current exercise
    this.onGoingTrainingSubject.next(false);
    this.setCurrentTraining(null);
  }

  cancelAllSubs() {
    this.allSubs.forEach((subs) => subs?.unsubscribe());
  }
}
