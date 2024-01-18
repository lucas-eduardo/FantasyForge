import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CharacterEntity } from '@/domain/character/enterprise/entities/character.entity'
import { Prisma, Character as PrismaCharacter } from '@prisma/client'

export class PrismaCharacterMapper {
  static toDomain(raw: PrismaCharacter): CharacterEntity {
    const { id, ...data } = raw

    return CharacterEntity.create(data, new UniqueEntityID(id))
  }

  static toPrisma(
    character: CharacterEntity,
  ): Prisma.CharacterUncheckedCreateInput {
    return {
      id: character.id.toValue(),
      name: character.name,
      age: character.age,
      birthPlace: character.birthPlace,
      childhoodStory: character.childhoodStory,
      feelingsAboutParents: character.feelingsAboutParents,
      parentsAlive: character.parentsAlive,
      detailsAboutParents: character.detailsAboutParents,
      siblings: character.siblings,
      youthFriends: character.youthFriends,
      maritalStatus: character.maritalStatus,
      conjugalHistory: character.conjugalHistory,
      children: character.children,
      education: character.education,
      profession: character.profession,
      reasonForProfession: character.reasonForProfession,
      physicalDescription: character.physicalDescription,
      distinctiveTrait: character.distinctiveTrait,
      goal: character.goal,
      reasonForGoal: character.reasonForGoal,
      planIfSuccessful: character.planIfSuccessful,
      planIfFailed: character.planIfFailed,
      biggestObstacle: character.biggestObstacle,
      overcomingObstacle: character.overcomingObstacle,
      changeInWorld: character.changeInWorld,
      changeInSelf: character.changeInSelf,
      fears: character.fears,
      selfDescription: character.selfDescription,
      attitudeTowardsWorld: character.attitudeTowardsWorld,
      attitudeTowardsPeople: character.attitudeTowardsPeople,
      attitudeTowardsGroups: character.attitudeTowardsGroups,
      leisureActivities: character.leisureActivities,
      clothingPreferences: character.clothingPreferences,
      workPreferences: character.workPreferences,
      favoriteFood: character.favoriteFood,
      hobbies: character.hobbies,
      pet: character.pet,
      idealCompany: character.idealCompany,
      typeOfLover: character.typeOfLover,
      residenceLocation: character.residenceLocation,
      climate: character.climate,
      reasonForResidence: character.reasonForResidence,
      commonProblems: character.commonProblems,
      dailyRoutine: character.dailyRoutine,
      image: character.image,
      createdAt: character.createdAt,
      updatedAt: character.updatedAt,
    }
  }
}