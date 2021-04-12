import { UserService } from '@orcha-user-auth-starter/server/core/services';
import {
  EntireProfile,
  IUserOrchestration,
  LoginDto,
  LoginQueryModel,
  OrchaUserAuthStarterOrchestrations,
  SignUpDto,
  SignUpQueryModel,
  User,
} from '@orcha-user-auth-starter/shared/domain';
import { IQuery } from '@orcha/common';
import { IServerOrchestration, ServerOperation, ServerOrchestration } from '@orcha/nestjs';

@ServerOrchestration(OrchaUserAuthStarterOrchestrations.user)
export class UserOrchestration implements IServerOrchestration<IUserOrchestration> {
  constructor(private readonly user: UserService) {}

  @ServerOperation({ validateQuery: LoginQueryModel })
  login(query: IQuery<{ token: string }>, _: string, { id, password }: LoginDto) {
    return this.user.login(id, password, query);
  }

  @ServerOperation({ validateQuery: SignUpQueryModel })
  signUp(query: IQuery<{ token: string }>, _: string, { id, password }: SignUpDto) {
    return this.user.signUp(id, password, query);
  }

  @ServerOperation({ validateQuery: EntireProfile })
  getProfile(query: IQuery<User>, token: string) {
    return this.user.verifyUserToken(token, query);
  }
}
