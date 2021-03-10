FROM node:11-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install nodemon -g --quiet

RUN npm install

COPY . . 

EXPOSE 9000

CMD nodemon -L --watch . index.js