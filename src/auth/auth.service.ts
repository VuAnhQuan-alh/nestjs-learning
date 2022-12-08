import { Injectable } from '@nestjs/common';
import { ParamsLogin } from '../dto/auth';

@Injectable()
export class AuthService {
  signIn(params: ParamsLogin): string {
    console.log(params);
    return 'Login account!';
  }
  signUp(): string {
    return 'Create account!';
  }
  getProfile(): string {
    return 'Get information for me!';
  }
}
