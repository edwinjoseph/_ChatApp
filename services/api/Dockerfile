FROM node:alpine

RUN mkdir -p /api
WORKDIR /api

COPY services/api /api

RUN yarn

CMD yarn start
