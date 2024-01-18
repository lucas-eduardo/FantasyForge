import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

import { CharacterEntity } from '../../enterprise/entities/character.entity'
import { CharacterRepository } from '../repositories/character.repository'

type FindCharacterUseCaseResponse = Either<null, CharacterEntity[]>

@Injectable()
export class FindCharacterUseCase {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(): Promise<FindCharacterUseCaseResponse> {
    const characters = await this.characterRepository.find()

    return right(characters)
  }
}
