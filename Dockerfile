FROM node:16-alpine 

WORKDIR /usr/src/app

COPY . .

RUN npm ci 

RUN npm run build

EXPOSE 3001

CMD [ "node", "dist/main.js" ]

