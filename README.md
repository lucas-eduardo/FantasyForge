# FantasyForge

## Descrição
FantasyForge é uma aplicação interativa para a criação de personagens de RPG. Este projeto é estruturado como um monorepo contendo tanto uma API backend, desenvolvida com NestJS, quanto uma interface frontend, criada com React. Com integração ao OpenAI, FantasyForge oferece recursos avançados para a geração automática de personagens, incluindo detalhes como história de fundo, características físicas e psicológicas, e até mesmo imagens geradas via DALL-E.

## Características Principais:
- Geração automatizada de personagens de RPG.
- Interface interativa para a criação e visualização de personagens.
- Suporte para diversos sistemas de RPG.
- Geração de imagens de personagens via integração com OpenAI.

## Começando

### Pré-requisitos
- Node.js
- npm ou yarn
- Docker (opcional)

### Instalação
1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/FantasyForge.git
    cd fantasyforge
    ```

2. Instale as dependências da API:
    ```bash
    cd api
    npm install
    ```

3. Instale as dependências da Web:
    ```bash
    cd ../web
    npm install
    ```

4. Configure as variáveis de ambiente conforme necessário em ambos os diretórios **(api e web)**.

### Executando o Projeto
Para rodar a API:

```
cd web
npm run start:dev
```

### Testes
Execute os testes para garantir que tudo está configurado corretamente:

```
cd api
npm run test
```