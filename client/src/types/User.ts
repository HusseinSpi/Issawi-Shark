export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
  age: string;
  github: string;
  about: string;
  photo?: string;
}

export interface ResetPasswordData {
  resetToken: string;
  password: string;
  passwordConfirm: string;
}
