FROM node:21.7-alpine AS builder

WORKDIR /app

# Crucial fix for ECONNRESET on Docker Desktop Windows
RUN npm config set maxsockets 5 && \
    npm config set fetch-retries 10 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set registry http://registry.npmjs.org/

# Copy root config
COPY package.json package-lock.json ./

# Copy apps
COPY apps/api/package.json ./apps/api/package.json
COPY apps/web/package.json ./apps/web/package.json

# Install dependencies using npm
RUN npm install

# Copy source code
COPY apps/web ./apps/web

# Build the Web app
WORKDIR /app
ARG NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL=http://localhost:3000
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

RUN npm run build:web

FROM node:21.7-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/web/package.json ./apps/web/package.json
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000

ENV PORT=3000

# Start Next.js
WORKDIR /app/apps/web
CMD ["npm", "run", "start"]
