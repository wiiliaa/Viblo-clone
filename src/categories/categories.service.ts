import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const category = new Category();
    category.name = name;
    await category.save();
    return category;
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findByName(name: string) {
    const found = await this.categoryRepository
      .createQueryBuilder('Category')
      .where('Category.name like :name', { name: `%${name}%` })
      .getMany();

    if (!found) {
      throw new InternalServerErrorException(`Category: ${name} non-exist`);
    }
    return found;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const post = await this.categoryRepository
      .createQueryBuilder('post')
      .update()
      .set(updateCategoryDto)
      .where('id = :id', { id })
      .execute();
    return post;
  }

  async delete(id: number) {
    let status = true;
    const target = await this.categoryRepository.delete(id);
    if (!target) {
      status = false;
    }
    return { status };
  }
}
