import { Request, Response } from 'express';
import AuthService from './auth.service';
import { GuardRole } from '../../core/guards/roles.guard';
import { IResponseSuccess } from '../../core/http/response-json';


export default class AuthController {
  constructor(private readonly authService: AuthService) {}

 async register(req: Request, res: Response, role:GuardRole) {

try {
  const data = await this.authService.register(req.body, role);
  const responseJson : IResponseSuccess = {
    success: true,
    message: "Registration successful",
    data: { 
       user: data.user,
       token: data.token
     }
  };
   return res.status(201).json(responseJson); 
}catch(err){
  return res.status(400).json({
    success: false,
    message: err.message,
  });
}
  }
}
