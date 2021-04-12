import { User } from '@orcha-user-auth-starter/shared/domain';
import { createQuery } from '@orcha/common';

export const UserQueryModel = createQuery<User>()({
  id: true,
  dateCreated: true,
  dateLastLoggedIn: true,
});

export const LoginQueryModel = createQuery<{ token: string }>()({ token: true });
export const SignUpQueryModel = LoginQueryModel;

export const EntireProfile = createQuery<User>()({
  id: true,
  dateCreated: true,
  dateLastLoggedIn: true,
});
