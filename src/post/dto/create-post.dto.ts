import { ApiProperty } from "@nestjs/swagger"
import { Tag } from "src/tag/entities/tag.entity"

export class CreatePostDto {
    @ApiProperty()
    content:string
    @ApiProperty()
    userId:number
    // @ApiProperty()
    // tags?:Array<Tag>
    @ApiProperty()
    tagList?:Array<string>
}
