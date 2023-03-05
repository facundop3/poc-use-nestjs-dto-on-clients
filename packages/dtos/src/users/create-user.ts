import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export const getCreateUserDto = (ApiPropertySwagger?: any) => {
  // We did this to avoid having to include all nest dependencies related to ApiProperty on the client side too
  // With this approach the value of this decorator will be injected by the server but wont affect the client
  const ApiProperty = ApiPropertySwagger || function () {};

  class CreateUserDto {
    @IsEmail()
    @ApiProperty()
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
