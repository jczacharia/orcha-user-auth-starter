import { IOneToMany } from '@orcha/common';

export interface User {
  id: string;
  passwordHash: string;
  salt: string;
  dateCreated: Date | string;
  dateLastLoggedIn?: Date | string;
}
