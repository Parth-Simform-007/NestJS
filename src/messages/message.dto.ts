import { IsDefined, IsString } from "class-validator";

export class createMessageDTO {
    @IsDefined()
    @IsString()
    content: string
}