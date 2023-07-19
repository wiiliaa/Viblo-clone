import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const { content } = createCommentDto;
    const comment = new Comment();
    comment.content = content;
    await comment.save();
    return comment;
  }

  findAll() {
    return this.commentRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }
  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const post = await this.commentRepository
      .createQueryBuilder('comment')
      .update()
      .set(updateCommentDto)
      .where('id = :id', { id })
      .execute();
    return post;
  }

  async delete(id: number) {
    let status = true;
    const target = await this.commentRepository.delete(id);
    if (!target) {
      status = false;
    }
    return { status };
  }
}
