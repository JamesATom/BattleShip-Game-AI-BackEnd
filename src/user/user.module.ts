// user.module.ts
import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { GlobalSubscriptionsModule } from '../subscriptions/subscriptions.module'

@Module({
    imports: [GlobalSubscriptionsModule],
    providers: [UserResolver, UserService]
})
export class UserModule {}