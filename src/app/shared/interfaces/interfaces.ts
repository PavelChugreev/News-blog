export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean
}

export interface IPost {
  _id?: string;
  title: string;
  author: string;
  content: string;
  date: Date;
}

export interface IFormError {
  code: number;
  message: string;
}

export interface IFbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface IFbPostResponse {
  name: string;
}

export interface IAlert {
  text?: string;
  type?: AlertType;
  open: boolean;
}

export enum AlertTypes {
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}

export type AlertType = AlertTypes.SUCCESS | AlertTypes.WARNING | AlertTypes.DANGER;