FROM node:14.18.2-alpine

ARG PORT=3000
ENV PORT $PORT

ARG DB_HOST=localhost
ENV DB_HOST $DB_HOST

ARG DB_PORT=3306
ENV DB_PORT $DB_PORT

ARG DB_TYPE=mysql
ENV DB_TYPE $DB_TYPE

ARG DB_USER=dummy
ENV DB_USER $DB_USER

ARG DB_PASS=dummy
ENV DB_PASS $DB_PASS

ARG DB_DBASE=distronixlms
ENV DB_DBASE $DB_DBASE

RUN apk update && apk add git
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

USER node
WORKDIR /home/node/app
RUN git clone https://github.com/DebdutBiswas/distronix-lms-api.git
RUN npm install

EXPOSE 3000
CMD [ "node", "app.js" ]