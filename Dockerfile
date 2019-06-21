FROM node:12-alpine

# Install deps
RUN apk update && apk upgrade && \
        mkdir -p /home/node/app

WORKDIR /home/node/app

# Bundle APP files
COPY config config/
COPY src src/
COPY babel.config.js .
COPY .eslintrc.js .
COPY package.json .
COPY package-lock.json .
COPY .env .

# ARGS
ARG NODE_ENV

# ENVS
ENV NODE_ENV=$NODE_ENV

RUN echo $NODE_ENV

# Install deps, build project, remove redundant deps
RUN npm i --production=false && \
    npm run build && \
    rm -rf node_modules && \
    npm i --production

# Expose the listening port of your app
EXPOSE 80

# USER node
CMD [ "node", "build/server.js" ]


