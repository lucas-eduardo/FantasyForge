import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { useCreateCharacter } from '@/services/create-character.service'
import { useListCharacters } from '@/services/list-characters.service'
import dayjs from 'dayjs'
import { Eye } from 'lucide-react'
import { useState } from 'react'

export function Home() {
  const { data, refetch } = useListCharacters()
  const { mutate, isLoading } = useCreateCharacter()

  const [isOpen, setIsOpen] = useState(false)

  const [gameSystem, setGameSystem] = useState('')
  const [race, setRace] = useState('')
  const [characterClass, setCharacterClass] = useState('')
  const [description, setDescription] = useState('')

  const handleGenerate = () => {
    if (!gameSystem || !race || !characterClass) {
      return alert('Preencha os campos')
    }

    mutate(
      { gameSystem, class: characterClass, race, description },
      {
        onSuccess: () => {
          refetch()

          setGameSystem('')
          setRace('')
          setCharacterClass('')
          setDescription('')

          setIsOpen(false)
        },
      },
    )
  }

  return (
    <div className="h-screen flex flex-col px-4">
      <header className="h-16 flex items-center">
        <h2 className="text-muted-foreground">Personagens RPG</h2>
      </header>

      <main className="flex flex-col">
        <div className="flex justify-end">
          <Dialog open={isOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsOpen(true)}>Novo personagem</Button>
            </DialogTrigger>

            <DialogContent>
              <Select value={gameSystem} onValueChange={setGameSystem}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sistema do jogo" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Dungeons & Dragons">
                    Dungeons & Dragons
                  </SelectItem>
                  <SelectItem value="Pathfinder">Pathfinder</SelectItem>
                  <SelectItem value="World of Darkness">
                    World of Darkness
                  </SelectItem>
                  <SelectItem value="Call of Cthulhu">
                    Call of Cthulhu
                  </SelectItem>
                  <SelectItem value="Warhammer Fantasy Roleplay">
                    Warhammer Fantasy Roleplay
                  </SelectItem>
                  <SelectItem value="Shadowrun">Shadowrun</SelectItem>
                  <SelectItem value="GURPS">GURPS</SelectItem>
                  <SelectItem value="Fate">Fate</SelectItem>
                </SelectContent>
              </Select>

              <Select value={race} onValueChange={setRace}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a raça do personagem" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Human">Humano</SelectItem>
                  <SelectItem value="Elf">Elfo</SelectItem>
                  <SelectItem value="Dwarf">Anão</SelectItem>
                  <SelectItem value="Halfling">Halfling</SelectItem>
                  <SelectItem value="Orc">Orc</SelectItem>
                  <SelectItem value="Gnome">Gnomo</SelectItem>
                  <SelectItem value="Tiefling">Tiefling</SelectItem>
                  <SelectItem value="Dragonborn">Draconato</SelectItem>
                  <SelectItem value="Half-Elf">Meio-Elfo</SelectItem>
                  <SelectItem value="Half-Orc">Meio-Orc</SelectItem>
                  <SelectItem value="Tabaxi">Tabaxi</SelectItem>
                  <SelectItem value="Firbolg">Firbolg</SelectItem>
                  <SelectItem value="Aarakocra">Aarakocra</SelectItem>
                  <SelectItem value="Kenku">Kenku</SelectItem>
                  <SelectItem value="Goliath">Golias</SelectItem>
                  <SelectItem value="Aasimar">Aasimar</SelectItem>
                </SelectContent>
              </Select>

              <Select value={characterClass} onValueChange={setCharacterClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a classe do personagem" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Warrior">Guerreiro</SelectItem>
                  <SelectItem value="Wizard">Mago</SelectItem>
                  <SelectItem value="Rogue">Ladrão</SelectItem>
                  <SelectItem value="Cleric">Clérigo</SelectItem>
                  <SelectItem value="Paladin">Paladino</SelectItem>
                  <SelectItem value="Bard">Bardo</SelectItem>
                  <SelectItem value="Druid">Druida</SelectItem>
                  <SelectItem value="Sorcerer">Feiticeiro</SelectItem>
                  <SelectItem value="Monk">Monge</SelectItem>
                  <SelectItem value="Ranger">Patrulheiro</SelectItem>
                  <SelectItem value="Barbarian">Bárbaro</SelectItem>
                  <SelectItem value="Warlock">Bruxo</SelectItem>
                  <SelectItem value="Fighter">Combatente</SelectItem>
                  <SelectItem value="Necromancer">Necromante</SelectItem>
                  <SelectItem value="Alchemist">Alquimista</SelectItem>
                  <SelectItem value="Summoner">Invocador</SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                placeholder="Descrição"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <DialogFooter>
                <Button
                  type="button"
                  disabled={isLoading}
                  onClick={handleGenerate}
                >
                  {isLoading ? 'Gerando...' : 'Gerar'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Local de nascimento</TableHead>
              <TableHead>Estado civil</TableHead>
              <TableHead>Tem filhos</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Criação</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((character: any) => (
              <TableRow key={character.id}>
                <TableCell>{character.name}</TableCell>
                <TableCell>{character.birthPlace}</TableCell>
                <TableCell>{character.maritalStatus}</TableCell>
                <TableCell>{character.children}</TableCell>
                <TableCell>{character.age}</TableCell>
                <TableCell>
                  {dayjs(character.createdAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Eye />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <div className="flex flex-col">
                        <img
                          className="rounded shadow w-56 h-56 m-auto"
                          src={character.image}
                          alt={character.name}
                        />

                        <ScrollArea className="h-64 mt-6">
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Nome
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.name}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Idade
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.age}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Local de Nascimento
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.birthPlace}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Estado Civil
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.maritalStatus}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Profissão
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.profession}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Educação
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.education}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Descrição Física
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.physicalDescription}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Preferências de Vestuário
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.clothingPreferences}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Rotina Diária
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.dailyRoutine}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Hobbies
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.hobbies}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Comida Favorita
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.favoriteFood}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Medos
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.fears}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Objetivo
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.goal}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Maior Obstáculo
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.biggestObstacle}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Atitude em Relação às Pessoas
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.attitudeTowardsPeople}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Atitude em Relação a Grupos
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.attitudeTowardsGroups}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Visão de Mundo
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.attitudeTowardsWorld}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Mudança Desejada em Si Mesmo
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.changeInSelf}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Mudança Desejada no Mundo
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.changeInWorld}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  História da Infância
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.childhoodStory}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Traço Distintivo
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.distinctiveTrait}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Pais Vivos
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.parentsAlive}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Sentimentos em Relação aos Pais
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.feelingsAboutParents}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Detalhes sobre os Pais
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.detailsAboutParents}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Irmãos
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.siblings}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Amigos de Infância
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.youthFriends}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Animal de Estimação
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.pet}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Companhia Ideal
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.idealCompany}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Tipo de Parceiro Romântico
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.typeOfLover}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Razão para o Objetivo
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.reasonForGoal}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Razão para a Profissão
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.reasonForProfession}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Preferências de Trabalho
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.workPreferences}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Clima
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.climate}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Local de Residência
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.residenceLocation}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Razão para a Residência
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.reasonForResidence}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Problemas Comuns
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.commonProblems}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Superando Obstáculos
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.overcomingObstacle}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Plano se for Bem-sucedido
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.planIfSuccessful}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Plano se Falhar
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.planIfFailed}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Auto descrição
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.selfDescription}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  Atividades de Lazer
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.leisureActivities}
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell className="text-muted-foreground">
                                  História Conjugal
                                </TableCell>
                                <TableCell className="flex justify-end">
                                  {character.conjugalHistory}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </ScrollArea>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}
