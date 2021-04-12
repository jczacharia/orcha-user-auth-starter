import { INestApplication } from '@nestjs/common';
import {
  IUserOrchestration,
  OrchaUserAuthStarterOrchestrations,
} from '@orcha-user-auth-starter/shared/domain';
import {
  createNestjsTestOrchestration,
  ITestOrchestration,
  TestOperation,
  TestOrchestration,
} from '@orcha/testing';

@TestOrchestration(OrchaUserAuthStarterOrchestrations.user)
class UserOrchestration implements ITestOrchestration<IUserOrchestration> {
  @TestOperation()
  signUp!: ITestOrchestration<IUserOrchestration>['signUp'];
  @TestOperation()
  login!: ITestOrchestration<IUserOrchestration>['login'];
  @TestOperation()
  getProfile!: ITestOrchestration<IUserOrchestration>['getProfile'];
}

export function createUserOrchestration(app: INestApplication) {
  return createNestjsTestOrchestration(app, UserOrchestration);
}
