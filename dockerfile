FROM node:lts
WORKDIR /usr/src/app
COPY . .
EXPOSE 3000
CMD yarn install && \
    yarn global add phantomjs-prebuilt && \
    yarn prisma migrate dev &&\
    init &&\
    yarn prisma db seed &&\
    yarn start