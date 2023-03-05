import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export const getCreateUserDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class CreateUserDto {
    @IsEmail()
    @ApiProperty({ bananas: "bananas" })
    email: string;

    @IsString()
    @MinLength(2)
    firstName: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    nationality?: string;
  }

  return CreateUserDto;
};
