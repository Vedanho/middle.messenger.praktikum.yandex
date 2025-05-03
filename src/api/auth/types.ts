export interface SignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignInData {
  login: string;
  password: string;
}

export type SignUpResponse = {
  id: number
}

export type ApiError = {
  error: string,
  reason: string,
}
