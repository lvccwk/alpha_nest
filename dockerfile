FROM node:lts
WORKDIR /usr/src/app
COPY . .

ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/alpha"

EXPOSE 3000
CMD yarn install && \
    # yarn prisma migrate reset -f --skip-generate --skip-seed &&\
    # yarn prisma migrate deploy && \
    yarn prisma migrate reset -f &&\
    # init &&\
    # yarn prisma db seed &&\
    yarn run start