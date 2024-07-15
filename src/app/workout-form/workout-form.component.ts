// src/app/workout-form/workout-form.component.ts

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../user.service'; //

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule]
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.workoutForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      minutes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  addWorkout(): void {
    if (this.workoutForm.valid) {
    const workoutData = this.workoutForm.value;
    this.userService.addUserWorkout(workoutData);
    this.workoutForm.reset();
    this.workoutForm.markAsPristine(); // Mark the form as pristine to clear error states
    Object.keys(this.workoutForm.controls).forEach(key => {
      this.workoutForm.get(key)?.setErrors(null);
    });
    } else {
      this.workoutForm.markAllAsTouched();
    }
  }
}
