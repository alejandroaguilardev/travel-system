import { UserInterface } from '../../domain/interfaces/user.interface';

export interface CreateUserRequest extends Omit<UserInterface, 'password'> {}
