export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mfaEnabled: boolean;
  secret: string;
  role: string;
}
