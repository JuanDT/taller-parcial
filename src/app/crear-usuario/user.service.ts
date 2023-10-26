import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private lastUserId = 0; 

  constructor() {
    this.loadUsersFromLocalStorage();
  }

  getUsers(): User[] {
    return this.users;
  }


  addUser(user: User) {
    user.id = ++this.lastUserId;

    this.users.push(user);
    this.saveUsersToLocalStorage();
  }

  deleteUser(userId: number) {
    const index = this.users.findIndex(user => user.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.saveUsersToLocalStorage();
    }
  }

  editUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.saveUsersToLocalStorage();
    }
  }

  private loadUsersFromLocalStorage() {
    const usersString = localStorage.getItem('users');
    if (usersString) {
      this.users = JSON.parse(usersString);
      const lastUser = this.users[this.users.length - 1];
      if (lastUser) {
        this.lastUserId = lastUser.id;
      }
    }
  }

   saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
