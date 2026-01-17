# MindEase - Plataforma de Acessibilidade Cognitiva

> Facilitando a vida academica e profissional de pessoas neurodivergentes atraves de tecnologia inclusiva

## Sobre o Projeto

MindEase e uma plataforma desenvolvida para a **FIAP Inclusive** com foco em **acessibilidade cognitiva**, projetada especificamente para auxiliar pessoas com:

- TDAH (Transtorno do Deficit de Atencao com Hiperatividade)
- TEA (Transtorno do Espectro Autista)
- Dislexia
- Burnout e sobrecarga mental
- Dificuldades de foco e retencao
- Ansiedade em ambientes digitais
- Sobrecarga sensorial

## Funcionalidades Principais

### 1. Painel Cognitivo Personalizavel
Dashboard completo onde o usuario pode ajustar:
- Nivel de complexidade da interface (Simples/Moderado/Detalhado)
- Modo de foco (esconde distracoes)
- Modo resumo / modo detalhado
- Contraste, espacamento e tamanho de fonte
- Modo escuro/claro
- Alertas cognitivos personalizados
- Suporte VLibras

### 2. Organizador de Tarefas com Suporte Cognitivo
Sistema completo de gestao de tarefas com:
- Visualizacao Kanban simplificada (A Fazer / Em Progresso / Concluido)
- Timer Pomodoro adaptavel
- Checklist inteligente com subtarefas
- Alertas de incentivo e progresso
- Avisos de transicao suave entre atividades
- Acompanhamento de tempo investido

### 3. Perfil do Usuario + Configuracoes Persistentes
Armazenamento e gestao de:
- Perfil pessoal e preferencias
- Neurodivergencias identificadas
- Rotina de estudo personalizada
- Tecnicas de foco preferidas (Pomodoro/Custom/Flexivel)
- Preferencias de notificacoes
- Todas as configuracoes salvas no localStorage

---

## Arquitetura

### Microfrontend com Module Federation

O projeto utiliza **Module Federation** (`@originjs/vite-plugin-federation`) para dividir a aplicacao em microfrontends independentes:

```
+------------------------------------------------------------------+
|                          BROWSER                                  |
|                    http://localhost:3000                          |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                      SHELL (Host)                                 |
|  - React Router (navegacao)                                       |
|  - Layout principal (Navbar)                                      |
|  - Carrega remotes via Module Federation                          |
|  - Porta: 3000 (Docker) / 5000 (local)                           |
+------------------------------------------------------------------+
         |                    |                    |
         v                    v                    v
+----------------+   +----------------+   +----------------+
|   DASHBOARD    |   |     TASKS      |   |    PROFILE     |
|   (Remote)     |   |    (Remote)    |   |    (Remote)    |
|                |   |                |   |                |
| Exposes:       |   | Exposes:       |   | Exposes:       |
| - Painel.tsx   |   | - Tarefas.tsx  |   | - Perfil.tsx   |
| - Explore.tsx  |   |                |   | - Config.tsx   |
|                |   |                |   |                |
| Porta: 5001    |   | Porta: 5002    |   | Porta: 5003    |
+----------------+   +----------------+   +----------------+
```

### Estrutura do Monorepo

```
hackathon-web/
├── apps/
│   ├── shell/                      # Host Application
│   │   ├── src/
│   │   │   ├── App.tsx             # Routes + lazy loading
│   │   │   ├── main.tsx            # Entry point
│   │   │   └── remotes.d.ts        # TypeScript declarations
│   │   └── vite.config.ts          # Federation host config
│   │
│   ├── dashboard/                  # Remote: Painel + Explore
│   │   ├── src/
│   │   │   ├── Painel.tsx          # Dashboard principal
│   │   │   └── Explore.tsx         # Pagina Explore
│   │   └── vite.config.ts          # Federation remote config
│   │
│   ├── tasks/                      # Remote: Tarefas
│   │   ├── src/
│   │   │   └── Tarefas.tsx         # Kanban board
│   │   └── vite.config.ts
│   │
│   └── profile/                    # Remote: Perfil + Config
│       ├── src/
│       │   ├── Perfil.tsx          # Pagina de perfil
│       │   └── Config.tsx          # Configuracoes
│       └── vite.config.ts
│
├── packages/
│   └── shared/                     # Codigo Compartilhado
│       ├── src/
│       │   ├── components/         # Componentes reutilizaveis
│       │   │   ├── AccessibleContainer.tsx
│       │   │   ├── AnimatedCard.tsx
│       │   │   ├── FocusCard.tsx
│       │   │   ├── CognitiveAlerts.tsx
│       │   │   ├── Navbar.tsx
│       │   │   ├── TaskCard.tsx
│       │   │   ├── TaskDialog.tsx
│       │   │   └── PomodoroTimer.tsx
│       │   ├── store/              # Zustand stores
│       │   │   ├── accessibilityStore.ts
│       │   │   ├── taskStore.ts
│       │   │   ├── profileStore.ts
│       │   │   ├── pomodoroStore.ts
│       │   │   └── themeStore.ts
│       │   ├── domain/             # Entidades de dominio
│       │   │   └── entities/
│       │   │       ├── AccessibilitySettings.ts
│       │   │       ├── Task.ts
│       │   │       ├── UserProfile.ts
│       │   │       └── PomodoroSession.ts
│       │   └── theme/
│       │       └── ThemeProviderWrapper.tsx
│       └── package.json
│
├── docker/
│   ├── Dockerfile.shell            # Build do shell
│   ├── Dockerfile.remote           # Build dos remotes
│   └── nginx/
│       ├── nginx.conf              # Proxy reverso + CORS
│       └── remote.conf             # CORS para remotes
│
├── docker-compose.yml              # Config base
├── docker-compose.dev.yml          # Override desenvolvimento
└── docker-compose.prod.yml         # Override producao
```

