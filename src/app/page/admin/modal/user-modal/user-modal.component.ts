import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserService } from '../../../../service/admin/user.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent {

  @Input() user: Partial<User> = {};
  @ViewChild('userModal') userModal!: ElementRef;
  errorMessage: string = "";
  selectedRoles: string[] = [];
  availableRoles: string[] = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_MODERATOR'];

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    const modalElement = this.userModal.nativeElement;
    modalElement.addEventListener('hide.bs.modal', () => {
      this.clearModal();
    });
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
