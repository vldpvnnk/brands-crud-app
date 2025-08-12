import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}


  async validateUser(email: string, pass: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) return null;
  
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(email: string, password: string) {
    const exists = await this.usersRepo.findOne({ where: { email } });
    if (exists) throw new UnauthorizedException('User exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const u = this.usersRepo.create({ email, password: hashedPassword });
    return this.usersRepo.save(u);
  }
  
}
