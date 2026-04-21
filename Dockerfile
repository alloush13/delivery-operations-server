FROM node:lts-alpine3.22

WORKDIR /usr/local/share/backend

COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000

CMD ["npm","run","dev"]
