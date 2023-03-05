import { getCreateUserDto } from '@sample/dtos';
import { ApiProperty } from '@nestjs/swagger';

const _CreateUserDto = getCreateUserDto(ApiProperty);

export class CreateUserDto extends _CreateUserDto {}
