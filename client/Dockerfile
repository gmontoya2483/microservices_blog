FROM node:alpine
LABEL authors="gabrielhernan"

# Add the following lines
#ENV CI=true
#ENV WDS_SOCKET_PORT=0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm config set strict-ssl false
RUN npm install

COPY ./ ./

CMD ["npm", "start"]



