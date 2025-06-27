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
COPY --link package-lock.json package.json ./
RUN npm install

# Set environment
ENV NODE_ENV="development"

# Copy application code
COPY --link . .

# Start the server by default, this can be overwritten at runtime
EXPOSE 4200

WORKDIR /app/apps/jasonruesch
CMD [ "npx", "react-router", "dev", "--host" ]
