// battleship.module.ts
import { Module } from '@nestjs/common';
import { BattleShipResolver } from './battleship.resolver';
import { BattleShipService } from './battleship.service';
import { GlobalSubscriptionsModule } from '../../subscriptions/subscriptions.module';

@Module({
    imports: [GlobalSubscriptionsModule],
    providers: [BattleShipResolver, BattleShipService]
})
export class BattleshipModule {}