import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";
import { AuthValidationTexts } from "../constants";

export class SignUpDto {
    @ApiProperty({
        description: AuthValidationTexts.signUp.email
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: AuthValidationTexts.signUp.password
    })
    @Matches(/^(?=.*\d).{6,}$/, {message: AuthValidationTexts.signUp.password})
    password: string;

    @ApiProperty({
        description: AuthValidationTexts.notEmpty
    })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({
        description: AuthValidationTexts.notEmpty
    })
    @IsString()
    @IsNotEmpty()
    lastName: string;
}
