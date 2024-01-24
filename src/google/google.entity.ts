import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GoogleConfig {
    @Field()
    clientID: string;
}