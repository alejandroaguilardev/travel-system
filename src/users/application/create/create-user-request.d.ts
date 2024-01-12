export interface UserCreatorRequest {
  id: string;
  name: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  password: string;
  roles: string[];
}
