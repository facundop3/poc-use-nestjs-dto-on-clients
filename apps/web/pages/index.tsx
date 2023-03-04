import { getCreateUserDto, validate } from "@sample/dtos";
import { Button } from "ui";

const CreateUserDto = getCreateUserDto();

export default function Web() {
  const dtoInstance = new CreateUserDto();
  dtoInstance.email = "test";
  const result = validate(dtoInstance)
    .then((result: any) => console.log(result))
    .catch((err: any) => console.log(err));

  const userPayload: CreateUserDto = { email: "hello" };

  console.log(userPayload);

  console.log(Object.keys(result));
  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  );
}
