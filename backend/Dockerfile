FROM node:22-alpine

WORKDIR /app

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 5000

CMD ["yarn","dev"]