FROM node:14-alpine as build-stage

WORKDIR /app

COPY package.json .

COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/build/ /usr/share/nginx/html
