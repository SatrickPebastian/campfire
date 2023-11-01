# Use node base image
FROM node:14

# Setting local working directory for container
WORKDIR /usr/src/app

# Copy npm dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code into container
COPY . .

# Compile application
RUN npm run build

# Expose application on port 5000
EXPOSE 5000

# Run application
CMD [ "npm", "run", "preview" ]
