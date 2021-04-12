import { Global, Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ServicesCoreDomainModule } from '@orcha-user-auth-starter/server/core/domain';
import { DbTransactionCreator } from './transaction-creator/transaction-creator.service';
import { UserService } from './user';

const services: Provider[] = [UserService, DbTransactionCreator];

@Global()
@Module({
  imports: [
    ServicesCoreDomainModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '14d' },
    }),
  ],
  providers: services,
  exports: services,
})
export class ServicesCoreServicesModule {}
