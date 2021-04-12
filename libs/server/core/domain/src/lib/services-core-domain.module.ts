import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserRepository } from './user/user.repository';

const entities = TypeOrmModule.forFeature([UserEntity]);

const repositories: Provider[] = [UserRepository];

@Module({
  imports: [entities],
  providers: repositories,
  exports: repositories,
})
export class ServicesCoreDomainModule {}
