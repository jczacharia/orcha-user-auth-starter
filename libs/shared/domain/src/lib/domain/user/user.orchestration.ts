import { User } from '@orcha-user-auth-starter/shared/domain';
import { IOperation } from '@orcha/common';
import { LoginDto, SignUpDto } from './user.dtos';

export interface IUserOrchestration {
  login: IOperation<{ token: string }, LoginDto>;
  signUp: IOperation<{ token: string }, SignUpDto>;
  getProfile: IOperation<User>;
}
