// src/app/user.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userData = new BehaviorSubject<any[]>(this.getUserDataFromLocalStorage());

  getUserData() {
    return this.userData.asObservable();
  }

  addUserWorkout(userWorkout: any) {
    let users = this.getUserDataFromLocalStorage();
    const userIndex = users.findIndex((user: any) => user.name === userWorkout.name);

    if (userIndex > -1) {
      users[userIndex].workouts.push({ type: userWorkout.type, minutes: userWorkout.minutes });
    } else {
      users.push({
        id: users.length + 1,
        name: userWorkout.name,
        workouts: [{ type: userWorkout.type, minutes: userWorkout.minutes }]
      });
    }

    this.updateLocalStorage(users);
    this.userData.next(users);
  }

  private getUserDataFromLocalStorage(): any[] {
    return JSON.parse(localStorage.getItem('userData') || '[]');
  }

  private updateLocalStorage(users: any[]) {
    localStorage.setItem('userData', JSON.stringify(users));
  }
}
