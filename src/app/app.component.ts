import { Component, OnInit } from '@angular/core';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;

  ngOnInit() {
   
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      this.users = [
        new User(1, 'John Doe', 'john@example.com', 'Admin', new Date(), ''),
      ];
      this.saveUsers();
    }
  }

  saveUsers() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  onAddUser(newUser: User) {
    newUser.id = this.getNextUserId();
    this.users.push(newUser);
    this.saveUsers();
  }

  getNextUserId(): number {
    const maxId = this.users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
  }

  onEditUser(user: User) {
    this.selectedUser = user;
  }

  onSaveChanges(updatedUser: User) {
    if (this.selectedUser) {
      const index = this.users.findIndex(user => user.id === this.selectedUser!.id);
      if (index !== -1) {
        this.users[index] = updatedUser;
        this.saveUsers();
        this.selectedUser = null;
      }
    }
  }

  onDeleteUser(user: User) {
    const confirmDelete = confirm('¿Estás seguro de eliminar a este usuario?');
    if (confirmDelete) {
      this.users = this.users.filter(u => u.id !== user.id);
      this.saveUsers();
    }
  }
}
