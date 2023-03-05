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
