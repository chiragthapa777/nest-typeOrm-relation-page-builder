import { UpdatePostDto } from './../post/dto/update-post.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}
  async create(createTagDto: CreateTagDto) {
    return await this.tagRepository.save(createTagDto);
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findOne(id: number) {
    return await this.tagRepository.findOne(id);
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    try {
      return await this.tagRepository.update(id, updateTagDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    return await this.tagRepository.delete(id);
  }
}
