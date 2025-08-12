import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private repo: Repository<Brand>,
  ) {}

  create(data: Partial<Brand>) {
    const b = this.repo.create(data);
    return this.repo.save(b);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const b = await this.repo.findOne({ where: { id } });
    if (!b) throw new NotFoundException('Brand not found');
    return b;
  }

  async update(id: string, data: Partial<Brand>) {
    await this.findOne(id);
    await this.repo.update({ id } as any, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const b = await this.findOne(id);
    return this.repo.remove(b);
  }
}
