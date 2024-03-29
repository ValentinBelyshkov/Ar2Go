  # Stage 1: Build NestJS Application
FROM node:20 AS builder

WORKDIR /app

COPY package.json package.json ./

RUN npm install

COPY . .

RUN npx prisma deploy --yes

RUN npx prisma generate --yes

RUN npm run build


# Stage 2: Production Environment
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .

RUN npm install

RUN npx prisma generate --yes

RUN npm run build

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main"]

