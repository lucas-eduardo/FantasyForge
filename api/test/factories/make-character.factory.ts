import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  CharacterEntity,
  ICharacterProps,
} from '@/domain/character/enterprise/entities/character.entity'
import { faker } from '@faker-js/faker'

export function makeCharacter(
  override: Partial<ICharacterProps> = {},
  id?: UniqueEntityID,
) {
  const character = CharacterEntity.create(
    {
      name: faker.person.firstName(),
      age: faker.number.int({ min: 18, max: 100 }),
      birthPlace: faker.location.city(),
      childhoodStory: faker.lorem.paragraph(),
      feelingsAboutParents: faker.lorem.sentence(),
      parentsAlive: faker.datatype.boolean(),
      maritalStatus: faker.helpers.arrayElement([
        'single',
        'married',
        'divorced',
        'widowed',
      ]),
      education: faker.lorem.word(),
      profession: faker.person.jobTitle(),
      reasonForProfession: faker.lorem.sentence(),
      physicalDescription: faker.commerce.productDescription(),
      distinctiveTrait: faker.hacker.adjective(),
      attitudeTowardsWorld: faker.lorem.sentence(),
      attitudeTowardsPeople: faker.lorem.sentence(),
      residenceLocation: faker.location.city(),
      image: faker.image.avatar(),
      createdAt: faker.date.past(),
      ...override,
    },
    id,
  )

  return character
}
