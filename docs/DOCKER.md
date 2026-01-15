# Docker Deployment - MindEase

## Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                    mindease-network (Docker bridge)              │
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │  Dashboard  │  │    Tasks    │  │   Profile   │              │
│  │   :5001     │  │    :5002    │  │    :5003    │              │
│  │  (nginx)    │  │   (nginx)   │  │   (nginx)   │              │
│  │             │  │             │  │             │              │
│  │ /assets/    │  │ /assets/    │  │ /assets/    │              │
│  │ remoteEntry │  │ remoteEntry │  │ remoteEntry │              │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘              │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          │                                       │
│                    ┌─────▼─────┐                                 │
│                    │   Shell   │                                 │
│                    │   :3000   │◄──── Porta exposta ao browser   │
│                    │  (nginx)  │                                 │
│                    │           │                                 │
│                    │ Proxy:    │                                 │
│                    │ /mf/dashboard/* → dashboard:80              │
│                    │ /mf/tasks/* → tasks:80                      │
│                    │ /mf/profile/* → profile:80                  │
│                    └───────────┘                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Fluxo de Requisicoes (Module Federation)

```
1. Browser acessa http://localhost:3000
2. Shell serve SPA (index.html + JS bundles)
3. Ao navegar para /painel, shell faz:
   GET http://localhost:3000/mf/dashboard/assets/remoteEntry.js
4. Nginx do shell faz proxy:
   /mf/dashboard/* → http://dashboard:80/*
5. Dashboard container responde com remoteEntry.js + CORS headers
6. Module Federation carrega e renderiza o componente remoto
```

## Quick Start

### Desenvolvimento Local

```bash
# Iniciar stack completa
npm run docker:local:up

# Ou usando o script diretamente
./scripts/docker-local.sh up

# Acessar: http://localhost:3000
```

### Produção (VPS)

```bash
# Deploy inicial
PORT=80 DOMAIN=seu-dominio.com ./scripts/docker-prod.sh deploy

# Atualizar após mudanças
./scripts/docker-prod.sh update
```

## Comandos Disponíveis

### Local (`docker-local.sh`)

| Comando | Descrição |
|---------|-----------|
| `up` / `start` | Inicia a stack |
| `down` / `stop` | Para a stack |
| `restart` | Reconstrói e reinicia |
| `logs` | Mostra logs em tempo real |
| `status` | Status dos containers |
| `clean` | Remove containers e imagens |

### Produção (`docker-prod.sh`)

| Comando | Descrição |
|---------|-----------|
| `deploy` / `up` | Deploy inicial |
| `update` | Atualiza com zero downtime |
| `down` / `stop` | Para a stack |
| `logs [service]` | Logs (opcional: serviço específico) |
| `status` | Status e uso de recursos |
| `backup [dir]` | Backup dos arquivos |
| `clean` | Limpa recursos não usados |

## Estrutura de Arquivos

```
docker/
├── Dockerfile.shell      # Build do host (shell)
├── Dockerfile.remote     # Build dos remotes (dashboard, tasks, profile)
└── nginx/
    ├── nginx.conf        # Config do shell (proxy reverso)
    └── remote.conf       # Config dos remotes (CORS habilitado)

scripts/
├── docker-local.sh       # Script para desenvolvimento local
└── docker-prod.sh        # Script para produção/VPS

docker-compose.yml        # Configuração base
docker-compose.dev.yml    # Override para desenvolvimento
docker-compose.prod.yml   # Override para produção
```

## Configuração de VPS

### Requisitos

- Docker 20.10+
- Docker Compose 2.0+
- 1GB RAM mínimo
- 10GB disco

### Instalação do Docker (Ubuntu/Debian)

```bash
# Instalar Docker
curl -fsSL https://get.docker.com | sh

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Reiniciar sessão
newgrp docker

# Verificar instalação
docker --version
docker compose version
```

### Deploy na VPS

```bash
# 1. Clonar repositório
git clone https://github.com/seu-usuario/mindease-web.git
cd mindease-web

# 2. Configurar variáveis
export PORT=80
export DOMAIN=seu-dominio.com

# 3. Deploy
./scripts/docker-prod.sh deploy

# 4. Verificar status
./scripts/docker-prod.sh status
```

### Configurar HTTPS (Opcional)

Para HTTPS, recomendamos usar Caddy ou Traefik como reverse proxy:

```bash
# Exemplo com Caddy (adicionar ao docker-compose.prod.yml)
caddy:
  image: caddy:alpine
  ports:
    - "80:80"
    - "443:443"
  volumes:
    - ./Caddyfile:/etc/caddy/Caddyfile
    - caddy_data:/data
  depends_on:
    - shell
```

**Caddyfile:**
```
seu-dominio.com {
    reverse_proxy shell:80
}
```

## Troubleshooting

### Containers nao iniciam

```bash
# Ver logs detalhados
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs

# Verificar se portas estao livres
lsof -i :3000 -i :5001 -i :5002 -i :5003
```

### Build falha

```bash
# Limpar cache do Docker
docker system prune -a

# Reconstruir sem cache
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
```

### Erro de conexao entre containers

```bash
# Verificar rede
docker network ls
docker network inspect hackathon-web_mindease-network

# Testar conectividade interna (de dentro do shell)
docker exec mindease-shell wget -q -O- http://dashboard/assets/remoteEntry.js | head

# Testar acesso externo aos remotes
curl -I http://localhost:5001/assets/remoteEntry.js
curl -I http://localhost:5002/assets/remoteEntry.js
curl -I http://localhost:5003/assets/remoteEntry.js

# Testar proxy do shell
curl -I http://localhost:3000/mf/dashboard/assets/remoteEntry.js
```

### Erro CORS / Module Federation

Se aparecer erro `Cross-Origin Request Blocked` ou `Module source URI is not allowed`:

```bash
# Verificar se CORS headers estao presentes
curl -I -H "Origin: http://localhost:3000" http://localhost:3000/mf/dashboard/assets/remoteEntry.js

# Deve retornar:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, POST, OPTIONS
```

**Causas comuns:**
1. URLs no shell vite.config.ts sem `/assets/remoteEntry.js`
2. Nginx do shell sem headers CORS nas rotas de proxy
3. Cache de imagem Docker com configuracao antiga

**Solucao:**
```bash
# Rebuild completo sem cache
./scripts/docker-local.sh clean
docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
npm run docker:local:up
```

## Variáveis de Ambiente

| Variável | Descrição | Default |
|----------|-----------|---------|
| `PORT` | Porta do shell | `3000` (local) / `80` (prod) |
| `DOMAIN` | Domínio do site | `localhost` |

## Performance

### Otimizações incluídas

- **Gzip** habilitado para assets
- **Cache headers** para arquivos estáticos (1 ano)
- **Multi-stage builds** para imagens menores
- **Health checks** para monitoramento
- **Logging** limitado para evitar estouro de disco

### Tamanho das imagens

| Imagem | Tamanho aproximado |
|--------|-------------------|
| Shell | ~25MB |
| Dashboard | ~25MB |
| Tasks | ~25MB |
| Profile | ~25MB |
