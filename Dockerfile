# Stage 1: Dependencies
FROM node:22-alpine AS deps
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
# Copy prisma schema for generation
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Stage 2: Builder
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"

# Generate Prisma client
RUN node -e "require('fs').writeFileSync('./prisma/.env', 'DATABASE_URL=\"postgresql://placeholder:placeholder@localhost:5432/placeholder\"')" && \
    npx prisma generate && \
    rm ./prisma/.env

# Build the Next.js application
RUN node -e "require('fs').writeFileSync('./prisma/.env', 'DATABASE_URL=\"postgresql://placeholder:placeholder@localhost:5432/placeholder\"')" && \
    NEXT_TELEMETRY_DISABLED=1 npm run build && \
    rm ./prisma/.env

# Stage 3: Runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line if you want to disable telemetry during runtime
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy prisma schema if needed for runtime
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 8080

ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build from the standalone output
CMD ["node", "server.js"]
