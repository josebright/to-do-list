import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from 'src/app/store/app.states';
import { SignUp } from 'src/app/store/actions';
import { Credential } from 'src/app/store/models';
import { messageSelector } from 'src/app/store/selectors';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  user: Credential = new Credential();
  errorMessage$: Observable<string | null>;

  constructor(
    private store: Store<AppStateInterface>,
  ) {
    this.errorMessage$ = this.store.pipe(select(messageSelector))
  }
  
  onSubmit(): void {
    const payload = {
      email: this.user.email!,
      password: this.user.password!
    };
    this.store.dispatch(SignUp(payload));
  }
}
