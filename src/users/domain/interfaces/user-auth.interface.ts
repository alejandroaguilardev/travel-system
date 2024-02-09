export interface UserAuthInterface {
  admin: boolean;
  rememberToken: string;
  lastLogin?: Date;
}
