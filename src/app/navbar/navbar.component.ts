import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AppState } from '../store/app.states';
import { AuthService } from '../services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private _jwt: JwtHelperService,
  ) {}

  ngOnInit() {}

  
  isAuthenticated():boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  logOut(): void {
    this.auth.logOut()
  }
}
