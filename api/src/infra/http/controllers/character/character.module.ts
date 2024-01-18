import { CreateCharacterUseCase } from '@/domain/character/application/use-cases/create-character.use-case'
import { FindCharacterUseCase } from '@/domain/character/application/use-cases/find-character.use-case'
import { CharacterDetailsModule } from '@/infra/character-details/character-details.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { Module } from '@nestjs/common'

import { CharacterController } from './character.controller'

@Module({
  imports: [DatabaseModule, CharacterDetailsModule],
  controllers: [CharacterController],
  providers: [CreateCharacterUseCase, FindCharacterUseCase],
})
export class HTTCharacterModule {}
