import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store'

import { LogIn } from 'src/app/store/actions';
import { AppStateInterface } from 'src/app/store/app.states';
import { Credential } from 'src/app/store/models';
import { messageSelector } from 'src/app/store/selectors'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  errorMessage$: Observable<string | null>;
  user: Credential = new Credential();

  constructor(
    private store: Store<AppStateInterface>,
    private router: Router,
    private cookie: CookieService
  ) {
    this.errorMessage$ = this.store.pipe(select(messageSelector));
  }

  ngOnInit() {
    const token = this.cookie.get('token');
    if (token) this.router.navigateByUrl('todo');
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email!,
      password: this.user.password!
    };
    this.store.dispatch(LogIn(payload));
  }
}
