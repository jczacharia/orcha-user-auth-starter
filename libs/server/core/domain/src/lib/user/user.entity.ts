import { User } from '@orcha-user-auth-starter/shared/domain';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity implements Required<User> {
  @PrimaryColumn('text')
  id!: string;

  @Column()
  passwordHash!: string;

  @Column()
  salt!: string;

  @Column()
  dateCreated!: Date;

  @Column({ nullable: true })
  dateLastLoggedIn!: Date;
}
