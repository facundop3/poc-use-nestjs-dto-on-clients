# POC use nestjs dtos on client

### The first step to archive this is packaging the DTOs on a separated package, that will come with the following advantages:

- Prevents duplication between multiple apps and allows to share them between multiples apps.
- Integrity, if the DTO validations changes you’ll get that changes in all your apps.
- You can use it on your clients too, allowing frontends to ran same validations that in your controlling, preventing unnecessary API calls.

### Tips:

1. We used [**tsup](https://tsup.egoist.dev/#what-can-it-bundle)** for the packaging, it’s a really easy way to ge it working
2. Keep the dependencies of the packages  neutral (no backend or frontend specific code)

## Our implementation:

We use [ApiProperty](https://docs.nestjs.com/openapi/types-and-parameters#types-and-parameters) from from `'@nestjs/swagger’`  but this has a dependency with `@nestjs/core` and some additional stuff that is only server related.

Our way to solve this was to create a function that takes [ApiProperty](https://docs.nestjs.com/openapi/types-and-parameters#types-and-parameters) decorator as a optional parameter, we set the default value as an empty function (a no effect decorator). 

This is our implementation:

### [Packaged DTO (runs in front and backend):](https://github.com/facundop3/poc-use-nestjs-dto-on-clients/blob/main/packages/dtos/src/users/create-user.ts)

```tsx
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
```

### [Backend usage:](https://github.com/facundop3/poc-use-nestjs-dto-on-clients/blob/main/apps/sample-api/src/users/users.dtos.ts)

After doing the following in tour DTO file, you can use it as any other nestjs DTO

```jsx
import { getCreateUserDto } from '@sample/dtos';
import { ApiProperty } from '@nestjs/swagger';
// Here we send `ApiProperty` dependency to  be added to`CreateUserDto`
export const _CreateUserDto = getCreateUserDto(ApiProperty);

// This allows using it as a TS type and as a constructor class
export class CreateUserDto extends _CreateUserDto {} 
```

### [Client usage:](https://github.com/facundop3/poc-use-nestjs-dto-on-clients/blob/main/apps/web/pages/index.tsx)

```tsx
import { getCreateUserDto } from "@sample/dtos";

// We don't need `ApiProperty` on the client,
// so it will fallback on the default empty decorator 
const _CreateUserDto = getCreateUserDto();

class CreateUserDto extends _CreateUserDto {}
```

### [Use the DTOs on the frontend:](https://github.com/facundop3/poc-use-nestjs-dto-on-clients/blob/main/apps/web/pages/index.tsx)

If we go int nestjs implementation of DTS we’ll see that they use `class-validator` so we can `use react-hook-forms` + `@hookform/resolvers/class-validator` to use them as validators for our forms:

```tsx
import { getCreateUserDto } from "@sample/dtos";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  ChakraProvider,
  Flex,
  Input,
  Button,
  theme,
  Heading,
} from "@chakra-ui/react";
import get from "lodash.get";
import { useState } from "react";

// We don't need `ApiProperty` on the client,
// so it will fallback on the default empty decorator
const _CreateUserDto = getCreateUserDto();
// This allows using it as a TS type and as a constructor class
class CreateUserDto extends _CreateUserDto {}

const resolver = classValidatorResolver(CreateUserDto);

export default function Web() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver,
    shouldFocusError: false,
  });

  const submitData = (validatedData: CreateUserDto) => {
    postUser(validatedData);
  };

  const [nestResponse, setNestResponse] = useState<any>(null);

  const emailError = get(errors, "email.message");
  const firstNameError = get(errors, "firstName.message");
  const lastNameError = get(errors, "lastName.message");
  const nationalityError = get(errors, "nationality.message");

  const notValidatedData = watch();

  const postUser = async (user: CreateUserDto) => {
    fetch("http://localhost:4000/users", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        setNestResponse(data);
      });
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        as="form"
        onSubmit={handleSubmit(submitData)}
        noValidate
        flexDir={"column"}
        p={4}
      >
        <FormControl isInvalid={Boolean(emailError)}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" {...register("email")} />
          {!emailError && <FormHelperText>share your email.</FormHelperText>}
          <FormErrorMessage>{emailError}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(firstNameError)}>
          <FormLabel>First Name</FormLabel>
          <Input {...register("firstName")} />
          {!firstNameError && <FormHelperText>type your name.</FormHelperText>}
          <FormErrorMessage>{firstNameError}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(lastNameError)}>
          <FormLabel>Last name</FormLabel>
          <Input {...register("lastName")} />
          {!lastNameError && <FormHelperText>this is optional.</FormHelperText>}
          <FormErrorMessage>{lastNameError}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(nationalityError)}>
          <FormLabel>Nationality</FormLabel>
          <Input {...register("nationality")} />
          {!nationalityError && <FormHelperText>🇺🇾</FormHelperText>}
          <FormErrorMessage>{nationalityError}</FormErrorMessage>
        </FormControl>

        <Button bg="green.500" color="white" type="submit" w="fit-content">
          Run DTO validation in the client + in the server
        </Button>
      </Flex>
      <Flex p="4" flexDir={"column"}>
        <Button
          bg="red"
          onClick={() => postUser(notValidatedData)}
          w="fit-content"
        >
          Run DTO only in the server
        </Button>
        <Heading>Controller response: </Heading>
        <pre>{JSON.stringify(nestResponse, null, 2)}</pre>
      </Flex>
    </ChakraProvider>
  );
}
```