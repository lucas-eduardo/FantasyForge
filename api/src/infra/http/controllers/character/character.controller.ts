import { CreateCharacterUseCase } from '@/domain/character/application/use-cases/create-character.use-case'
import { FindCharacterUseCase } from '@/domain/character/application/use-cases/find-character.use-case'
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'

import { CharacterPresenter } from './character.presenter'

@Controller('/characters')
export class CharacterController {
  constructor(
    private createCharacterUseCase: CreateCharacterUseCase,
    private findCharacterUseCase: FindCharacterUseCase,
  ) {}

  @Post()
  @HttpCode(201)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(@Body() body: any) {
    await this.createCharacterUseCase.execute(body)
  }

  @Get()
  async find() {
    const result = await this.findCharacterUseCase.execute()

    return result.value?.map(CharacterPresenter.toHTTP)
  }
}
