import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private repo: Repository<Property>,
  ) {}

  findAll() {
    return this.repo.find({
      select: [
        'id',
        'title',
        'location',
        'price',
        'bedrooms',
        'image',
      ],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      select: [
        'id',
        'title',
        'location',
        'price',
        'bedrooms',
        'image',
      ],
    });
  }

  create(data: Partial<Property>) {
    const property = this.repo.create(data);
    return this.repo.save(property);
  }
}
