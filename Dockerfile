# build contaiter
FROM node:10-alpine AS build

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY [ "package.json", "npm-shrinkwrap.json", "webpack.prod.js", "tsconfig.json", "app.js", "/usr/app/"]

# if you have any node-gyp modules
# RUN apk add --no-cache --virtual .build-deps make gcc g++ python \
#     && npm install --silent \
#     && apk del .build-deps

RUN npm install
COPY ./src /usr/app/src/
RUN npm run build

# run contaier
FROM node:10-alpine

ENV NODE_ENV production
RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY public /usr/app/public
COPY --from=build /usr/app/build/bundle.prod.js /usr/app
EXPOSE 3000
CMD [ "node", "bundle.prod.js"]
