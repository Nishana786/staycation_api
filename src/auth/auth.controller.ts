import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('users')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  // REGISTER USER (no admin)
  @Post('register')
  async register(@Body() body: any) {
    console.log("BODY RECEIVED:", body);

    const user = await this.usersService.create({
      name: body.name,
      email: body.email,
      password: body.password,   
    });

    return { message: 'User registered successfully', user };
  }

  // LOGIN USER 
  @Post('login')
  async login(@Body() body: any) {
    const user = await this.usersService.findByEmail(body.email);

    if (!user) throw new UnauthorizedException('Invalid email');

    const isValid = await this.authService.comparePassword(
      body.password,
      user.password,
    );

    if (!isValid) throw new UnauthorizedException('Invalid password');

    const token = await this.authService.generateToken(user);

    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
