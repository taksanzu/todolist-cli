import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { UserService } from '../../../../service/admin/user.service';
import { User } from '../../../../models/user';
import { Role } from '../../../../models/role';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {

  @Input() user: Partial<User> = {};
  @Output() saveUserEvent = new EventEmitter<Partial<User>>();
  @ViewChild('userModal') userModal!: ElementRef;
  errorMessage: string = "";
  availableRoles = Object.values(Role);

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    const modalElement = this.userModal.nativeElement;
    modalElement.addEventListener('hide.bs.modal', () => {
      this.clearModal();
    });
  }

  selectedRoles(): string[] {
    return this.user.roles?.includes(Role.ADMIN) ? [Role.ADMIN] : [Role.USER];
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe(
      (user) => {
        this.saveUserEvent.emit(user);
        this.closeModal();
      },
      (error) => {
        this.errorMessage = error.error.message
      }
    );
  }

  closeModal(): void {
    const modalElement = document.getElementById('userModal');
    // @ts-ignore
    const modalInstance = bootstrap.Modal.getInstance(modalElement);

    if (modalInstance) {
      modalInstance.hide(); // Đóng modal đúng cách
    } else {
      console.error('Modal not found');
    }
  }

  clearModal(): void {
    this.user = {};
  }

}
