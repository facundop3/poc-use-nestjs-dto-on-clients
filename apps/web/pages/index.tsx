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
  useBoolean,
} from "@chakra-ui/react";
import get from "lodash.get";

const _CreateUserDto = getCreateUserDto();

class CreateUserDto extends _CreateUserDto {}

const resolver = classValidatorResolver(CreateUserDto);

export default function Web() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver,
    shouldFocusError: false,
  });

  const submitData = (data: CreateUserDto) => {
    console.log("submitData: ", data);
  };

  console.log("error: ", errors);

  const emailError = get(errors, "email.message");
  const firstNameError = get(errors, "firstName.message");
  const lastNameError = get(errors, "lastName.message");
  const nationalityError = get(errors, "nationality.message");

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
          Send
        </Button>
      </Flex>
    </ChakraProvider>
  );
}
