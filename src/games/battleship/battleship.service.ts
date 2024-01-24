// battleship.service.ts
import { Injectable, Inject, HttpStatus } from "@nestjs/common";
import { PrismaService } from 'src/prismaDB/prisma.service';
import { 
    JoinRoomInput, 
    LeaveRoomInput, 
    SetShipPositionsInput,
    BoardAttackInput,
    YouWinInput } from './battleship.inputType';
import { 
    JoinRoomResponse, 
    LeaveRoomResponse, 
    ShipPositionsSetResponse,
    LeaveRoomDuringGameResponse,
    BoardAttackResponse,
    YouWinResponse } from './battleship.entity';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class BattleShipService {
    constructor(@Inject('PUB_SUB') private pubSub: PubSub, private prisma: PrismaService) {}

    async joinRoom(data: JoinRoomInput): Promise<JoinRoomResponse> {
        const userId = Number(data.userId);
        const roomId = Number(data.roomId);
        
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            return { message: 'User not found.', statusCode: HttpStatus.NOT_FOUND };
        }
    
        const rooms = await this.prisma.gamesession.findMany({ where: { roomId } });
        const roomExists = rooms.length > 0;
        const numberOfPlayers = roomExists ? rooms.length : 0;
    
        if (numberOfPlayers >= 2) {
            return { message: 'The room is full.', statusCode: HttpStatus.FORBIDDEN };
        } else if (numberOfPlayers == 1) {
            await this.prisma.gamesession.upsert({
                where: { userId },
                update: {
                    roomId,
                },
                create: {
                    userId,
                    roomId,
                },
            });
        }
    
        if (!roomExists) {
            await this.prisma.gamesession.upsert({
                where: { userId },
                update: {
                    roomId,
                },
                create: {
                    userId,
                    roomId,
                },
            });
        }
        
        return { message: 'Successfully joined the room.', statusCode: HttpStatus.OK };
    }

    async leaveRoom(data: LeaveRoomInput): Promise<LeaveRoomResponse> {
        const userId = Number(data.userId);
    
        return this.prisma.$transaction(async (prisma) => {
            const updatedUser = await prisma.gamesession.update({
                where: { userId },
                data: {
                    roomId: 0,
                },
            });

            await prisma.gamesession.update({
                where: { userId: updatedUser.userId },
                data: {
                    isReady: false,
                },
            });
    
            return { message: 'Successfully left the room.', statusCode: HttpStatus.OK };
        }).catch((error) => {
            console.log(error);
            return { message: 'Failed to leave the room.', statusCode: HttpStatus.INTERNAL_SERVER_ERROR };
        });
    }

    async setShipPositions(data: SetShipPositionsInput): Promise<ShipPositionsSetResponse> {
        const userId = Number(data.userId);
        const roomId = Number(data.roomId);
        const shipPositions = data.shipPositions.split(', ').map(String);

        await this.prisma.gamesession.update({
            where: { userId },
            data: {
                isReady: true,
            },
        });

        await this.prisma.battleshipPositions.create({
            data: {
                userId,
                roomId,
                position: shipPositions
            },
        });

        const users = await this.prisma.gamesession.findMany({ where: { roomId } });
        const allUsersReady = users.every((user) => user.isReady);
        
        if (users.length > 1 && allUsersReady) {
            this.pubSub.publish('shipPositionsSet', { 
                roomId: roomId,
                shipPositionsSet: {
                    message: 'Starting the game!', 
                    statusCode: HttpStatus.OK 
                }
            });
            return { message: 'Starting the game!', statusCode: HttpStatus.OK };
        } else {
            this.pubSub.publish('shipPositionsSet', { 
                roomId: roomId,
                shipPositionsSet: {
                    message: 'Waiting for the other player to set their ships.', 
                    statusCode: HttpStatus.PROCESSING
                }
            }); 
            return { message: 'Waiting for the other player to set their ships.', statusCode: HttpStatus.PROCESSING }; 
        }
    }

    async leaveRoomDuringGame(data: LeaveRoomInput): Promise<LeaveRoomDuringGameResponse> {
        const userId = Number(data.userId);

        const gameSession = await this.prisma.gamesession.findUnique({ where: { userId } });
        const roomId = gameSession.roomId;
        
        await this.prisma.gamesession.updateMany({
            where: { roomId },
            data: {
                isReady: false,
                roomId: 0,
            },
        });
        
        this.pubSub.publish('leaveRoomDuringGameSubscription', { 
            roomId: roomId,
            leaveRoomDuringGameSubscription: {
                message: 'Successfully left the room.', 
                statusCode: HttpStatus.OK,
                userId: userId
            }
        });
        return { 
            message: 'Successfully left the room.', 
            statusCode: HttpStatus.OK, 
            userId: userId };
    }

    async attackToBoard(data: BoardAttackInput): Promise<BoardAttackResponse> {
        const userId = Number(data.userId);
        const roomId = Number(data.roomId);
        const attackPosition = Number(data.attackPosition);
        
        const usersInRoom = await this.prisma.gamesession.findMany({ where: { roomId } });
        const otherUser = usersInRoom.find((user) => user.userId != userId);

        const otherUserPositions = await this.prisma.battleshipPositions.findMany({ 
            where: { userId: otherUser.userId },
            orderBy: {
                id: 'desc'
            },
            take: 1,
        });

        const positionsArray = otherUserPositions[0].position[0].split(',').map(Number);
        const positionsSet = new Set(positionsArray);
        const isHit = positionsSet.has(attackPosition);
        
        this.pubSub.publish('attackToBoardSubscription', { 
            roomId: roomId,
            attackToBoardSubscription: { isHit, attackPosition }
        });

        return { isHit, attackPosition };
    }

    async youWin(data: YouWinInput): Promise<YouWinResponse> {
        const userId = Number(data.userId);
        const roomId = Number(data.roomId);

        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                score: {
                    increment: 1,
                },
            },
        });

        await this.prisma.gamesession.updateMany({
            where: { roomId },
            data: {
                isReady: false,
                roomId: 0,
            },
        });

        this.pubSub.publish('youWinSubscription', { 
            roomId: roomId,
            youWinSubscription: {
                message: 'You lost a game of Battleship to ' + updatedUser.name + '.', 
                statusCode: userId
            }
        });

        setTimeout(async () => {
            this.pubSub.publish('userAdded', { userAdded: await this.prisma.user.findMany() });
        }, 2000);
        
        return { message: 'You win!', statusCode: HttpStatus.OK };
    }
}