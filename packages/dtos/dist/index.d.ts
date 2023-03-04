export { validate } from 'class-validator';

declare const getCreateUserDto: (ApiPropertySwagger?: any) => {
    new (): {
        idempotencyKey?: string;
        authUuid?: string;
        email: string;
        phone?: string;
        firstName?: string;
        lastName?: string;
        userIdOld?: string;
        pep?: number;
        pepVerified?: number;
        gender?: string;
        birthDate?: number;
        identificationValue?: string;
        identificationTypeId?: number;
        identificationTaxValue?: string;
        identificationTaxTypeId?: number;
        operationCountry?: string;
        nationality?: string;
    };
};

export { getCreateUserDto };
