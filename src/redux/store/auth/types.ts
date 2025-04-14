export interface IUser {
  id: string;
  phoneNumber: string;
  email: string;
}

export interface ISendCondeRequest {
  contact: string;
}
export interface IAuthResponse {
  user: IUser;
  token: string;
  message?: string;
}

export interface IAuthData {
  login?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

export interface IAuthError {
  message: string;
}

export interface IAuthState {
  isLoading: boolean;
  isAuth: boolean;
  user: IUser | null;
  message: string | null;
  goConfirmStep: boolean;
}
