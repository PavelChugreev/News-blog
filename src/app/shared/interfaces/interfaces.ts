export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean
}

export interface IPost {
  id?: number;
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