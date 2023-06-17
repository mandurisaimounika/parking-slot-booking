import {
  Request
} from 'express';

//User interface
export interface User {
  firstname: string;
  lastname: string;
  email: string;
  token: string;
  role: 'admin' | 'standard';
}

//Extending Request Object by adding user object
export interface ExtendedRequest extends Request {
  user ? : User;
}