import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {
  username: string | null = '';

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

}
