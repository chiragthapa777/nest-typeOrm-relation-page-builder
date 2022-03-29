import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Post,User,Tag])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
