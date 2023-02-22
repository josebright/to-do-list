import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../store/models';
import { AppState, selectAuthState  } from '../../store/app.states';
import { SignUp } from '../../store/actions';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  user: User = new User();
  getState: Observable<any>;
  errorMessage!: string | null;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }
  
  onSubmit(): void {
    const payload = {
      email: this.user.email!,
      password: this.user.password!
    };
    this.store.dispatch(SignUp({ email: payload.email, password: payload.password }));
  }
}
