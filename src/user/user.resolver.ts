// user.resolver.ts
import { Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { User, Users } from './user.entity';
import { CreateUserInput } from './user.inputType';
import { UserService } from './user.service';
import { GlobalSubscriptionsService } from '../subscriptions/subscriptions.service';

@Resolver(() => User)
export class UserResolver {
    constructor(
            private globalSubscriptionsService: GlobalSubscriptionsService,
            private userService: UserService,
        ) {}

    @Mutation(() => User)
    async createUser(@Args('data') data: CreateUserInput): Promise<User> {
        return this.userService.createUser(data);
    }

    @Subscription(() => [Users])
    async userAdded(): Promise<AsyncIterator<Users[]>> {
        return this.globalSubscriptionsService.userAdded();
    }
}
