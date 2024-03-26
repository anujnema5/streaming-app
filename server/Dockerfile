FROM node:21-alpine

WORKDIR /server

COPY package*.json ./
COPY ./prisma prisma
COPY ./dist dist
COPY .env ./

RUN npm install --only=prod
RUN npm install -D --only=prod
RUN npm install dotenv

CMD ["node", "dist/index.js"]

EXPOSE 8000