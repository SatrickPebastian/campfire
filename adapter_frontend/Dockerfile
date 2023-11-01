# Stage 1: Build the application
FROM node:14 AS builder

# Create app directory
WORKDIR /app

# Copy package*.json files to the app directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install electron-packager
RUN npm install electron-packager -g

# Bundle app source
COPY . .

# Package the application
RUN electron-packager . --out=dist --overwrite

# Stage 2: Distribute the application
FROM node:14

# Copy app from the build stage
COPY --from=builder /app/dist /app

# Change WORKDIR to /app/<YourAppName>-linux-x64
WORKDIR /app/adapter_frontend-linux-x64

# Start the app
CMD ["./adapter_frontend"]