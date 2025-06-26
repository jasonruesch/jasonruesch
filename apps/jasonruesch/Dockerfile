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
RUN npm install --ignore-scripts

# Set environment
ENV NODE_ENV="staging"

# Copy application code
COPY --link . .
RUN npx nx build jasonruesch


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/apps/jasonruesch/package.json /app
COPY --from=build /app/apps/jasonruesch/build /app/build
RUN npm install --omit=dev

# Set production environment
ENV NODE_ENV="production"

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npx", "react-router-serve", "build/server/index.js" ]
