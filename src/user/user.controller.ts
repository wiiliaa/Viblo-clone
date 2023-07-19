import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Delete, Get, Param, Body, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-uset.dto';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async find() {
    return this.usersService.find();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
  @Post('/me')
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.update(user, updateUserDto);
  }
}
