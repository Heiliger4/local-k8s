FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY server.js ./
EXPOSE 8082
CMD ["node", "server.js"]














# Base image: Official Node.js runtime version 20 on lightweight Alpine Linux
# FROM node:20-alpine

# Sets the internal working directory inside the container for all subsequent instructions
# WORKDIR /app

# Copies package.json dependency manifest from host machine to container working directory
# COPY package.json ./

# Runs npm install to download and compile production dependencies (express, cors)
# RUN npm install --production

# Copies the server.js Express API source code into the container working directory
# COPY server.js ./

# Documents that this container process listens on Port 8082 for REST requests
# EXPOSE 8082

# Default command executed when container starts: launches Node.js API server
# CMD ["node", "server.js"]
