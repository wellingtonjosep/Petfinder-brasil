export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  contact: string;
  isAdm: boolean;
  password: string;
}

export interface IUserUpdate {
  id: string;
  name?: string;
  email?: string;
  contact?: string;
  password?: string;
}
