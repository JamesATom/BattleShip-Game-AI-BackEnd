// battleship.resolver.ts
import { Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { BattleShipService } from './battleship.service';
import { 
    JoinRoomInput, 
    LeaveRoomInput, 
    SetShipPositionsInput, 
    ShipPositionsSetArgs,
    LeaveRoomDuringGameInput,
    BoardAttackInput,
    BoardAttackArgs,
    YouWinInput,
    YouWinArgs } from './battleship.inputType';
import { 
    JoinRoomResponse, 
    LeaveRoomResponse, 
    ShipPositionsSetResponse,
    LeaveRoomDuringGameResponse,
    BoardAttackResponse,
    YouWinResponse } from './battleship.entity';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { GlobalSubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { Users } from 'src/user/user.entity';

@Resolver()
export class BattleShipResolver {
    constructor(
        @Inject('PUB_SUB') private pubSub: PubSub,
        private globalSubscriptionsService: GlobalSubscriptionsService, 
        private battleShipService: BattleShipService) {}

    @Mutation(() => JoinRoomResponse)
    async joinRoom(@Args('data') data: JoinRoomInput): Promise<JoinRoomResponse> {
        return this.battleShipService.joinRoom(data);
    }

    @Mutation(() => LeaveRoomResponse)
    async leaveRoom(@Args('data') data: LeaveRoomInput): Promise<LeaveRoomResponse> {
        return this.battleShipService.leaveRoom(data);
    }

    @Mutation(() => ShipPositionsSetResponse)
    async setShipPositions(@Args('data') data: SetShipPositionsInput): Promise<ShipPositionsSetResponse> {
        return this.battleShipService.setShipPositions(data);
    }

    @Subscription(() => ShipPositionsSetResponse, {
        filter: (payload, variables) => {
            return payload.roomId == variables.data.roomId;
        },
    })
    async shipPositionsSet(@Args('data') data: ShipPositionsSetArgs): Promise<AsyncIterator<ShipPositionsSetResponse>> {
        return this.pubSub.asyncIterator('shipPositionsSet');
    }

    @Mutation(() => LeaveRoomDuringGameResponse)
    async leaveRoomDuringGame(@Args('data') data: LeaveRoomInput): Promise<LeaveRoomDuringGameResponse> {
        return this.battleShipService.leaveRoomDuringGame(data);
    }

    @Subscription(() => LeaveRoomDuringGameResponse, {
        filter: (payload, variables) => {
            return payload.roomId == parseInt(variables.data.roomId);
        },
    })
    async leaveRoomDuringGameSubscription(@Args('data') data: LeaveRoomDuringGameInput): Promise<AsyncIterator<LeaveRoomDuringGameResponse>> {
        return this.pubSub.asyncIterator('leaveRoomDuringGameSubscription');
    }

    @Mutation(() => BoardAttackResponse)
    async attackToBoard(@Args('data') data: BoardAttackInput): Promise<BoardAttackResponse> {
        return this.battleShipService.attackToBoard(data);
    }

    @Subscription(() => BoardAttackResponse, {
        filter: (payload, variables) => {
            return payload.roomId == parseInt(variables.data.roomId);
        },
    })
    async attackToBoardSubscription(@Args('data') data: BoardAttackArgs): Promise<AsyncIterator<BoardAttackResponse>> {
        return this.pubSub.asyncIterator('attackToBoardSubscription');
    }

    @Mutation(() => YouWinResponse)
    async youWin(@Args('data') data: YouWinInput): Promise<YouWinResponse> {
        return this.battleShipService.youWin(data);
    }

    @Subscription(() => YouWinResponse, {
        filter: (payload, variables) => {
            return payload.roomId == parseInt(variables.data.roomId);
        },
    })
    async youWinSubscription(@Args('data') data: YouWinArgs): Promise<AsyncIterator<YouWinResponse>> {
        return this.pubSub.asyncIterator('youWinSubscription');
    }

    @Subscription(() => [Users])
    async userAdded(): Promise<AsyncIterator<Users[]>> {
        return this.globalSubscriptionsService.userAdded();
    }
}