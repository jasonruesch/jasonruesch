## [Docker](https://www.docker.com/)

Create [apps/jasonruesch/Dockerfile](../../apps/jasonruesch/Dockerfile) with the following to be used for development with HMR:

```dockerfile
# syntax = docker/dockerfile:1

# Build with:
# docker build -t jasonruesch:dev -f apps/jasonruesch/Dockerfile .
# Run with:
# docker run -it --rm -p 4200:4200 --name jasonruesch-jasonruesch-dev --label com.docker.compose.project=jasonruesch jasonruesch:dev

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.6.0
FROM node:${NODE_VERSION}-slim AS base

# Node.js app lives here
WORKDIR /app

# Install node modules
COPY package-lock.json package.json ./
RUN npm install

# Set environment
ENV NODE_ENV="development"

# Copy application code
COPY . .

# Start the server by default, this can be overwritten at runtime
EXPOSE 4200

WORKDIR /app/apps/jasonruesch
CMD [ "npx", "react-router", "dev", "--host" ]
```

Create [docker-compose.yml](../../docker-compose.yml) with the following to be used for starting the development container with mapped volumes:

```yaml
# Run with:
# docker compose up
# Include --build to rebuild the image if there are changes to the Dockerfile or package.json files
# Optionally, use -d to run the app in detached mode

version: '3'

services:
  jasonruesch:
    image: jasonruesch:dev
    container_name: jasonruesch-jasonruesch-dev
    build:
      context: .
      dockerfile: ./apps/jasonruesch/Dockerfile
    ports:
      - '4200:4200'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true # To fix an issue with HMR on Windows machines
```

Create [apps/jasonruesch/Dockerfile.preview](../../apps/jasonruesch/Dockerfile.preview) with the following to be used for preview deployments:

```dockerfile
# syntax = docker/dockerfile:1

# Build with:
# docker build -t jasonruesch:preview -f apps/jasonruesch/Dockerfile.preview .
# Run with:
# docker run -it --rm -p 3000:3000 --name jasonruesch-jasonruesch-preview --label com.docker.compose.project=jasonruesch jasonruesch:preview

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.6.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app


# Throw-away build stage to reduce size of final image
FROM base AS build

# Copy application code
COPY --link . .

# Install node modules
# RUN npm ci --ignore-scripts # TODO: Use this instead of the following after Nx fixes the release script issue of updating the package-lock.json file
RUN npm install --ignore-scripts

# Set environment
ENV NODE_ENV="preview"

# Build the application
RUN npx nx build jasonruesch --mode preview


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/apps/jasonruesch/package.json /app
COPY --from=build /app/apps/jasonruesch/build /app/build
RUN npm install --omit=dev

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npx", "react-router-serve", "build/server/index.js" ]
```

Create [apps/jasonruesch/Dockerfile.staging](../../apps/jasonruesch/Dockerfile.staging) with the following to be used for staging deployments:

```dockerfile
# syntax = docker/dockerfile:1

# Build with:
# docker build -t jasonruesch:staging -f apps/jasonruesch/Dockerfile.staging .
# Run with:
# docker run -it --rm -p 3000:3000 --name jasonruesch-jasonruesch-staging --label com.docker.compose.project=jasonruesch jasonruesch:staging

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.6.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app


# Throw-away build stage to reduce size of final image
FROM base AS build

# Copy application code
COPY --link . .

# Install node modules
# RUN npm ci --ignore-scripts # TODO: Use this instead of the following after Nx fixes the release script issue of updating the package-lock.json file
RUN npm install --ignore-scripts

# Set environment
ENV NODE_ENV="staging"

# Build the application
RUN npx nx build jasonruesch --mode staging


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/apps/jasonruesch/package.json /app
COPY --from=build /app/apps/jasonruesch/build /app/build
RUN npm install --omit=dev

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npx", "react-router-serve", "build/server/index.js" ]
```

Create [apps/jasonruesch/Dockerfile.production](../../apps/jasonruesch/Dockerfile.production) with the following to be used for production deployments:

```dockerfile
# syntax = docker/dockerfile:1

# Build with:
# docker build -t jasonruesch:v$(npm --prefix apps/jasonruesch pkg get version | tr -d '\"') -f apps/jasonruesch/Dockerfile.production .
# Run with:
# docker run -it --rm -p 3000:3000 --name jasonruesch-jasonruesch-production --label com.docker.compose.project=jasonruesch jasonruesch:v$(npm --prefix apps/jasonruesch pkg get version | tr -d '\"')

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.6.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app


# Throw-away build stage to reduce size of final image
FROM base AS build

# Copy application code
COPY --link . .

# Install node modules
# RUN npm ci --ignore-scripts # TODO: Use this instead of the following after Nx fixes the release script issue of updating the package-lock.json file
RUN npm install --ignore-scripts

# Set environment
ENV NODE_ENV="production"

# Build the application
RUN npx nx build jasonruesch --mode production


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/apps/jasonruesch/package.json /app
COPY --from=build /app/apps/jasonruesch/build /app/build
RUN npm install --omit=dev

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npx", "react-router-serve", "build/server/index.js" ]
```

Update [apps/jasonruesch/package.json](../../apps/jasonruesch/package.json) with the following:

```json
{
  ...
  "nx": {
    "targets": {
      "docker-build": {
        "command": "docker build -f apps/jasonruesch/Dockerfile . -t jasonruesch",
        "configurations": {
          "production": {
            "command": "docker build -t jasonruesch:v$(npm --prefix apps/jasonruesch pkg get version | tr -d '\"') -f apps/jasonruesch/Dockerfile.production ."
          },
          "staging": {
            "command": "docker build -t jasonruesch:staging -f apps/jasonruesch/Dockerfile.staging ."
          },
          "preview": {
            "command": "docker build -t jasonruesch:preview -f apps/jasonruesch/Dockerfile.preview ."
          }
        }
      }
    }
  }
}
```
