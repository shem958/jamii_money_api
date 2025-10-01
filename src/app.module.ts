import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GoalsModule } from './goals/goals.module';
import { ChamasModule } from './chamas/chamas.module';
import { NudgesModule } from './nudges/nudges.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UsersModule,
    WalletsModule,
    TransactionsModule,
    GoalsModule,
    ChamasModule,
    NudgesModule,
  ],
})
export class AppModule { }
