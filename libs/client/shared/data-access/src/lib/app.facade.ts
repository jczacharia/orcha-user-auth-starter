import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as UserActions from './user/user.actions';
import * as UserSelectors from './user/user.selectors';

@Injectable()
export class AppFacade {
  readonly user = {
    dispatchers: {
      login: (id: string, password: string) => {
        this.store.dispatch(UserActions.userLogin({ id, password }));
      },
      signUp: (id: string, password: string) => {
        this.store.dispatch(UserActions.userSignUp({ id, password }));
      },
      getProfile: () => {
        this.store.dispatch(UserActions.getProfile());
      },
      logout: () => {
        this.store.dispatch(UserActions.logout());
      },
    },
    actionListeners: {
      login: {
        success: this.actions$.pipe(ofType(UserActions.userLoginSuccess)),
        error: this.actions$.pipe(ofType(UserActions.userLoginError)),
      },
      signUp: {
        success: this.actions$.pipe(ofType(UserActions.userSignUpSuccess)),
        error: this.actions$.pipe(ofType(UserActions.userSignUpError)),
      },
      getProfile: {
        success: this.actions$.pipe(ofType(UserActions.getProfileSuccess)),
        error: this.actions$.pipe(ofType(UserActions.getProfileError)),
      },
    },
    selectors: {
      state$: this.store.select(UserSelectors.getState),
    },
  };

  constructor(private readonly store: Store, private readonly actions$: Actions) {}
}
