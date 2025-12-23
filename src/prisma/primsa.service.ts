// import { Injectable, OnModuleInit } from '@nestjs/common';

// import { PrismaPg } from '@prisma/adapter-pg';
// import { PrismaClient } from './generated/prisma/client';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   constructor() {
//     super({
//       adapter: new PrismaPg({
//         url: process.env.DATABASE_URL!,
//       }),
//     });
//   }
//   async onModuleInit() {
//     await this.$connect();
//   }
// }
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../prisma/prisma.client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }
  async onModuleInit() {
    try {
      await this.$queryRaw`SELECT 1`;
      Logger.log('Database connection established');
    } catch (error) {
      Logger.error('Database connection failed', error);
    }
  }
}
