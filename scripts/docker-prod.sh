#!/bin/bash

# MindEase - Production Docker Deployment Script
# For VPS deployment

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

# Configuration
export PORT="${PORT:-80}"
DOMAIN="${DOMAIN:-localhost}"

echo "🧠 MindEase - Production Docker Deployment"
echo "==========================================="
echo "Domain: $DOMAIN"
echo "Port: $PORT"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Parse arguments
ACTION="${1:-up}"

case "$ACTION" in
    up|start|deploy)
        echo "🔨 Building and starting production containers..."
        
        # Pull latest changes if in git repo
        if [ -d ".git" ]; then
            echo "📥 Pulling latest changes..."
            git pull origin main 2>/dev/null || true
        fi
        
        # Build and start
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
        
        echo ""
        echo "✅ Production stack deployed successfully!"
        echo ""
        echo "📍 Access: http://$DOMAIN:$PORT"
        echo ""
        echo "📋 Commands:"
        echo "   View logs:        $0 logs"
        echo "   Stop:             $0 down"
        echo "   Update:           $0 update"
        ;;
    
    down|stop)
        echo "🛑 Stopping production containers..."
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
        echo "✅ Production stack stopped."
        ;;
    
    update)
        echo "🔄 Updating production stack..."
        
        # Pull latest changes
        if [ -d ".git" ]; then
            echo "📥 Pulling latest changes..."
            git pull origin main
        fi
        
        # Rebuild and restart with zero downtime
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d --no-deps
        
        # Clean up old images
        docker image prune -f
        
        echo "✅ Production stack updated."
        ;;
    
    logs)
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs -f "${@:2}"
        ;;
    
    status)
        echo "📊 Container Status:"
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml ps
        echo ""
        echo "📈 Resource Usage:"
        docker stats --no-stream $(docker-compose -f docker-compose.yml -f docker-compose.prod.yml ps -q) 2>/dev/null || true
        ;;
    
    backup)
        BACKUP_DIR="${2:-./backups}"
        TIMESTAMP=$(date +%Y%m%d_%H%M%S)
        mkdir -p "$BACKUP_DIR"
        
        echo "💾 Creating backup..."
        docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec -T shell tar czf - /usr/share/nginx/html > "$BACKUP_DIR/mindease_$TIMESTAMP.tar.gz"
        echo "✅ Backup saved to: $BACKUP_DIR/mindease_$TIMESTAMP.tar.gz"
        ;;
    
    clean)
        echo "🧹 Cleaning up old resources..."
        docker system prune -f
        docker image prune -a -f --filter "until=168h"
        echo "✅ Cleanup complete."
        ;;
    
    *)
        echo "Usage: $0 {deploy|down|update|logs|status|backup|clean}"
        echo ""
        echo "Commands:"
        echo "  deploy, up    - Build and deploy production stack"
        echo "  down, stop    - Stop the production stack"
        echo "  update        - Pull latest code and redeploy"
        echo "  logs [svc]    - Follow container logs (optional: specific service)"
        echo "  status        - Show container status and resource usage"
        echo "  backup [dir]  - Create backup of static files"
        echo "  clean         - Remove unused Docker resources"
        echo ""
        echo "Environment Variables:"
        echo "  PORT          - Port to expose (default: 80)"
        echo "  DOMAIN        - Domain name for the deployment"
        exit 1
        ;;
esac
