// src/app/workout-list/workout-list.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../user.service';
@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatInputModule, MatSelectModule]
})
export class WorkoutListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'workouts', 'workoutsNumber', 'totalWorkoutLength'];
  dataSource: MatTableDataSource<any>;
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) {
    const users = JSON.parse(localStorage.getItem('userData') || '[]');
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(users => {
      this.dataSource.data = users;
    });
  }

  calculateTotalMinutes(workouts: any[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

    combineWorkoutTypes(workouts: any[]): string {
    return workouts.map(workout => workout.type).join(', ');
  }

  applyFilter(event: Event | any): void {
    let filterValue: string | undefined;
  
    if (typeof event === 'string') {
      filterValue = event; // Handle direct string input (e.g., for testing purposes)
    } else {
      filterValue = (event?.target as HTMLInputElement)?.value.trim().toLowerCase() || undefined;
    }
  
    console.log("filter value =", filterValue);
  
    if (typeof filterValue === 'string') {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.workouts.some((workout: any) => workout.type.toLowerCase() === filter.toLowerCase());
      };
      this.dataSource.filter = ''; // Reset filter when filterValue is undefined
    }
  }
  
}
