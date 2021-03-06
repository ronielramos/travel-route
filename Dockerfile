FROM node:12-alpine3

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./ ./

RUN npm run build

CMD ["npm", "run", "start:http"]