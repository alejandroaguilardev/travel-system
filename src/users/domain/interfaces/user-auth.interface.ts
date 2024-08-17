export interface UserAuthInterface {
  admin: boolean;
  user: boolean;
  rememberToken?: string;
  lastLogin?: Date;
}
