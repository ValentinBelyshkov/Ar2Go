FROM node:14 AS development

WORKDIR /app

COPY package*.json package*.loc

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]