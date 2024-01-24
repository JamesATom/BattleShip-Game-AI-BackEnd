// user.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prismaDB/prisma.service';
import { User } from './user.entity';
import { CreateUserInput } from './user.inputType';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class UserService {
    constructor(@Inject('PUB_SUB') private pubSub: PubSub, private prisma: PrismaService) {}

    async createUser(data: CreateUserInput): Promise<User> {
        try {
            const user = await this.prisma.user.upsert({
                where: { email: data.email },
                update: { name: data.name, picture: data.picture }, 
                create: {
                    name: data.name,
                    email: data.email,
                    picture: data.picture,
                }  
            });
            this.pubSub.publish('userAdded', { userAdded: await this.prisma.user.findMany() });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}
