# Use an official base image ex: build-stage
FROM node:20-alpine AS build-stage

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json first and install dependencies
# This step is performed separately to leverage Docker's layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# Start a new, final stage to keep the image light ex: production-stage
FROM node:20-alpine AS production-stage

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

# Copy only the built artifacts from the build stage
COPY --from=build-stage /app/build ./build

# Run as non-root user for better security
USER node

# Expose the port the app runs in
EXPOSE 8080

# The command to run the application
CMD [ "node", "build/index.js" ]

# Add a healthcheck
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:8080/ || exit 1
