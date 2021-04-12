import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserOrchestration } from '@orcha-user-auth-starter/client/shared/data-access';
import { EntireProfile } from '@orcha-user-auth-starter/shared/domain';

@Component({
  selector: 'orcha-user-auth-starter-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  readonly profile$ = this.user.getProfile(EntireProfile);
  constructor(private readonly user: UserOrchestration) {}
}
