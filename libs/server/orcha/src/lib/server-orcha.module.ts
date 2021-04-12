import { Module } from '@nestjs/common';
import { ServicesCoreServicesModule } from '@orcha-user-auth-starter/server/core/services';
import { OrchaModule } from '@orcha/nestjs';
import { UserOrchestration } from './user/user.orchestration';

@Module({
  imports: [ServicesCoreServicesModule, OrchaModule.forFeature({ orchestrations: [UserOrchestration] })],
})
export class ServerOrchaModule {}
