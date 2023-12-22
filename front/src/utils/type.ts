export interface ILogin extends RefreshToken {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export interface RefreshToken {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface ErrorRefreshToken {
  statusCode: number;
  timestamp: string;
  message: string;
  description: string;
}

export interface ErrorUser {
  statusCode: number;
  path: string;
  message: string;
  error: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  birth_date: string;
  roles: string[];
}
