import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../model/user';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../crear-usuario/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  @Input() user: User | any;
  
  validation:boolean =  false;
  id!: number;
  name: string = '';
  email: string = '';
  userType: string = '';
  observations: string = '';


  constructor(public activeModal: NgbActiveModal, private userService: UserService, private router: Router) {}

  saveChanges() {

    const user:User = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      userType: this.user.userType,
      observations: this.user.observations,
      createdDate: new Date()
     }

    if(this.isFormValid()){
      this.userService.editUser(this.user);
       this.activeModal.close('editado');
    }else{
      this.validation = true;
    }
       
  }
  cancelEdit() {
    this.activeModal.close('cancelar'); 
  }

  isFormValid(): boolean {
    return (
      this.user.name.trim() !== '' &&
      this.user.email.trim() !== '' &&
      this.user.userType.trim() !== '' &&
      this.user.observations.trim() !== ''
    );
  }
}
