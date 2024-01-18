import { ICharacterProps } from '../../enterprise/entities/character.entity'

export interface ICharacterDetailsParams {
  gameSystem: string
  race: string
  class: string
  description?: string
  temperature?: number
}

export abstract class CharacterDetails {
  abstract generate(params: ICharacterDetailsParams): Promise<ICharacterProps>
}
