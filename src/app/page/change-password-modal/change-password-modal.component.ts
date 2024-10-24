import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { ChangePasswordRequest } from '../../models/change-password-request';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.css'
})
export class ChangePasswordModalComponent {
  @ViewChild('changePasswordModal') changePasswordModal!: ElementRef;
  changePasswordRequest: Partial<ChangePasswordRequest> = {};
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.changePassword(this.changePasswordRequest).subscribe(response => {
      alert('Đổi mật khẩu thành công');
    }, error => {
      this.errorMessage = error.error.message;
    });
    this.closeModal();
  }

  ngAfterViewInit(): void {
    const modalElement = this.changePasswordModal.nativeElement;
    modalElement.addEventListener('hide.bs.modal', () => {
      this.clearModal();
    });
  }

  clearModal() {
    this.changePasswordRequest = {};
    }
    closeModal(): void {
      const modalElement = this.changePasswordModal.nativeElement;
      // @ts-ignore
      const modalInstance = bootstrap.Modal.getInstance(modalElement);

      if (modalInstance) {
        modalInstance.hide(); // Đóng modal đúng cách
      } else {
        // @ts-ignore
        const newModalInstance = new bootstrap.Modal(modalElement);
        newModalInstance.hide();
      }
    }

}
