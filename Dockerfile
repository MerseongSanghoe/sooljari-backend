FROM node:18-alpine

WORKDIR /srv/app
COPY . .
RUN npm install --platform=linuxmusl --arch=x64 sharp
RUN npm run build
EXPOSE 1337
