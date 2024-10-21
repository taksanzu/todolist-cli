import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Tiêm AuthService
  const router = inject(Router); // Tiêm Router

  const roles = authService.getRoles(); // Lấy vai trò từ AuthService

  // Kiểm tra nếu vai trò là admin
  if (roles.includes('ROLE_ADMIN')) {
    return true; // Cho phép truy cập nếu là admin
  } else {
    router.navigate(['/user']); // Điều hướng đến trang user nếu không phải admin
    return false; // Ngăn không cho truy cập
  }
};
