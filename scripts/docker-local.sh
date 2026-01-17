#!/bin/bash

# MindEase - Local Docker Development Script
# Runs the microfrontend stack in Docker for local testing

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "🧠 MindEase - Starting Docker Stack (Local Development)"
echo "========================================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Parse arguments
ACTION="${1:-up}"

case "$ACTION" in
    up|start)
        echo "🔨 Building and starting containers..."
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
        
        echo ""
        echo "✅ Stack started successfully!"
        echo ""
        echo "📍 Access points:"
        echo "   Shell (Main):     http://localhost:3000"
        echo "   Dashboard:        http://localhost:5001"
        echo "   Tasks:            http://localhost:5002"
        echo "   Profile:          http://localhost:5003"
        echo ""
        echo "📋 Commands:"
        echo "   View logs:        docker-compose logs -f"
        echo "   Stop:             $0 down"
        echo "   Restart:          $0 restart"
        ;;
    
    down|stop)
        echo "🛑 Stopping containers..."
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
        echo "✅ Stack stopped."
        ;;
    
    restart)
        echo "🔄 Restarting stack..."
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
        echo "✅ Stack restarted."
        ;;
    
    logs)
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
        ;;
    
    status)
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml ps
        ;;
    
    clean)
        echo "🧹 Cleaning up containers, images, and volumes..."
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v --rmi local
        echo "✅ Cleanup complete."
        ;;
    
    *)
        echo "Usage: $0 {up|down|restart|logs|status|clean}"
        echo ""
        echo "Commands:"
        echo "  up, start   - Build and start the stack"
        echo "  down, stop  - Stop the stack"
        echo "  restart     - Rebuild and restart the stack"
        echo "  logs        - Follow container logs"
        echo "  status      - Show container status"
        echo "  clean       - Remove containers, images, and volumes"
        exit 1
        ;;
esac
