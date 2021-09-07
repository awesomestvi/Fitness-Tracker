import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTrainingComponent } from './custom-training.component';

describe('CustomTrainingComponent', () => {
  let component: CustomTrainingComponent;
  let fixture: ComponentFixture<CustomTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
