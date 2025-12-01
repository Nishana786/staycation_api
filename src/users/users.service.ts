import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  // ✅ CREATE USER (Plain password, no bcrypt)
  async create(data: any) {
    const user = this.userRepo.create({
      name: data.name,
      email: data.email,
      password: data.password,  // store plain password
      role: data.role || "user",
    });

    return await this.userRepo.save(user);
  }


  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findById(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
