export interface Hashing {
  hashPassword(password: string): string;

  comparePasswords(plainTextPassword: string, hashedPassword: string): boolean;
}
