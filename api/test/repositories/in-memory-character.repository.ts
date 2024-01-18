import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CharacterRepository } from '@/domain/character/application/repositories/character.repository'
import { CharacterEntity } from '@/domain/character/enterprise/entities/character.entity'

export class InMemoryCharacterRepository implements CharacterRepository {
  characters: CharacterEntity[] = []

  async create(character: CharacterEntity): Promise<void> {
    this.characters.push(character)
  }

  async find(): Promise<CharacterEntity[]> {
    return this.characters
  }

  async findById(characterId: UniqueEntityID): Promise<CharacterEntity | null> {
    const character = this.characters.find(
      ({ id }) => id.toString() === characterId.toString(),
    )

    if (!character) {
      return null
    }

    return character
  }
}
