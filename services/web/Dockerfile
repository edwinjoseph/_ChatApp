FROM node:alpine

RUN mkdir -p /web
WORKDIR /web

COPY services/web /web

RUN yarn
RUN yarn build

CMD yarn start