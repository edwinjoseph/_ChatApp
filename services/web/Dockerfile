FROM node:alpine

RUN mkdir -p /web
WORKDIR /web

COPY . /web

RUN yarn
RUN yarn build

CMD yarn start