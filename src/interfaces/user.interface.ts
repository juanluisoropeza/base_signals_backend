export interface User {
  _id?: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  role: UserRole;
  gender: string;
  password?: string;
  active: boolean;
  createAt?: Date;
  updatedAt?: Date;
}

interface LoginResponse {
  token: string;
  user: User;
}

export enum UserRole {
  ADMIN = 'admin',
  SUPERADMIN = 'super-admin',
  CUSTOMER = 'customer',
}

type LoginError = 'PASSWORD_INCORRECT' | 'NOT_FOUND_USER';

export type LoginResult = LoginResponse | LoginError;
