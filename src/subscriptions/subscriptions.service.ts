// subscriptions.service.ts
import { PubSub } from 'graphql-subscriptions';
import { Injectable, Inject } from '@nestjs/common';
import { Users } from 'src/user/user.entity';

@Injectable()
export class GlobalSubscriptionsService {
    constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}

    async userAdded(): Promise<AsyncIterator<Users[]>> {
        return this.pubSub.asyncIterator('userAdded');
    }

}