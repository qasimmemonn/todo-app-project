
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export enum AppRoute {
  LANDING = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  DASHBOARD = '/dashboard',
  PRIVACY = '/privacy',
  TERMS = '/terms'
}
