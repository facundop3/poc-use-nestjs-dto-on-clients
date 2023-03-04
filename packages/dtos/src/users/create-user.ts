import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export const getCreateUserDto = (ApiPropertySwagger?: any) => {
  const ApiProperty = ApiPropertySwagger || function () {};

  class CreateUserDto {
    @IsString()
    @IsOptional()
    idempotencyKey?: string;

    @IsString()
    @IsOptional()
    authUuid?: string;

    @IsEmail()
    @ApiProperty({ bananas: "bananas" })
    email: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    userIdOld?: string;

    @IsNumber()
    @IsOptional()
    pep?: number;

    @IsNumber()
    @IsOptional()
    pepVerified?: number;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsNumber()
    @IsOptional()
    birthDate?: number;

    @IsString()
    @IsOptional()
    identificationValue?: string;

    @IsNumber()
    @IsOptional()
    identificationTypeId?: number;

    @IsString()
    @IsOptional()
    identificationTaxValue?: string;

    @IsNumber()
    @IsOptional()
    identificationTaxTypeId?: number;

    @IsString()
    @IsOptional()
    operationCountry?: string;

    @IsString()
    @IsOptional()
    nationality?: string;
  }

  return CreateUserDto;
};
