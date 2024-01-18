import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CharacterEntity } from '@/domain/character/enterprise/entities/character.entity'

export abstract class CharacterRepository {
  abstract create(character: CharacterEntity): Promise<void>
  abstract find(): Promise<CharacterEntity[]>
  abstract findById(
    characterId: UniqueEntityID,
  ): Promise<CharacterEntity | null>
}
