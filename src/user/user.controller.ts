import { Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Delete, Get, Param, Body } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-uset.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get('')
  async find() {
    return this.usersService.find();
  }

  // @Get('/:email')
  // async findOne(@Param('email') email: string) {
  //   return this.usersService.findByEmail(email);
  // }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
  @Post('/me')
  @UseGuards(AuthGuard())
  async update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.update(user, updateUserDto);
  }
}
