import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  
  id!: number;
  name: string = '';
  email: string = '';
  userType: string = '';
  observations: string = '';


  validation:boolean =  false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    
  }

  onAddUser() {
     
     const user:User = {
      id: this.id,
      name: this.name,
      email: this.email,
      userType: this.userType,
      observations: this.observations,
      createdDate: new Date()
     }
      if(this.isFormValid()){
        this.userService.addUser(user);

      this.router.navigate(['/']);
      }else{
        console.log("no es válido")
        this.validation = true;
      }   
  }

  isFormValid(): boolean {
    return (
      this.name.trim() !== '' &&
      this.email.trim() !== '' &&
      this.userType.trim() !== '' &&
      this.observations.trim() !== ''
    );
  }

  goToListarUsuarios() {
    this.router.navigate(['/']);
  }
}
