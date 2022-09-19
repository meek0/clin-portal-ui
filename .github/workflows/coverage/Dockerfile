FROM node:18.1-alpine as builder

WORKDIR /code

COPY package.json package-lock.json /code/
RUN npm install

COPY public /code/public
COPY src /code/src
COPY .env tsconfig.json tsconfig.paths.json craco.config.js /code/

RUN npm run build

RUN npm run coverage:changed
