// battleship.entity.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JoinRoomResponse {
    @Field()
    message: string;

    @Field()
    statusCode: number;
}

@ObjectType()
export class LeaveRoomResponse {
    @Field()
    message: string;

    @Field()
    statusCode: number;
}

@ObjectType()
export class ShipPositionsSetResponse {
    @Field()
    message: string;

    @Field()
    statusCode: number;
}

@ObjectType()
export class LeaveRoomDuringGameResponse {
    @Field()
    message: string;

    @Field()
    statusCode: number;

    @Field()
    userId: number;
}

@ObjectType()
export class BoardAttackResponse {
    @Field()
    isHit: boolean;

    @Field()
    attackPosition: number;
}

@ObjectType()
export class YouWinResponse {
    @Field()
    message: string;

    @Field()
    statusCode: number;
}