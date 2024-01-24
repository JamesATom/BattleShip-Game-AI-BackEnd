// user.entity.ts
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    picture: string;
}

@ObjectType()
export class Users extends User {
    @Field(() => Int)
    score: number;
}