FROM node:10.16
RUN npm i -g yarn
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install
COPY . /app/