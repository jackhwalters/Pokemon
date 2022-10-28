# syntax=docker/dockerfile:1

FROM node:16.15.0

ENV NODE_ENV=prod

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]