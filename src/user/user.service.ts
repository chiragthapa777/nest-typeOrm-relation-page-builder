import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    try {
      // return await this.userRepository.save(user);

      //builder
      let resUser = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([user])
        .execute();
      return { id: resUser.identifiers[0].id, ...user };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      // return await this.userRepository.find({relations:['posts']});

      //query buider
      return await this.userRepository
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .leftJoinAndSelect("user.posts","posts")
        .getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      // let user=await this.userRepository.findOne({where:{
      //   id
      // }})
      // if(!user) throw new HttpException('user not found',HttpStatus.NOT_FOUND)
      // return user

      //query buider
      return await this.userRepository
        .createQueryBuilder()
        .select('user.name')
        .addSelect('user.id')
        .from(User, 'user')
        .where('user.id=:id', { id })
        .getOne();
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      // let user=await this.userRepository.findOne({where:{id}})
      // if(!user) throw new HttpException('user not found',HttpStatus.NOT_FOUND)
      // user={...user,...updateUserDto}
      // await this.userRepository.save(user)
      // return user

      console.log(updateUserDto);
      return await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set(updateUserDto)
        .where('id=:id', { id })
        .execute();
    } catch (error) {
      throw error;
    }
  }

  async remove(
    id: number, // :Promise<User>
  ) {
    try {
      // let user = await this.userRepository.findOne({ where: { id } });
      // if (!user)
      //   throw new HttpException('user not found', HttpStatus.NOT_FOUND);
      // await this.userRepository.delete(id);
      // return user;

      //builder

      return await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(User,"user")
      .where("user.id=:id",{id})
      .execute()
    } catch (error) {
      throw error;
    }
  }
}
