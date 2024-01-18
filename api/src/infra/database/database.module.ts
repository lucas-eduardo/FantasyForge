import { CharacterRepository } from '@/domain/character/application/repositories/character.repository'
import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { PrismaCharacterRepository } from './prisma/repositories/prisma-character.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: CharacterRepository,
      useClass: PrismaCharacterRepository,
    },
  ],
  exports: [PrismaService, CharacterRepository],
})
export class DatabaseModule {}
