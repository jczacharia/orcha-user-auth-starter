import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@orcha-user-auth-starter/server/core/domain';
import { User } from '@orcha-user-auth-starter/shared/domain';
import { IExactQuery, IParser, IProps, IQuery, parseQuery } from '@orcha/common';
import { FirebaseScrypt } from 'firebase-scrypt';
import * as uuid from 'uuid';

type Token = string;

export interface Sign {
  userId: string;
}

@Injectable()
export class UserService {
  /**
   * This library is super easy to use. (Same scrypt implementation Firebase uses.)
   */
  scrypt = new FirebaseScrypt({
    memCost: 14,
    rounds: 8,
    saltSeparator: 'Bw==',
    signerKey: 'qUmhMeByCl+H+YaT4RlH/kri/BLQEkCRrySxVqrODKR8MIhwU49k3WzyZJtr1R3dgQXDPq+7LUmIs+vuFdp8Nw==',
  });

  constructor(private readonly userRepo: UserRepository, private readonly jwtService: JwtService) {}

  async login(id: string, pass: string, query: IQuery<{ token: string }>) {
    const user = await this.userRepo.findOne(id);

    if (!user) {
      throw new HttpException(`User "${id}" does not exist.`, HttpStatus.NOT_FOUND);
    }

    const compare = await this.scrypt.verify(pass, user.salt, user.passwordHash);
    if (!compare) {
      throw new HttpException(`Incorrect password.`, HttpStatus.UNAUTHORIZED);
    }

    await this.userRepo.update(user.id, { dateLastLoggedIn: new Date() });
    const token = this.sign({ userId: id });
    return parseQuery(query, { token });
  }

  async signUp(id: string, password: string, query: IQuery<{ token: string }>) {
    const conflictingUser = await this.userRepo.findOne(id, { id: true });

    if (conflictingUser?.id) {
      throw new HttpException(`User with email "${conflictingUser.id}" already exists.`, HttpStatus.CONFLICT);
    }

    const salt = uuid.v4();
    const passwordHash = await this.scrypt.hash(password, salt);
    await this.userRepo.upsert({
      id,
      passwordHash,
      salt,
      dateCreated: new Date(),
    });
    const token = this.sign({ userId: id });
    return parseQuery(query, { token });
  }

  /**
   * Authenticates a user by token.
   * @param token User auth token.
   * @returns The user entity associated with the token.
   */
  async verifyUserToken(token?: string): Promise<IProps<User>>;
  async verifyUserToken<Q extends IQuery<User>>(
    token: string,
    query: IExactQuery<User, Q>
  ): Promise<IParser<User, Q>>;
  async verifyUserToken<Q extends IQuery<User>>(token?: string, query?: IExactQuery<User, Q>) {
    if (!token) {
      throw new HttpException(
        `Unable to verify authentication token. No Token given.`,
        HttpStatus.UNAUTHORIZED
      );
    }

    let sign: Sign | undefined;

    try {
      sign = await this.getTokenOwner(token);
    } catch (e) {
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }

    if (!sign.userId) {
      throw new HttpException(
        `Unable to verify authentication token. No user associated with given token.`,
        HttpStatus.UNAUTHORIZED
      );
    }

    try {
      return query
        ? await this.userRepo.findOneOrFail(sign.userId, query)
        : await this.userRepo.findOneOrFail(sign.userId);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        `Auth token validation failed: No user found with id "${sign.userId}".`,
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  private sign(sign: Sign): Token {
    return this.jwtService.sign(sign);
  }

  private getTokenOwner(token: string): Promise<Sign> {
    return this.jwtService.verifyAsync(token);
  }
}
