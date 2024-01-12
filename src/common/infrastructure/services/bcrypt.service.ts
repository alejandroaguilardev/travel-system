import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hashing } from '../../application/services/hashing';

@Injectable()
export class BcryptService implements Hashing {
  private readonly saltRounds = parseInt(process.env?.SALT_ROUNDS, 10) || 10;

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  comparePasswords(plainTextPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }
}
