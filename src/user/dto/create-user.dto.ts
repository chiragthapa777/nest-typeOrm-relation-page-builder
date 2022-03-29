import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        description:"name of the user",
        type:String
    })
    name:string
}
