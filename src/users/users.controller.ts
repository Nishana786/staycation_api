import { Controller, Get, Param, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // REGISTER (no hashing)
  @Post('register')
  async register(@Body() body: any) {
    const user = await this.usersService.create({
      name: body.name,
      email: body.email,
      password: body.password,   // ✔ store plain password
    });

    return { message: 'User registered successfully', user };
  }

  // LOGIN (compare plain password)
  @Post('login')
  async login(@Body() body: any) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user) throw new UnauthorizedException('Invalid email');

    // ✔ plain password check
    if (body.password !== user.password) {
      throw new UnauthorizedException('Invalid password');
    }

    // ✔ generate JWT (token generation stays same)
    const token = await this.authService.generateToken(user);

    return { access_token: token, user };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
}
