import { Component, OnInit } from '@angular/core';
import { User } from '../../store/models';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { SignUp } from '../../store/actions';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  user: User = new User();

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    const payload = {
      email: this.user.email!,
      password: this.user.password!
    };
    this.store.dispatch(SignUp({ email: payload.email, password: payload.password }));
  }
}
