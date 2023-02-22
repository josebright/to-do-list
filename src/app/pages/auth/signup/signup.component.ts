import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from 'src/app/store/app.states';
import { SignUp } from 'src/app/store/actions';
import { Credential } from 'src/app/store/models';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  user: Credential = new Credential();
  errorMessage$: Observable<string | null>;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    this.errorMessage$ = this.store.select('message')
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) this.router.navigateByUrl('todo');
  }
  
  onSubmit(): void {
    const payload = {
      email: this.user.email!,
      password: this.user.password!
    };
    this.store.dispatch(SignUp(payload));
  }
}
