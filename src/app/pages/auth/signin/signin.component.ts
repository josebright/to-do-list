import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import { LogIn } from 'src/app/store/actions';
import { State } from 'src/app/store/app.states';
import { Credential } from 'src/app/store/models';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  errorMessage$: Observable<string | null>;
  user: Credential = new Credential()
  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    this.errorMessage$ = this.store.select('message')
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) this.router.navigateByUrl('todo');
    this.errorMessage$ = this.store.select((store) => store.message);
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email!,
      password: this.user.password!
    };
    this.store.dispatch(LogIn(payload));
    console.log(this.errorMessage$)
  }
}
