import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, PostModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
