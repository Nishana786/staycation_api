import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hashed: string) {
    return bcrypt.compare(password, hashed);
  }

  async generateToken(user: any) {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }
}
