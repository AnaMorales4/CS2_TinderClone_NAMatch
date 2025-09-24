# back/Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of your app
COPY . .

# Expose backend port (e.g., 3000)
EXPOSE 5000

# Start the app
CMD ["npm", "run", "dev"]