### Clean Architecture

O codigo em `packages/shared` segue principios de Clean Architecture:

**1. Separacao de Concerns**
- Entidades de dominio isoladas em `domain/entities`
- Logica de estado em stores Zustand separados
- Componentes UI reutilizaveis e independentes

**2. Reutilizacao de Codigo**
- Todos os componentes sao preparados para serem portados para React Native
- Hooks e stores podem ser compartilhados entre Web e Mobile
- Logica de negocio independente de framework

**3. Persistencia**
- Utiliza Zustand com middleware `persist`
- Todas as configuracoes salvas no localStorage
- Estado sincronizado entre sessoes e microfrontends

---

## Tecnologias Utilizadas

### Core
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estatica
- **Vite** - Build tool e dev server
- **Module Federation** - `@originjs/vite-plugin-federation`

### UI/UX
- **Material UI v7** - Componentes e design system
- **Emotion** - CSS-in-JS
- **React Router DOM** - Navegacao

### Estado e Dados
- **Zustand** - Gerenciamento de estado global
- **Zustand Persist** - Persistencia de estado

### Formularios e Validacao
- **React Hook Form** - Gerenciamento de formularios
- **Zod** - Validacao de esquemas

### Infraestrutura
- **Docker** - Containerizacao
- **Docker Compose** - Orquestracao de containers
- **Nginx** - Servidor web e proxy reverso

### Utilitarios
- **date-fns** - Manipulacao de datas
- **clsx** - Utility para className
- **Axios** - HTTP client

---

## Como Executar

### Pre-requisitos
- Node.js 18+
- npm ou yarn
- Docker e Docker Compose (para modo Docker)

### Opcao 1: Docker (Recomendado)

```bash
# Clone o repositorio
git clone [URL_DO_REPOSITORIO]
cd hackathon-web

# Iniciar stack completa
npm run docker:local:up

# Acessar: http://localhost:3000

# Parar
npm run docker:local:down
```

### Opcao 2: Desenvolvimento Local

```bash
# Instale as dependencias
npm install

# Execute todos os microfrontends
npm run dev

# Ou execute individualmente:
npm run dev:shell      # Shell (porta 5000)
npm run dev:dashboard  # Dashboard (porta 5001)
npm run dev:tasks      # Tasks (porta 5002)
npm run dev:profile    # Profile (porta 5003)
```

### Scripts Disponiveis

```bash
# Microfrontend (Docker)
npm run docker:local:up      # Inicia stack completa
npm run docker:local:down    # Para containers

# Microfrontend (Local)
npm run dev                  # Inicia todos os MFs
npm run mf:build             # Build dos remotes
npm run mf:start             # Build + start

# Individual
npm run dev:shell            # Apenas shell
npm run dev:dashboard        # Apenas dashboard
npm run dev:tasks            # Apenas tasks
npm run dev:profile          # Apenas profile

# Build & Quality
npm run build                # Build todos workspaces
npm run lint                 # Executa linter

# Legacy (aplicacao monolitica original)
npm run dev:legacy           # Aplicacao sem microfrontends
```

---

## Acessibilidade Cognitiva

### Componentes Especializados

**AccessibleContainer**
- Aplica configuracoes de acessibilidade automaticamente
- Ajusta fonte, espacamento e contraste
- Suporta modo foco com blur de fundo

**FocusCard**
- Cards expansiveis que se adaptam ao nivel de complexidade
- Em modo simples, sempre expandido
- Em modo detalhado, mostra todas as opcoes

**AnimatedCard**
- Animacoes controlaveis pelo usuario
- Pode ser desativado nas configuracoes de acessibilidade
- Suporta fade, grow e slide

**CognitiveAlerts**
- Notificacoes inteligentes sobre tempo de trabalho
- Mensagens de incentivo personalizadas
- Avisos de transicao suave

### Niveis de Complexidade

**Simples**
- Interface minimalista
- Apenas informacoes essenciais
- Cards sempre expandidos

**Moderado** (Padrao)
- Equilibrio entre informacao e clareza
- Opcoes principais visiveis
- Detalhes sob demanda

**Detalhado**
- Todas as opcoes e informacoes disponiveis
- Maximo controle e personalizacao
- Para usuarios avancados

---

## Preparacao para Mobile (React Native)

### Codigo Reutilizavel

**Entities (Domain)**
- 100% reutilizaveis em React Native
- Tipos TypeScript puros sem dependencias de framework

**Stores (Zustand)**
- 100% compativeis com React Native
- Mesma logica de estado em ambas plataformas

**Logica de Negocio**
- Separada dos componentes UI
- Pode ser importada diretamente no projeto mobile

### Componentes a Portar

Os componentes UI precisarao ser reescritos com React Native, mas a estrutura e logica permanecem:
- Substituir Material UI por React Native Paper ou NativeBase
- Adaptar navegacao para React Navigation
- Manter mesmos stores e entidades

---

## Proximos Passos

- [ ] Implementar testes unitarios e E2E
- [ ] CI/CD com GitHub Actions
- [ ] Integracao VLibras completa
- [ ] Versao React Native
- [ ] Backend com autenticacao

> Veja o [Roadmap completo](./docs/roadmap.md) para mais detalhes

---

## Equipe

Projeto desenvolvido para o Hackathon FIAP 2026

## Licenca

Este projeto esta sob a licenca MIT.

---

**MindEase** - Tecnologia para Todos
