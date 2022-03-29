import { CreateTagDto } from './../tag/dto/create-tag.dto';
import { Tag } from 'src/tag/entities/tag.entity';
import { ApiTags } from '@nestjs/swagger';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { createTracing } from 'trace_events';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@ApiTags('post')
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    try {
      // let tags=createPostDto.tagList
      // createPostDto.tags=[]
      // tags.map(async (tag)=> {
      //   try {
      //     let findTag= await this.tagRepository.findOne({where:{name:tag}})
      //     if(!findTag){
      //       let newTag=await this.tagRepository.save({name:tag})
      //       createPostDto.tags.push(newTag)
      //     }
      //     else{
      //       createPostDto.tags.push(findTag)
      //     }
      //   } catch (error) {
      //   }
      // })
      // let user=await this.userRepository.findOne({where:{id:createPostDto.userId}})
      // if(!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND)
      // let post={...createPostDto,user}
      // await this.postRepository.save(post)
      // return post

      //another way
      let newPost = new Post();
      let { content } = createPostDto;
      newPost.content = content;
      newPost.tags = [];
      if (createPostDto.tagList) {
        createPostDto.tagList.map(async (tag) => {
          try {
            let findTag = await this.tagRepository.findOne({
              where: { name: tag },
            });
            if (!findTag) {
              let newTag = await this.tagRepository.save({ name: tag });
              newPost.tags.push(newTag);
            } else {
              newPost.tags.push(findTag);
            }
          } catch (error) {
            throw error;
          }
        });
      }

      let user = await this.userRepository.findOne({
        where: { id: createPostDto.userId },
      });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      newPost.user = user;
      await this.postRepository.save(newPost);
      return newPost;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.postRepository.find({ relations: ['user', 'tags'] });
  }

  async findOne(id: number) {
    return await this.postRepository.findOne(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    return await this.postRepository.delete(id);
  }

  async paginate(options: IPaginationOptions) {
    const queryBuilder = this.postRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.createdAt');

    return paginate<Post>(queryBuilder, options);
  }
}
