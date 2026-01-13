# front/Dockerfile
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all other files
COPY . .

# Build the React app
RUN npm run build

# Serve the build using a lightweight web server (e.g., nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80

# Default command
CMD ["nginx", "-g", "daemon off;"]
