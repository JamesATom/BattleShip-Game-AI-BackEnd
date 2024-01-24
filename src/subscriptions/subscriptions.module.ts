// subscriptions.module.ts
import { Module } from '@nestjs/common';
import { GlobalSubscriptionsService } from './subscriptions.service';

@Module({
    providers: [GlobalSubscriptionsService],
    exports: [GlobalSubscriptionsService],
})
export class GlobalSubscriptionsModule {}