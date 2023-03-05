import { getCreateUserDto } from '@sample/dtos';
import { ApiProperty } from '@nestjs/swagger';

// Here we send `ApiProperty` dependency to  be added to`CreateUserDto`
export const _CreateUserDto = getCreateUserDto(ApiProperty);

// This allows using it as a TS type and as a constructor class
export class CreateUserDto extends _CreateUserDto {}
