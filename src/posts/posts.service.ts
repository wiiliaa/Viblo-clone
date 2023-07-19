import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { title, content } = createPostDto;
    const post = new Post();
    post.title = title;
    post.content = content;
    post.user_id = user.id;
    await post.save();
    return post;
  }

  findAll() {
    return this.postRepository.find();
  }

  async findOne(id: number) {
    return this.postRepository.find({ where: { id } });
  }

  async findByName(name: string) {
    const found = await this.postRepository
      .createQueryBuilder('Post')
      .where('Post.name like :name', { name: `%${name}%` })
      .getMany();

    if (!found) {
      throw new InternalServerErrorException(`Post: ${name} non-exist`);
    }
    return found;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .update()
      .set(updatePostDto)
      .where('id = :id', { id })
      .execute();
    return post;
  }
  async delete(id: number, userId: number): Promise<void> {
    // Kiểm tra xem bài đăng có tồn tại và thuộc về user hiện tại hay không
    const post = await this.postRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!post) {
      throw new NotFoundException('Post not found or not authorized to delete');
    }

    // Xóa bài đăng nếu nó thuộc về user hiện tại
    await this.postRepository.remove(post);
  }
}
