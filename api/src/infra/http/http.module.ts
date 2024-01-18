import { Module } from '@nestjs/common'

import { HTTCharacterModule } from './controllers/character/character.module'

@Module({
  imports: [HTTCharacterModule],
})
export class HttpModule {}
