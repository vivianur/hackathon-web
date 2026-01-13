# MindEase - Plataforma de Acessibilidade Cognitiva 🧠

> Facilitando a vida acadêmica e profissional de pessoas neurodivergentes através de tecnologia inclusiva

## 📋 Sobre o Projeto

MindEase é uma plataforma desenvolvida para a **FIAP Inclusive** com foco em **acessibilidade cognitiva**, projetada especificamente para auxiliar pessoas com:

- TDAH (Transtorno do Déficit de Atenção com Hiperatividade)
- TEA (Transtorno do Espectro Autista)
- Dislexia
- Burnout e sobrecarga mental
- Dificuldades de foco e retenção
- Ansiedade em ambientes digitais
- Sobrecarga sensorial

## 🎯 Funcionalidades Principais

### 1. Painel Cognitivo Personalizável
Dashboard completo onde o usuário pode ajustar:
- ✅ Nível de complexidade da interface (Simples/Moderado/Detalhado)
- ✅ Modo de foco (esconde distrações)
- ✅ Modo resumo / modo detalhado
- ✅ Contraste, espaçamento e tamanho de fonte
- ✅ Modo escuro/claro
- ✅ Alertas cognitivos personalizados
- ✅ Suporte VLibras

### 2. Organizador de Tarefas com Suporte Cognitivo
Sistema completo de gestão de tarefas com:
- ✅ Visualização Kanban simplificada (A Fazer / Em Progresso / Concluído)
- ✅ Timer Pomodoro adaptável
- ✅ Checklist inteligente com subtarefas
- ✅ Alertas de incentivo e progresso
- ✅ Avisos de transição suave entre atividades
- ✅ Acompanhamento de tempo investido

### 3. Perfil do Usuário + Configurações Persistentes
Armazenamento e gestão de:
- ✅ Perfil pessoal e preferências
- ✅ Neurodivergências identificadas
- ✅ Rotina de estudo personalizada
- ✅ Técnicas de foco preferidas (Pomodoro/Custom/Flexível)
- ✅ Preferências de notificações
- ✅ Todas as configurações salvas no localStorage

## 🏗️ Arquitetura

### Clean Architecture
O projeto segue os princípios de Clean Architecture com separação clara de responsabilidades:

```
src/
├── domain/               # Camada de domínio (entidades e tipos)
│   └── entities/
│       ├── AccessibilitySettings.ts
│       ├── Task.ts
│       ├── UserProfile.ts
│       └── PomodoroSession.ts
├── store/                # Estado global (Zustand)
│   ├── accessibilityStore.ts
│   ├── taskStore.ts
│   ├── profileStore.ts
│   ├── pomodoroStore.ts
│   └── themeStore.ts
├── components/           # Componentes reutilizáveis
│   ├── AccessibleContainer.tsx
│   ├── AnimatedCard.tsx
│   ├── FocusCard.tsx
│   ├── CognitiveAlerts.tsx
│   ├── Navbar.tsx
│   ├── TaskCard.tsx
│   ├── TaskDialog.tsx
│   └── PomodoroTimer.tsx
├── pages/                # Páginas da aplicação
│   ├── Home.tsx
│   ├── Painel.tsx
│   ├── Tarefas.tsx
│   ├── Perfil.tsx
│   ├── Config.tsx
│   └── Explore.tsx
└── theme/                # Tema e estilos
    └── ThemeProviderWrapper.tsx
```

### Princípios Aplicados

**1. Separação de Concerns**
- Entidades de domínio isoladas em `domain/entities`
- Lógica de estado em stores Zustand separados
- Componentes UI reutilizáveis e independentes

**2. Reutilização de Código**
- Todos os componentes são preparados para serem portados para React Native
- Hooks e stores podem ser compartilhados entre Web e Mobile
- Lógica de negócio independente de framework

**3. Persistência**
- Utiliza Zustand com middleware `persist`
- Todas as configurações salvas no localStorage
- Estado sincronizado entre sessões

## 🛠️ Tecnologias Utilizadas

### Core
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server

### UI/UX
- **Material UI v7** - Componentes e design system
- **Emotion** - CSS-in-JS
- **React Router DOM** - Navegação

### Estado e Dados
- **Zustand** - Gerenciamento de estado global
- **Zustand Persist** - Persistência de estado

### Formulários e Validação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas

### Utilitários
- **date-fns** - Manipulação de datas
- **clsx** - Utility para className
- **Axios** - HTTP client

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Entre na pasta do projeto
cd hackathon-web

# Instale as dependências
npm install

# Execute o projeto
npm run dev:legacy
```

O projeto estará disponível em `http://localhost:5173`

### Scripts Disponíveis

```bash
npm run dev:legacy    # Inicia servidor de desenvolvimento (principal)
npm run build:legacy  # Build para produção
npm run preview:legacy # Preview do build de produção
npm run lint          # Executa o linter
```

## ♿ Acessibilidade Cognitiva

### Componentes Especializados

**AccessibleContainer**
- Aplica configurações de acessibilidade automaticamente
- Ajusta fonte, espaçamento e contraste
- Suporta modo foco com blur de fundo

**FocusCard**
- Cards expansíveis que se adaptam ao nível de complexidade
- Em modo simples, sempre expandido
- Em modo detalhado, mostra todas as opções

**AnimatedCard**
- Animações controláveis pelo usuário
- Pode ser desativado nas configurações de acessibilidade
- Suporta fade, grow e slide

**CognitiveAlerts**
- Notificações inteligentes sobre tempo de trabalho
- Mensagens de incentivo personalizadas
- Avisos de transição suave

### Níveis de Complexidade

**Simples**
- Interface minimalista
- Apenas informações essenciais
- Cards sempre expandidos

**Moderado** (Padrão)
- Equilíbrio entre informação e clareza
- Opções principais visíveis
- Detalhes sob demanda

**Detalhado**
- Todas as opções e informações disponíveis
- Máximo controle e personalização
- Para usuários avançados

## 🔄 Preparação para Mobile (React Native)

### Código Reutilizável

**Entities (Domain)**
- 100% reutilizáveis em React Native
- Tipos TypeScript puros sem dependências de framework

**Stores (Zustand)**
- 100% compatíveis com React Native
- Mesma lógica de estado em ambas plataformas

**Lógica de Negócio**
- Separada dos componentes UI
- Pode ser importada diretamente no projeto mobile

### Componentes a Portar

Os componentes UI precisarão ser reescritos com React Native, mas a estrutura e lógica permanecem:
- Substituir Material UI por React Native Paper ou NativeBase
- Adaptar navegação para React Navigation
- Manter mesmos stores e entidades

## 📱 Próximos Passos

- [ ] Completar migração para arquitetura Microfrontend
- [ ] Implementar testes unitários
- [ ] CI/CD com GitHub Actions
- [ ] Integração VLibras
- [ ] Versão React Native
- [ ] Sistema de gamificação

> Veja o [Roadmap completo](./docs/roadmap.md) para mais detalhes

## 👥 Equipe

Projeto desenvolvido para o Hackathon FIAP 2026

## 📄 Licença

Este projeto está sob a licença MIT.

---

**MindEase** - Tecnologia para Todos 🧠💙
