FROM node:14.8.0-alpine as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /client/node_modules/.bin:$PATH
COPY package.json /client/package.json

RUN npm install
RUN npm install react-scripts -g

COPY . .
RUN npm run buid

CMD ["npm","run","server"]