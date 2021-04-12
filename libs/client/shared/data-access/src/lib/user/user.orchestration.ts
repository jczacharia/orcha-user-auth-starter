import {
  IUserOrchestration,
  OrchaUserAuthStarterOrchestrations,
} from '@orcha-user-auth-starter/shared/domain';
import { ClientOperation, ClientOrchestration, IClientOrchestration } from '@orcha/angular';

@ClientOrchestration(OrchaUserAuthStarterOrchestrations.user)
export class UserOrchestration implements IClientOrchestration<IUserOrchestration> {
  @ClientOperation()
  signUp!: IClientOrchestration<IUserOrchestration>['signUp'];
  @ClientOperation()
  login!: IClientOrchestration<IUserOrchestration>['login'];
  @ClientOperation()
  getProfile!: IClientOrchestration<IUserOrchestration>['getProfile'];
}
