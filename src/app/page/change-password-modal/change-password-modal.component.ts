import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.css'
})
export class ChangePasswordModalComponent {
  @ViewChild('changePasswordModal') changePasswordModal!: ElementRef;
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Mật khẩu mới không khớp';
      return;
    }

    this.errorMessage = null;
    this.authService.changePassword({
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    }).subscribe(response => {
      alert('Đổi mật khẩu thành công');
    }, error => {
      this.errorMessage = error.message;
    });
  }

  ngAfterViewInit(): void {
    const modalElement = this.changePasswordModal.nativeElement;
    modalElement.addEventListener('hide.bs.modal', () => {
      this.clearModal();
    });
  }

  clearModal() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    }
    
}
