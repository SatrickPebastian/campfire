# Base-Image
FROM node:14

# Setting local working directory for container
WORKDIR /usr/src/app

# Copy dependencies into container
COPY package*.json ./

# Install npm packages
RUN npm install

# Copy source code into container
COPY . .

# Expose application on port 3000
EXPOSE 3000

# Set commands to get started after container startup
CMD [ "node", "index.js" ]
