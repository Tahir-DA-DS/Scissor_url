FROM node:12-alpine

ADD package.json /tap/package.json

RUN rm -rf dist

RUN cd /tap && npm install -q

RUN npm dedupe

ADD ./ /src
RUN rm -rf /src/node_modules && cp -a /tap/node_modules /src/

WORKDIR /src

RUN npm run-script build

RUN npm install pm2 -g

EXPOSE 4000

CMD [ "pm2-runtime", "process.json" ]