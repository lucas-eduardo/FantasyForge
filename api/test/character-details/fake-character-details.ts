import { CharacterDetails } from '@/domain/character/application/character-details/character-details'
import { ICharacterProps } from '@/domain/character/enterprise/entities/character.entity'

export class FakeCharacterDetails implements CharacterDetails {
  async generate(): Promise<ICharacterProps> {
    return {
      name: 'Eldric Ironhand',
      age: 28,
      birthPlace: 'Cidadela de Ironcrest',
      childhoodStory:
        'Cresceu em uma família de ferreiros, fascinado por armas e armaduras.',
      feelingsAboutParents:
        'Respeita profundamente, especialmente seu pai, um ferreiro renomado.',
      parentsAlive: true,
      detailsAboutParents:
        'Pai é um ferreiro mestre; mãe, uma comerciante habilidosa.',
      siblings: 'Uma irmã mais nova, aprendiz de alquimista.',
      youthFriends:
        'Vários, principalmente outros aprendizes de artesãos locais.',
      maritalStatus: 'Solteiro',
      conjugalHistory: 'Alguns romances passageiros, nada sério.',
      children: 'Nenhum',
      education: 'Educação básica, mas extenso treinamento em combate e forja.',
      profession: 'Guerreiro e ferreiro',
      reasonForProfession:
        'Paixão por armas e desejo de honrar a tradição familiar.',
      physicalDescription:
        'Alto, musculoso, cabelos castanhos curtos, olhos verdes, com cicatrizes de batalha.',
      distinctiveTrait: 'Extremamente habilidoso com a forja e combate.',
      goal: 'Tornar-se um herói lendário e forjar uma arma única.',
      reasonForGoal: 'Desejo de provar seu valor e habilidade.',
      planIfSuccessful: 'Fundar sua própria escola de guerreiros e ferreiros.',
      planIfFailed: 'Retornar à cidadela e continuar como ferreiro.',
      biggestObstacle:
        'Provar seu valor em um mundo cheio de heróis e aventuras.',
      overcomingObstacle: 'Dedicação implacável ao treinamento e às missões.',
      changeInWorld: 'Deseja inspirar outros a perseguirem seus sonhos.',
      changeInSelf: 'Espera encontrar seu verdadeiro propósito e habilidade.',
      fears: 'Ser esquecido ou considerado medíocre.',
      selfDescription: 'Um guerreiro dedicado com um coração de artesão.',
      attitudeTowardsWorld: 'Otimista e desafiador.',
      attitudeTowardsPeople: 'Amigável, mas cauteloso.',
      attitudeTowardsGroups:
        'Prefere ação individual, mas respeita a força dos grupos.',
      leisureActivities: 'Forja, caça, jogos de estratégia.',
      clothingPreferences:
        'Veste-se de forma prática, preferindo roupas que permitam movimento fácil.',
      workPreferences:
        'Trabalhos que envolvam desafios físicos e estratégicos.',
      favoriteFood: 'Ensopado de carne robusto.',
      hobbies: 'Forja, treinamento de combate, xadrez.',
      pet: 'Um cão de caça robusto chamado Brawn.',
      idealCompany: 'Companheiros leais e desafiadores.',
      typeOfLover: 'Alguém forte, independente e apaixonado.',
      residenceLocation: 'Uma casa modesta na Cidadela de Ironcrest.',
      climate: 'Temperado, com invernos rigorosos.',
      reasonForResidence: 'Proximidade à família e acesso à forja da família.',
      commonProblems: 'Desafios na forja, rivalidades locais.',
      dailyRoutine: 'Treinamento, forja, passar tempo com amigos e família.',
      image: 'image.png',
      createdAt: new Date(),
    }
  }
}
