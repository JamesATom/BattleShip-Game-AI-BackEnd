// battleship.inputType.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class JoinRoomInput {
    @Field()
    roomId: string;

    @Field()
    userId: string;
}

@InputType()
export class LeaveRoomInput {
    @Field()
    userId: string;
}

@InputType()
export class SetShipPositionsInput {
    @Field()
    userId: string;

    @Field()
    roomId: string;

    @Field()
    shipPositions: string;
}

@InputType()
export class ShipPositionsSetArgs {
    @Field()
    roomId: string;
}

@InputType()
export class LeaveRoomDuringGameInput {
    @Field()
    roomId: string;
}

@InputType()
export class BoardAttackInput {
    @Field()
    roomId: string;

    @Field()
    userId: string;

    @Field()
    attackPosition: string;
}

@InputType()
export class BoardAttackArgs {
    @Field()
    roomId: string;
}

@InputType()
export class YouWinInput {
    @Field()
    roomId: string;

    @Field()
    userId: string;
}

@InputType()
export class YouWinArgs {
    @Field()
    roomId: string;
}