import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './users.dtos';

@Controller('users')
export class UsersController {
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return { ...createUserDto, sample: 'good job' };
  }
}
