import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerOrchaModule } from '@orcha-user-auth-starter/server/orcha';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

jest.setTimeout(60000);

initializeTransactionalContext();
patchTypeORMRepositoryWithBaseRepository();

@Module({
  imports: [
    ServerOrchaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '1Qazxsw2',
      database: 'orcha-user-auth-starter-e2e',
      synchronize: true,
      autoLoadEntities: true,
      ssl: false,
    }),
  ],
})
export class AppTestModule {}
