
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install

COPY . .

EXPOSE 4500

RUN chown -R node /usr/src/app
USER node

CMD ["ng", "serve", "--host", "0.0.0.0"]