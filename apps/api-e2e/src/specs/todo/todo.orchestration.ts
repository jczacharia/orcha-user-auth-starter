import { INestApplication } from '@nestjs/common';
import {
  ITodoOrchestration,
  OrchaUserAuthStarterOrchestrations,
} from '@orcha-user-auth-starter/shared/domain';
import {
  createNestjsTestOrchestration,
  ITestOrchestration,
  TestOperation,
  TestOrchestration,
} from '@orcha/testing';

@TestOrchestration(OrchaUserAuthStarterOrchestrations.todo)
class TodoOrchestration implements ITestOrchestration<ITodoOrchestration> {
  @TestOperation()
  create!: ITestOrchestration<ITodoOrchestration>['create'];
  @TestOperation()
  read!: ITestOrchestration<ITodoOrchestration>['read'];
  @TestOperation()
  update!: ITestOrchestration<ITodoOrchestration>['update'];
  @TestOperation()
  delete!: ITestOrchestration<ITodoOrchestration>['delete'];
  @TestOperation()
  tag!: ITestOrchestration<ITodoOrchestration>['tag'];
  @TestOperation()
  untag!: ITestOrchestration<ITodoOrchestration>['untag'];
}

export function createTodoOrchestration(app: INestApplication) {
  return createNestjsTestOrchestration(app, TodoOrchestration);
}
