import { CharacterEntity } from '@/domain/character/enterprise/entities/character.entity'
import { FakeCharacterDetails } from 'test/character-details/fake-character-details'
import { InMemoryCharacterRepository } from 'test/repositories/in-memory-character.repository'

import { CreateCharacterUseCase } from '../create-character.use-case'

let inMemoryCharacterRepository: InMemoryCharacterRepository
let fakeCharacterDetails: FakeCharacterDetails

let sut: CreateCharacterUseCase

describe('Create character', () => {
  beforeEach(() => {
    inMemoryCharacterRepository = new InMemoryCharacterRepository()
    fakeCharacterDetails = new FakeCharacterDetails()

    sut = new CreateCharacterUseCase(
      inMemoryCharacterRepository,
      fakeCharacterDetails,
    )
  })

  it('', async () => {
    const generate = vi.spyOn(fakeCharacterDetails, 'generate')
    const create = vi.spyOn(inMemoryCharacterRepository, 'create')

    const result = await sut.execute({
      class: 'Guerreiro',
      gameSystem: 'Dungeons & Dragons',
      race: 'Humano',
    })

    expect(result.isRight()).toBeTruthy()
    expect(generate).toHaveBeenCalledTimes(1)
    expect(create).toHaveBeenCalledTimes(1)
    expect(result.value).toBeInstanceOf(CharacterEntity)
  })
})
