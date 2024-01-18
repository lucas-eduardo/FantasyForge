import { Either, right } from '@/core/either'
import { CharacterDetails } from '@/domain/character/application/character-details/character-details'
import { Injectable } from '@nestjs/common'

import { CharacterEntity } from '../../enterprise/entities/character.entity'
import { CharacterRepository } from '../repositories/character.repository'

interface ICreateCharacterUseCaseRequest {
  gameSystem: string
  race: string
  class: string
  description?: string
  temperature?: number
}

type CreateCharacterUseCaseResponse = Either<null, CharacterEntity>

@Injectable()
export class CreateCharacterUseCase {
  constructor(
    private characterRepository: CharacterRepository,
    private characterDetails: CharacterDetails,
  ) {}

  async execute(
    data: ICreateCharacterUseCaseRequest,
  ): Promise<CreateCharacterUseCaseResponse> {
    const character = await this.characterDetails.generate(data)

    const newCharacter = CharacterEntity.create(character)

    await this.characterRepository.create(newCharacter)

    return right(newCharacter)
  }
}
