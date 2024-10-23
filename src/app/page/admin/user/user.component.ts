import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/admin/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  users: User[] = [];
  selectedUser: Partial<User> = {};

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe(
            (data) => {
                this.users = data;
            },
            (error) => {
                console.error('Lỗi khi hiển thị người dùng: ', error);
            }
        );
    }
    
    editUser(id: number): void {
        // @ts-ignore
        const userToEdit = this.userService.getUserById(id).subscribe(
            (data) => {
                this.selectedUser = { ...data };
                const modalElement = document.getElementById('userModal');
                // @ts-ignore
                const modalInstance = new bootstrap.Modal(modalElement);
                modalInstance.show();
            },
            (error) => {
                console.error('Lỗi khi hiển thị người dùng:', error);
            }
        );
    }
    
    onSavedUser(){
        this.loadUsers();
    }

}
