FROM node:21.7-alpine AS builder

WORKDIR /app

# Crucial fix for ECONNRESET on Docker Desktop Windows
# Lowers the maximum concurrent connections to avoid overwhelming the network bridge
RUN npm config set maxsockets 5 && \
    npm config set fetch-retries 10 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set registry http://registry.npmjs.org/

# Copy root configurations
COPY package.json package-lock.json ./

# Copy the apps configurations
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies using npm with strict concurrency limits
RUN npm install

# Copy source code
COPY apps/api ./apps/api

# Generate Prisma Client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build the API
WORKDIR /app
RUN npm run build:api

# Production stage
FROM node:21.7-alpine

WORKDIR /app

RUN npm config set maxsockets 5 && \
    npm config set fetch-retries 10 && \
    npm config set registry http://registry.npmjs.org/

COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json

# Install only production dependencies
RUN npm install --omit=dev

# Copy generated Prisma and Built API
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Expose port
EXPOSE 3001

# Start script
COPY apps/api/entrypoint.sh ./apps/api/entrypoint.sh
RUN chmod +x ./apps/api/entrypoint.sh

CMD ["./apps/api/entrypoint.sh"]
