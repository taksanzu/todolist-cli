import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent implements OnInit {
  username: string | null = '';

  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

}
