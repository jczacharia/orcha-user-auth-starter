import { IKirtanTypeormRepository } from '@kirtan/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends IKirtanTypeormRepository<UserEntity> {
  constructor(@InjectRepository(UserEntity) public readonly repo: Repository<UserEntity>) {
    super(repo);
  }
}