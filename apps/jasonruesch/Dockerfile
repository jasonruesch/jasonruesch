# Run the container with `docker run -p 4200:4200 -t jasonruesch`.
FROM docker.io/node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npx", "nx", "serve", "jasonruesch", "--host", "0.0.0.0"]
