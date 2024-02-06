import { ProfileInterface } from './profile.interface';

export interface UserInterface {
  id: string;
  email: string;
  password: string;
  roles: string[];
  profile: ProfileInterface;
  user?: string;
  status?: string;
}
