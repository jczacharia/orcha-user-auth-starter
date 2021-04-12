import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterModule } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { AppGuard } from './app.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [AppShellComponent, LoginComponent, SignUpComponent, ProfileComponent],
  providers: [AppGuard],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: '',
        component: AppShellComponent,
        canActivate: [AppGuard],
        children: [
          {
            path: 'profile',
            component: ProfileComponent,
          },
          { path: '**', pathMatch: 'full', redirectTo: 'profile' },
        ],
      },
    ]),
  ],
})
export class ClientShellModule {}
