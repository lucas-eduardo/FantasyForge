import {
  CharacterDetails,
  ICharacterDetailsParams,
} from '@/domain/character/application/character-details/character-details'
import { ICharacterProps } from '@/domain/character/enterprise/entities/character.entity'
import { EnvService } from '@/infra/env/env.service'
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { writeFile } from 'fs'
import { OpenAI } from 'openai'
import { join } from 'path'

@Injectable()
export class OpenAICharacterDetails implements CharacterDetails {
  private client: OpenAI

  constructor(private envService: EnvService) {
    const apiKey = this.envService.get('OPENAI_KEY')

    this.client = new OpenAI({
      apiKey,
    })
  }

  async generate(data: ICharacterDetailsParams): Promise<ICharacterProps> {
    const content = `
    You are an expert in RPGs, with extensive knowledge of various gaming systems, such as Dungeons & Dragons, Pathfinder, World of Darkness, Call of Cthulhu, Warhammer Fantasy Roleplay, Shadowrun, GURPS, and Fate. Your role is to create characters. You will be informed about the game system, the character's race, class, and perhaps some description to inspire you. Your response needs to be only in JSON format with the following data filled in, and the texts need to be in Portuguese (pt-BR), except for the name:
    
    example answer:
    '''
    {
      "name": "Eldric Ironhand",
      "age": 28,
      "birthPlace": "Cidadela de Ironcrest",
      "childhoodStory": "Cresceu em uma família de ferreiros, fascinado por armas e armaduras.",
      "feelingsAboutParents": "Respeita profundamente, especialmente seu pai, um ferreiro renomado.",
      "parentsAlive": true,
      "detailsAboutParents": "Pai é um ferreiro mestre; mãe, uma comerciante habilidosa.",
      "siblings": "Uma irmã mais nova, aprendiz de alquimista.",
      "youthFriends": "Vários, principalmente outros aprendizes de artesãos locais.",
      "maritalStatus": "Solteiro",
      "conjugalHistory": "Alguns romances passageiros, nada sério.",
      "children": "Nenhum",
      "education": "Educação básica, mas extenso treinamento em combate e forja.",
      "profession": "Guerreiro e ferreiro",
      "reasonForProfession": "Paixão por armas e desejo de honrar a tradição familiar.",
      "physicalDescription": "Alto, musculoso, cabelos castanhos curtos, olhos verdes, com cicatrizes de batalha.",
      "distinctiveTrait": "Extremamente habilidoso com a forja e combate.",
      "goal": "Tornar-se um herói lendário e forjar uma arma única.",
      "reasonForGoal": "Desejo de provar seu valor e habilidade.",
      "planIfSuccessful": "Fundar sua própria escola de guerreiros e ferreiros.",
      "planIfFailed": "Retornar à cidadela e continuar como ferreiro.",
      "biggestObstacle": "Provar seu valor em um mundo cheio de heróis e aventuras.",
      "overcomingObstacle": "Dedicação implacável ao treinamento e às missões.",
      "changeInWorld": "Deseja inspirar outros a perseguirem seus sonhos.",
      "changeInSelf": "Espera encontrar seu verdadeiro propósito e habilidade.",
      "fears": "Ser esquecido ou considerado medíocre.",
      "selfDescription": "Um guerreiro dedicado com um coração de artesão.",
      "attitudeTowardsWorld": "Otimista e desafiador.",
      "attitudeTowardsPeople": "Amigável, mas cauteloso.",
      "attitudeTowardsGroups": "Prefere ação individual, mas respeita a força dos grupos.",
      "leisureActivities": "Forja, caça, jogos de estratégia.",
      "clothingPreferences": "Veste-se de forma prática, preferindo roupas que permitam movimento fácil.",
      "workPreferences": "Trabalhos que envolvam desafios físicos e estratégicos.",
      "favoriteFood": "Ensopado de carne robusto.",
      "hobbies": "Forja, treinamento de combate, xadrez.",
      "pet": "Um cão de caça robusto chamado Brawn.",
      "idealCompany": "Companheiros leais e desafiadores.",
      "typeOfLover": "Alguém forte, independente e apaixonado.",
      "residenceLocation": "Uma casa modesta na Cidadela de Ironcrest.",
      "climate": "Temperado, com invernos rigorosos.",
      "reasonForResidence": "Proximidade à família e acesso à forja da família.",
      "commonProblems": "Desafios na forja, rivalidades locais.",
      "dailyRoutine": "Treinamento, forja, passar tempo com amigos e família.",
      "image": "Um homem alto e musculoso com cabelos castanhos e olhos verdes, vestindo armadura prática e segurando um martelo de forja."
    }
    '''
    
    Please use the context provided below to generate the character:
    
    Context:
    '''
    game system: ${data.gameSystem}
    race: ${data.race}
    class: ${data.class}
    ${data.description && 'description: ' + data.description}
    '''`

    const response = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      messages: [{ role: 'user', content }],
      temperature: data.temperature,
    })

    const contentJson = JSON.parse(
      response.choices[0].message.content as string,
    ) as ICharacterProps

    const image = await this.client.images.generate({
      model: 'dall-e-3',
      prompt: `${contentJson.image}. RPG style, just the character`,
      size: '1024x1024',
      quality: 'standard',
      n: 1,
    })

    contentJson.image = `${crypto.randomUUID()}.png`

    const responseImage = await axios.get(image.data[0].url as string, {
      responseType: 'arraybuffer',
    })

    const path = join(__dirname, '../../../..', 'images', contentJson.image)

    writeFile(path, responseImage.data, (err) => {
      if (err) {
        throw err
      }

      console.info('saved image')
    })

    return contentJson
  }
}
