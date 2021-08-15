import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  workouts: any = [
    {
      value: 'lunges',
      type: 'Lunges',
      icon: '../../../assets/img/lunges.png',
    },
    {
      value: 'cycling',
      type: 'Cycling',
      icon: '../../../assets/img/cycling.png',
    },
    {
      value: 'burpees',
      type: 'Burpees',
      icon: '../../../assets/img/burpees.png',
    },
    {
      value: 'highKnees',
      type: 'High Knees',
      icon: '../../../assets/img/high-knees.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  startWorkout(a: any) {
    console.log(a);
  }
}
