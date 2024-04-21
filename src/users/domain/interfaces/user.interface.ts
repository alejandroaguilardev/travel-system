import { ProfileInterface } from './profile.interface';
import { UserAuthInterface } from './user-auth.interface';

export interface UserInterface {
  id: string;
  email: string;
  password: string;
  roles: string[];
  profile: ProfileInterface;
  user?: string;
  status?: string;
  auth?: UserAuthInterface;
  isAdvisor?: boolean;
  isDoctor?: boolean;
}
