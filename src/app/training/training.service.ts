import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, Subscription } from "rxjs";
import { Exercise } from "./exercise.model";
import { CommonService } from "../shared/common.service";
import { FinishedEntityService } from "../store/entity/finished-entity.service";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class TrainingService {
  private currentTraining!: Exercise;

  public onGoingTrainingSubject = new BehaviorSubject<boolean>(false);
  onGoingTraining$: Observable<boolean> = this.onGoingTrainingSubject.asObservable();

  finishedExercisesChanged = new BehaviorSubject<Exercise[]>([]);

  private allSubs: Subscription[] = [];

  constructor(
    private commonService: CommonService,
    private finishedExerciseService: FinishedEntityService,
    private authService: AuthService
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

  setCurrentTraining(exercise: Exercise) {
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
    const currentExercise = this.currentTraining;
    const duration = currentExercise.duration;
    const calories = currentExercise.calories;

    const finishedExercise: Exercise = {
      ...currentExercise,
      date: new Date(),
      state: state,
      duration: progress ? duration * (progress / 100) : duration,
      calories: progress ? calories * duration * (progress / 100) : calories * duration,
      user: this.authService.getUserId(),
    };

    this.sendDatatoDatabase(finishedExercise);

    // Show feedback
    this.commonService.openSnackBar(`${finishedExercise.name} workout is ${state}`);

    // Clear current exercise
    this.onGoingTrainingSubject.next(false);
    this.setCurrentTraining(null);
  }

  cancelAllSubs() {
    this.allSubs.forEach((subs) => subs?.unsubscribe());
  }
}
