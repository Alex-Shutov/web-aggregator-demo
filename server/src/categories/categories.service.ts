import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '@app/event/entities/event.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '@app/categories/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoriesRepository:Repository<CategoryEntity>) {}

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto as Partial<CategoryEntity>);
    return this.categoriesRepository.save(category);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  findOne(id: string) {
    return this.categoriesRepository.findOneBy({ id });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) return null;
    this.categoriesRepository.merge(category, updateCategoryDto as Partial<CategoryEntity>);
    return this.categoriesRepository.save(category);
  }

  async remove(id: string) {
    await this.categoriesRepository.delete(id);
    return { success: true };
  }
}
