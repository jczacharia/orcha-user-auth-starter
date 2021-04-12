import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerOrchaModule } from '@orcha-user-auth-starter/server/orcha';
import { environment } from '@orcha-user-auth-starter/shared/domain';

@Module({
  imports: [ServerOrchaModule, TypeOrmModule.forRoot(environment.typeOrmConfig)],
})
export class AppModule {}
