import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ICharacterProps {
  name: string
  age: number
  birthPlace: string
  childhoodStory: string
  feelingsAboutParents: string
  parentsAlive: boolean
  detailsAboutParents?: string | null
  siblings?: string | null
  youthFriends?: string | null
  maritalStatus: string
  conjugalHistory?: string | null
  children?: string | null
  education: string
  profession: string
  reasonForProfession: string
  physicalDescription: string
  distinctiveTrait: string
  goal?: string | null
  reasonForGoal?: string | null
  planIfSuccessful?: string | null
  planIfFailed?: string | null
  biggestObstacle?: string | null
  overcomingObstacle?: string | null
  changeInWorld?: string | null
  changeInSelf?: string | null
  fears?: string | null
  selfDescription?: string | null
  attitudeTowardsWorld: string
  attitudeTowardsPeople: string
  attitudeTowardsGroups?: string | null
  leisureActivities?: string | null
  clothingPreferences?: string | null
  workPreferences?: string | null
  favoriteFood?: string | null
  hobbies?: string | null
  pet?: string | null
  idealCompany?: string | null
  typeOfLover?: string | null
  residenceLocation: string
  climate?: string | null
  reasonForResidence?: string | null
  commonProblems?: string | null
  dailyRoutine?: string | null
  image: string
  createdAt: Date
  updatedAt?: Date | null
}

export class CharacterEntity extends Entity<ICharacterProps> {
  readonly name!: string
  readonly age!: number
  readonly birthPlace!: string
  readonly childhoodStory!: string
  readonly feelingsAboutParents!: string
  readonly parentsAlive!: boolean
  readonly detailsAboutParents?: string | null
  readonly siblings?: string | null
  readonly youthFriends?: string | null
  readonly maritalStatus!: string
  readonly conjugalHistory?: string | null
  readonly children?: string | null
  readonly education!: string
  readonly profession!: string
  readonly reasonForProfession!: string
  readonly physicalDescription!: string
  readonly distinctiveTrait!: string
  readonly goal?: string | null
  readonly reasonForGoal?: string | null
  readonly planIfSuccessful?: string | null
  readonly planIfFailed?: string | null
  readonly biggestObstacle?: string | null
  readonly overcomingObstacle?: string | null
  readonly changeInWorld?: string | null
  readonly changeInSelf?: string | null
  readonly fears?: string | null
  readonly selfDescription?: string | null
  readonly attitudeTowardsWorld!: string
  readonly attitudeTowardsPeople!: string
  readonly attitudeTowardsGroups?: string | null
  readonly leisureActivities?: string | null
  readonly clothingPreferences?: string | null
  readonly workPreferences?: string | null
  readonly favoriteFood?: string | null
  readonly hobbies?: string | null
  readonly pet?: string | null
  readonly idealCompany?: string | null
  readonly typeOfLover?: string | null
  readonly residenceLocation!: string
  readonly climate?: string | null
  readonly reasonForResidence?: string | null
  readonly commonProblems?: string | null
  readonly dailyRoutine?: string | null
  readonly image!: string
  readonly createdAt!: Date
  readonly updatedAt?: Date | null

  constructor(props: ICharacterProps, id?: UniqueEntityID) {
    super(props, id)

    Object.assign(this, props)
  }

  static create(
    props: Optional<ICharacterProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const character = new CharacterEntity(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return character
  }
}
