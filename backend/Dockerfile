FROM node:20 AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json .
COPY --from=builder /app/prisma .

RUN npm install
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

CMD ["npm", "run", "start:migrate:prod"]
