import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store/app.states';
import { LogOut } from 'src/app/store/actions';
import { isAuthenticatedSelector } from 'src/app/store/selectors'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // check if user is authenticated or not
  isAuthenticated$: Observable<boolean>

  constructor(
    private store: Store<AppStateInterface>,
  ) {
    this.isAuthenticated$ = this.store.pipe(select(isAuthenticatedSelector));
  }

  logOut(): void {
    this.store.dispatch(LogOut())
  }
}
