FROM node:alpine
LABEL authors="gabrielhernan"

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm config set strict-ssl false
RUN npm install

COPY ./ ./


#CMD ["npm", "start"]
CMD ["npm","run" , "start:dev"]