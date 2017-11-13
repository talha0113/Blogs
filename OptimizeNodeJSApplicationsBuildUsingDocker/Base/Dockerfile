FROM node:9.1.0-alpine

# Create a application where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package.json /app

# Install npm packages
RUN npm install