import { Component, OnInit } from "@angular/core";
import { AuthEntityService } from "./store/entity/auth-entity.service";
import { FinishedEntityService } from "./store/entity/finished-entity.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthEntityService,
    private finishedExerciseService: FinishedEntityService
  ) {}

  ngOnInit() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    const localAuth = localStorage.getItem("auth");

    if (!localAuth) return;

    this.authService.addOneToCache(JSON.parse(localAuth));
    this.finishedExerciseService.getAll();
  }
}
