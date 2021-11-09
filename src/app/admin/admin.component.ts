import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/Auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(e: Event) {
    e.preventDefault();
    this.authService.logout();
  }

}
