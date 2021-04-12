import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { OrchaModule } from '@orcha/angular';
import { AppFacade } from './app.facade';
import { AuthInterceptor } from './auth.interceptor';
import { UserEffects } from './user/user.effects';
import { UserOrchestration } from './user/user.orchestration';
import { UserReducer, USER_KEY } from './user/user.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(USER_KEY, UserReducer),
    EffectsModule.forFeature([UserEffects]),
    OrchaModule.forFeature({
      orchestrations: [UserOrchestration],
      interceptors: [AuthInterceptor],
    }),
  ],
  providers: [AppFacade, AuthInterceptor],
})
export class ClientSharedDataAccessModule {}
