export { validate } from 'class-validator';

declare const getCreateUserDto: (ApiPropertySwagger?: any) => {
    new (): {
        email: string;
        firstName: string;
        lastName?: string;
        nationality?: string;
    };
};

export { getCreateUserDto };
