import { Router } from '@angular/router';
import { User } from './../app-state/models';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from '../app-state/actions'
// import { AppService } from '../_services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  user: User = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    // private appService: AppService,
    private store: Store
  ) {}

  ngOnInit(): void {};

  onSubmit(): void {
    console.log(this.user);
  }

  async signinBtnClicked(): Promise<any> {
    const user = {
      email: this.user.email,
      password: this.user.password
    }
    this.store.dispatch(userActions.login({user}))
  }
}
