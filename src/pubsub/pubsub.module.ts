// core.module.ts
import { Module, Global } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Global()
@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
