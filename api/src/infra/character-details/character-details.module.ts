import { CharacterDetails } from '@/domain/character/application/character-details/character-details'
import { Module } from '@nestjs/common'

import { EnvModule } from '../env/env.module'
import { OpenAICharacterDetails } from './openai/openai-character-details'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: CharacterDetails,
      useClass: OpenAICharacterDetails,
    },
  ],
  exports: [CharacterDetails],
})
export class CharacterDetailsModule {}
