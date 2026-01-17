# MindEase - Plataforma de Acessibilidade Cognitiva

> Facilitando a vida academica e profissional de pessoas neurodivergentes atraves de tecnologia inclusiva

## Sobre

**MindEase** e uma plataforma desenvolvida para o Hackathon FIAP 2026 com foco em **acessibilidade cognitiva**, auxiliando pessoas com TDAH, TEA, Dislexia, Burnout e outras condicoes.

## Quick Start

### Docker (Recomendado)

```bash
# Iniciar stack completa
npm run docker:local:up

# Acessar: http://localhost:3000

# Parar
npm run docker:local:down
```

### Desenvolvimento Local

```bash
# Instalar dependencias
npm install

# Executar todos os microfrontends
npm run dev

# Acessar: http://localhost:5000 (shell)
```

## Arquitetura

Este projeto utiliza **Module Federation** com arquitetura de microfrontends:

```
                    +------------------+
                    |      SHELL       |  <- Host (porta 3000)
                    |  (React Router)  |
                    +--------+---------+
                             |
        +--------------------+--------------------+
        |                    |                    |
+-------v-------+    +-------v-------+    +-------v-------+
|   DASHBOARD   |    |     TASKS     |    |    PROFILE    |
|  (Painel,     |    |   (Tarefas)   |    | (Perfil,      |
|   Explore)    |    |               |    |  Config)      |
+---------------+    +---------------+    +---------------+
    porta 5001          porta 5002          porta 5003
```

### Estrutura do Monorepo

```
hackathon-web/
├── apps/
│   ├── shell/          # Host - Routing e layout
│   ├── dashboard/      # Remote - Painel e Explore
│   ├── tasks/          # Remote - Tarefas (Kanban)
│   └── profile/        # Remote - Perfil e Config
├── packages/
│   └── shared/         # Codigo compartilhado (stores, components, domain)
└── docker/             # Configuracao Docker e Nginx
```

## Comandos

| Comando | Descricao |
|---------|-----------|
| `npm run docker:local:up` | Inicia stack Docker completa |
| `npm run docker:local:down` | Para containers Docker |
| `npm run dev` | Inicia todos os MFs localmente |
| `npm run dev:shell` | Apenas shell (porta 5000) |
| `npm run build` | Build de todos os workspaces |
| `npm run lint` | Executa ESLint |

## Stack Tecnologica

- **React 19** + **TypeScript** + **Vite**
- **Module Federation** - `@originjs/vite-plugin-federation`
- **Material UI v7** - Design System
- **Zustand** - Estado global com persistencia
- **Docker** + **Nginx** - Containerizacao e proxy reverso

## Funcionalidades

- Painel Cognitivo Personalizavel
- Organizador de Tarefas com Kanban
- Timer Pomodoro adaptavel
- Perfil com configuracoes persistentes
- Niveis de complexidade ajustaveis
- Modo foco e controles de acessibilidade

## Documentacao

- **[README_MINDEASE.md](./README_MINDEASE.md)** - Documentacao detalhada do projeto
- **[docs/DOCKER.md](./docs/DOCKER.md)** - Guia de deployment Docker
- **[docs/roadmap.md](./docs/roadmap.md)** - Roadmap e status de implementacao

## Deploy

### Producao (VPS)

```bash
# Deploy inicial
PORT=80 ./scripts/docker-prod.sh deploy

# Atualizacao
./scripts/docker-prod.sh update
```

---

**MindEase** - Tecnologia para Todos
