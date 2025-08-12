import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AdminSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    if (process.env.NODE_ENV !== 'development') {
      return; 
    }

    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin123';

    const existingAdmin = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = this.userRepository.create({
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });

      await this.userRepository.save(admin);
      console.log('Админ создан:', adminEmail);
    } else {
      console.log('ℹАдмин уже существует:', adminEmail, adminPassword);
    }
  }
}
