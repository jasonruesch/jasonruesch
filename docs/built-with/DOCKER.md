## [Docker](https://www.docker.com/)

Create [apps/jasonruesch/Dockerfile](../apps/jasonruesch/Dockerfile) with the following:

```dockerfile
# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.6.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install node modules
COPY --link package-lock.json package.json ./
RUN npm ci --ignore-scripts

# Set environment
ENV NODE_ENV="production"

# Copy application code
COPY --link . .
RUN npx nx build jasonruesch


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

Update [apps/jasonruesch/package.json](../apps/jasonruesch/package.json) with the following:

```json
{
  ...
  "nx": {
    "targets": {
      "docker-build": {
        "dependsOn": [
          "build"
        ],
        "command": "docker build -f apps/jasonruesch/Dockerfile . -t jasonruesch"
      }
    }
  }
}
```

<!--
Create `docker-compose.yml` with the following:

```yaml
version: '3'

services:
  jasonruesch:
    image: jasonruesch:latest
    container_name: jasonruesch
    build:
      context: .
      dockerfile: ./apps/jasonruesch/Dockerfile
    ports:
      - '3000:3000'
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - CHOKIDAR_USEPOLLING=true # To fix an issue with HMR on Windows machines
```
-->
