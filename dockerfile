FROM alpine:latest
RUN apk add --no-cache nodejs npm
RUN npm install -g ts-node
WORKDIR /app
COPY . /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8080
CMD ["ts-node", "src/index.ts"]