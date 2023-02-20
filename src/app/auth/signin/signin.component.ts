import { User } from '../../store/models';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.states';
import { LogIn } from '../../store/actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  user: User = new User();

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {};

  onSubmit(): void {
    const payload = {
      email: this.user.email!,
      password: this.user.password!
    };
    this.store.dispatch(LogIn({ email: payload.email, password: payload.password }));
  }
}
