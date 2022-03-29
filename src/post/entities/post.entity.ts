import { Tag } from "src/tag/entities/tag.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id:number

    @Column({
        type:'varchar',
        nullable:false
    })
    content:string

    @ManyToOne(()=>User,(user)=>user.posts,{onDelete: "CASCADE"})
    user:User

    @Column({
        type:"date",
        default:new Date()
    })
    createdAt:Date

    @ManyToMany(()=>Tag,(tag)=>tag.posts)
    @JoinTable()
    tags:Tag[]

}
