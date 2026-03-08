# MindEase

Plataforma de **acessibilidade cognitiva** desenvolvida para auxiliar pessoas neurodivergentes a organizar tarefas, manter foco e reduzir sobrecarga mental em ambientes digitais.

O projeto foi desenvolvido para o **Hackathon FIAP** com uma arquitetura moderna baseada em **Microfrontends**, sendo a última fase de Tech Challenge para o curso de Pós-Graduação em Engenharia Frontend.

---

# Principais Funcionalidades

- Painel cognitivo personalizável  
- Organizador de tarefas com visualização Kanban  
- Timer Pomodoro  
- Ajustes de acessibilidade (contraste, espaçamento, fonte)  
- Modo claro e escuro  
- Persistência de preferências do usuário  
- Dashboard de produtividade  

---

# Arquitetura

A aplicação utiliza **Microfrontend Architecture** com **Module Federation**.

Cada domínio da aplicação é desenvolvido e buildado de forma independente, permitindo **escala, isolamento e deploy modular**.

### Aplicações

```
apps/
 ├─ shell        # Container principal da aplicação
 ├─ dashboard    # Painel de produtividade
 ├─ tasks        # Gestão de tarefas
 └─ profile      # Perfil e configurações do usuário
```

### Pacotes compartilhados

```
packages/
 └─ shared       # Utilitários, mocks e configurações compartilhadas
```

O **Shell** é responsável por:

- carregar os microfrontends  
- gerenciar rotas globais  
- fornecer layout e contexto da aplicação  

---

# Estrutura do Projeto

```
mindease-web
│
├─ apps
│   ├─ shell
│   ├─ dashboard
│   ├─ tasks
│   └─ profile
│
├─ packages
│   └─ shared
│
├─ scripts
│   └─ docker scripts
│
├─ vite.config.ts
└─ package.json
```

O projeto utiliza **npm workspaces** para gerenciar múltiplos pacotes dentro do monorepo.

---

# Tecnologias

## Core

- React 19  
- TypeScript  
- Vite  

## Microfrontend

- Module Federation (vite-plugin-federation)

## UI

- Material UI  
- Emotion  

## Estado e Dados

- Zustand  
- Axios  

## Formulários

- React Hook Form  
- Zod  

# Testes

O projeto utiliza **Vitest + Testing Library** para testes unitários e de componentes.

Configuração principal:

- Ambiente **jsdom**
- Testes organizados por microfrontend

```
apps/*/src/**/*.test.tsx
```

Executar testes:

```bash
npm run test
```

Executar em modo CI:

```bash
npm run test:run
```

---

# Git Hooks

O projeto utiliza **Husky** para garantir qualidade de código antes de commits.

Exemplo de automações:

- execução de testes  
- validação de lint  

---

# Docker

A aplicação possui scripts para execução via Docker.

### Ambiente local

```bash
npm run docker:local
```

Subir containers:

```bash
npm run docker:local:up
```

Parar containers:

```bash
npm run docker:local:down
```

### Deploy

```bash
npm run docker:prod:deploy
```

---

# Executando o Projeto

## Pré-requisitos

- Node.js 18+
- npm 9+
- Docker (opcional)

---

## Instalação

```bash
git clone <repo>
cd mindease-web
npm install
```

---

## Rodando a aplicação

```bash
npm run dev
```

Isso irá:

1. buildar os microfrontends  
2. iniciar os remotes  
3. iniciar o shell  

---

## Rodar apps individualmente

Shell:

```bash
npm run dev:shell
```

Dashboard:

```bash
npm run dev:dashboard
```

Tasks:

```bash
npm run dev:tasks
```

Profile:

```bash
npm run dev:profile
```

---

# Build

Build de todos os microfrontends:

```bash
npm run build
```

Build individual:

```bash
npm run build:dashboard
npm run build:tasks
npm run build:profile
```

---

# Monorepo

O projeto utiliza **npm workspaces** para organizar múltiplos pacotes:

```
workspaces:
  - apps/*
  - packages/*
```

Isso permite:

- compartilhamento de dependências  
- builds independentes  
- melhor organização do código  



