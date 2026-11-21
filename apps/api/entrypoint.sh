#!/bin/sh
set -e

# Wait for DB if needed (we rely on docker-compose depends_on for now)

# Push database schema
echo "Pushing Prisma schema to database..."
cd /app/apps/api
npx prisma db push --accept-data-loss

# Start the NestJS application
echo "Starting NestJS API..."
node dist/main
