FROM node:latest

WORKDIR /genesis-test

COPY package*.json /genesis-test/

RUN npm install

COPY . .