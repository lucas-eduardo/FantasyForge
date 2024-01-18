import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CharacterRepository } from '@/domain/character/application/repositories/character.repository'
import { CharacterEntity } from '@/domain/character/enterprise/entities/character.entity'
import { Injectable } from '@nestjs/common'

import { PrismaCharacterMapper } from '../mappers/prisma-character.mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCharacterRepository implements CharacterRepository {
  constructor(private prismaService: PrismaService) {}

  async create(character: CharacterEntity): Promise<void> {
    const data = PrismaCharacterMapper.toPrisma(character)

    await this.prismaService.character.create({
      data,
    })
  }

  async find(): Promise<CharacterEntity[]> {
    const characters = await this.prismaService.character.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return characters.map(PrismaCharacterMapper.toDomain)
  }

  async findById(characterId: UniqueEntityID): Promise<CharacterEntity | null> {
    const character = await this.prismaService.character.findUnique({
      where: {
        id: characterId.toString(),
      },
    })

    if (!character) {
      return null
    }

    return PrismaCharacterMapper.toDomain(character)
  }
}
