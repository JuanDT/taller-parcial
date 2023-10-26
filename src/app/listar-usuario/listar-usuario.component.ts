import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../crear-usuario/user.service';
import { User } from '../model/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditarUsuarioComponent } from '../editar-usuario/editar-usuario.component';



@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent {

  @Output() editUser = new EventEmitter<User>();

  users: User[] = []; 

  constructor(private userService: UserService, private router: Router,private modalService: NgbModal) {
    this.users = this.userService.getUsers();
  }

  onEditUser(user: User) {
    const userId = user.id;
    this.editUser.emit(user);
    this.router.navigate(['/editar-usuario', userId]);
  }
  
  openEditModal(user:User) {
    const modalRef: NgbModalRef = this.modalService.open(EditarUsuarioComponent, { size: 'lg' });
  
    modalRef.componentInstance.user = user;
  
    modalRef.result.then((result) => {
        if(result === 'cancelar'){
          this.users = this.userService.getUsers();
          console.log("cancelado")
        }
    });
  }
  

  onDeleteUser(user: User) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id)
      }
    });
  }

  
}
