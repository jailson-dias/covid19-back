FROM node:12

WORKDIR /app

COPY . ./

RUN npm install

RUN mkdir logs || exit 0

CMD [ "npm", "run", "start" ]
